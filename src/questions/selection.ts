import type { ProgressData, Question } from '../types';
import { topicErrorRate } from '../progress/progressStore';

export type PracticeMode = 'normal' | 'weak';

export function questionWeight(question: Question, all: Question[], progress: ProgressData, mode: PracticeMode): number {
  const errorRate = topicErrorRate(question.topic, all, progress);
  const topicWeight = mode === 'weak' ? 0.25 + errorRate * 2.75 : 0.8 + errorRate;
  const seen = progress.questions[question.id]?.timesShown ?? 0;
  const noveltyWeight = 1 / (1 + seen * 0.12);
  return question.baseWeight * topicWeight * noveltyWeight;
}

export function selectWeightedQuestion(
  questions: Question[],
  progress: ProgressData,
  mode: PracticeMode = 'normal',
  random: () => number = Math.random,
): Question | undefined {
  const reviewed = questions.filter((q) => q.status === 'reviewed');
  if (!reviewed.length) return undefined;
  const alternatives = reviewed.filter((q) => !progress.lastShownIds.includes(q.id));
  const pool = alternatives.length ? alternatives : reviewed;
  const weighted = pool.map((question) => ({ question, weight: questionWeight(question, reviewed, progress, mode) }));
  const total = weighted.reduce((sum, item) => sum + item.weight, 0);
  let cursor = random() * total;
  for (const item of weighted) {
    cursor -= item.weight;
    if (cursor <= 0) return item.question;
  }
  return weighted.at(-1)?.question;
}

export function buildSession(questions: Question[], count: number, progress: ProgressData, mode: PracticeMode, topic?: string): Question[] {
  const source = topic ? questions.filter((q) => q.topic === topic) : questions;
  const selected: Question[] = [];
  let working = progress;
  while (selected.length < count) {
    const remaining = source.filter((q) => !selected.some((picked) => picked.id === q.id));
    if (!remaining.length) break;
    const next = selectWeightedQuestion(remaining, working, mode);
    if (!next) break;
    selected.push(next);
    working = { ...working, lastShownIds: [...working.lastShownIds, next.id].slice(-5) };
  }
  return selected;
}

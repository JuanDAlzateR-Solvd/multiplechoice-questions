import type { ProgressData, Question } from '../types';

export const STORAGE_KEY = 'architect-practice-progress-v1';
const emptyProgress = (): ProgressData => ({ version: 1, questions: {}, lastShownIds: [] });

export function loadProgress(): ProgressData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return emptyProgress();
    const parsed = JSON.parse(stored) as ProgressData;
    return parsed.version === 1 && parsed.questions && Array.isArray(parsed.lastShownIds) ? parsed : emptyProgress();
  } catch {
    return emptyProgress();
  }
}

export function saveProgress(progress: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordShown(progress: ProgressData, question: Question): ProgressData {
  const current = progress.questions[question.id] ?? { timesShown: 0, timesCorrect: 0, timesIncorrect: 0, lastSeen: '', recentAnswers: [] };
  return {
    ...progress,
    questions: { ...progress.questions, [question.id]: { ...current, timesShown: current.timesShown + 1, lastSeen: new Date().toISOString() } },
    lastShownIds: [...progress.lastShownIds.filter((id) => id !== question.id), question.id].slice(-5),
  };
}

export function recordAnswer(progress: ProgressData, question: Question, correct: boolean): ProgressData {
  const current = progress.questions[question.id];
  if (!current) return progress;
  const answer = { correct, answeredAt: new Date().toISOString() };
  return {
    ...progress,
    questions: {
      ...progress.questions,
      [question.id]: {
        ...current,
        timesCorrect: current.timesCorrect + (correct ? 1 : 0),
        timesIncorrect: current.timesIncorrect + (correct ? 0 : 1),
        recentAnswers: [...current.recentAnswers, answer].slice(-10),
      },
    },
  };
}

export function topicErrorRate(topic: string, questions: Question[], progress: ProgressData): number {
  const recent = questions.filter((q) => q.topic === topic).flatMap((q) => progress.questions[q.id]?.recentAnswers ?? []).slice(-20);
  return recent.length ? recent.filter((answer) => !answer.correct).length / recent.length : 0.35;
}

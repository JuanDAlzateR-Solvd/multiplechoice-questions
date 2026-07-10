import { describe, expect, it } from 'vitest';
import { questionWeight, selectWeightedQuestion } from '../../src/questions/selection';
import type { ProgressData, Question } from '../../src/types';

const question = (id: string, topic = 'A', baseWeight = 1): Question => ({ id, status: 'reviewed', topic, difficulty: 'Easy', tags: [], question: id, options: [{ id: 'a', text: 'A' }], correctOptionId: 'a', explanation: 'E', optionExplanations: { a: 'E' }, sourceReferences: [], baseWeight });
const empty = (): ProgressData => ({ version: 1, questions: {}, lastShownIds: [] });

describe('weighted selection', () => {
  it('uses base weight', () => {
    const questions = [question('low', 'A', 1), question('high', 'A', 4)];
    expect(selectWeightedQuestion(questions, empty(), 'normal', () => 0.3)?.id).toBe('high');
  });
  it('avoids all of the last five when an alternative exists', () => {
    const questions = ['1', '2', '3', '4', '5', '6'].map((id) => question(id));
    const progress = { ...empty(), lastShownIds: ['1', '2', '3', '4', '5'] };
    expect(selectWeightedQuestion(questions, progress, 'normal', () => 0)?.id).toBe('6');
  });
  it('falls back to recent questions when no alternative exists', () => {
    const questions = [question('1'), question('2')];
    const progress = { ...empty(), lastShownIds: ['1', '2'] };
    expect(selectWeightedQuestion(questions, progress, 'normal', () => 0)).toBeDefined();
  });
  it('increases weak-mode weight for a high-error topic', () => {
    const questions = [question('weak', 'Weak'), question('strong', 'Strong')];
    const progress = empty();
    progress.questions.weak = { timesShown: 2, timesCorrect: 0, timesIncorrect: 2, lastSeen: '', recentAnswers: [{ correct: false, answeredAt: '' }, { correct: false, answeredAt: '' }] };
    progress.questions.strong = { timesShown: 2, timesCorrect: 2, timesIncorrect: 0, lastSeen: '', recentAnswers: [{ correct: true, answeredAt: '' }, { correct: true, answeredAt: '' }] };
    expect(questionWeight(questions[0], questions, progress, 'weak')).toBeGreaterThan(questionWeight(questions[1], questions, progress, 'weak'));
  });
});

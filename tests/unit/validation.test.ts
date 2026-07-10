import { describe, expect, it } from 'vitest';
import { validateQuestions } from '../../src/questions/validation';

const valid = () => ({
  id: 'q1', status: 'reviewed', topic: 'Tools', difficulty: 'Easy', tags: ['tool-use'], question: 'Question?',
  options: [{ id: 'a', text: 'A' }, { id: 'b', text: 'B' }], correctOptionId: 'a', explanation: 'General',
  optionExplanations: { a: 'Why A', b: 'Why B' }, sourceReferences: [], baseWeight: 1,
});

describe('validateQuestions', () => {
  it('accepts a valid bank', () => expect(validateQuestions([valid()]).errors).toEqual([]));
  it('reports duplicate ids', () => expect(validateQuestions([valid(), valid()]).errors).toContain('Question 2: duplicate id "q1".'));
  it('requires the correct option and every option explanation', () => {
    const question = valid();
    question.correctOptionId = 'missing';
    delete (question.optionExplanations as Record<string, string | undefined>).b;
    const errors = validateQuestions([question]).errors;
    expect(errors.some((error) => error.includes('correctOptionId'))).toBe(true);
    expect(errors.some((error) => error.includes('option "b"'))).toBe(true);
  });
  it('rejects invalid base weights', () => expect(validateQuestions([{ ...valid(), baseWeight: 0 }]).errors[0]).toContain('baseWeight'));
});

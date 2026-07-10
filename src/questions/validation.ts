import type { Question, QuestionStatus } from '../types';

export interface ValidationResult {
  questions: Question[];
  errors: string[];
}

const statuses: QuestionStatus[] = ['draft', 'reviewed', 'retired'];
const isText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

export function validateQuestions(data: unknown): ValidationResult {
  if (!Array.isArray(data)) return { questions: [], errors: ['Root value must be an array of questions.'] };

  const errors: string[] = [];
  const ids = new Set<string>();

  data.forEach((item, index) => {
    const label = `Question ${index + 1}`;
    if (!item || typeof item !== 'object') {
      errors.push(`${label}: must be an object.`);
      return;
    }
    const q = item as Record<string, unknown>;
    if (!isText(q.id)) errors.push(`${label}: id is required.`);
    else if (ids.has(q.id)) errors.push(`${label}: duplicate id "${q.id}".`);
    else ids.add(q.id);
    if (!statuses.includes(q.status as QuestionStatus)) errors.push(`${label}: status must be draft, reviewed, or retired.`);
    for (const field of ['topic', 'difficulty', 'question', 'explanation'] as const) {
      if (!isText(q[field])) errors.push(`${label}: ${field} is required.`);
    }
    if (!Array.isArray(q.tags) || q.tags.some((tag) => !isText(tag))) errors.push(`${label}: tags must be an array of strings.`);
    if (!Array.isArray(q.sourceReferences) || q.sourceReferences.some((ref) => !isText(ref))) errors.push(`${label}: sourceReferences must be an array of strings.`);
    if (typeof q.baseWeight !== 'number' || !Number.isFinite(q.baseWeight) || q.baseWeight <= 0) errors.push(`${label}: baseWeight must be a number greater than zero.`);

    if (!Array.isArray(q.options) || q.options.length === 0) {
      errors.push(`${label}: options must be a non-empty array.`);
    } else {
      const optionIds = new Set<string>();
      q.options.forEach((option, optionIndex) => {
        if (!option || typeof option !== 'object') {
          errors.push(`${label}: option ${optionIndex + 1} must be an object.`);
          return;
        }
        const candidate = option as Record<string, unknown>;
        if (!isText(candidate.id) || !isText(candidate.text)) errors.push(`${label}: option ${optionIndex + 1} needs non-empty id and text.`);
        else if (optionIds.has(candidate.id)) errors.push(`${label}: duplicate option id "${candidate.id}".`);
        else optionIds.add(candidate.id);
      });
      if (!isText(q.correctOptionId) || !optionIds.has(q.correctOptionId)) errors.push(`${label}: correctOptionId must match an option.`);
      if (!q.optionExplanations || typeof q.optionExplanations !== 'object') errors.push(`${label}: optionExplanations is required.`);
      else optionIds.forEach((id) => {
        if (!isText((q.optionExplanations as Record<string, unknown>)[id])) errors.push(`${label}: option "${id}" needs an explanation.`);
      });
    }
  });

  return { questions: errors.length ? [] : (data as Question[]), errors };
}

export type QuestionStatus = 'draft' | 'reviewed' | 'retired';

export interface AnswerOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  status: QuestionStatus;
  topic: string;
  difficulty: string;
  tags: string[];
  question: string;
  options: AnswerOption[];
  correctOptionId: string;
  explanation: string;
  optionExplanations: Record<string, string>;
  sourceReferences: string[];
  baseWeight: number;
}

export interface AnswerRecord {
  correct: boolean;
  answeredAt: string;
}

export interface QuestionProgress {
  timesShown: number;
  timesCorrect: number;
  timesIncorrect: number;
  lastSeen: string;
  recentAnswers: AnswerRecord[];
}

export interface ProgressData {
  version: 1;
  questions: Record<string, QuestionProgress>;
  lastShownIds: string[];
}

export interface SessionAnswer {
  question: Question;
  selectedOptionId: string;
  correct: boolean;
}

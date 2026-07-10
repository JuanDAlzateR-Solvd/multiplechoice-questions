import type { Question, SessionAnswer } from '../types';

export interface QuizSession {
  questions: Question[];
  currentIndex: number;
  answers: SessionAnswer[];
}

export const createSession = (questions: Question[]): QuizSession => ({ questions, currentIndex: 0, answers: [] });
export const currentQuestion = (session: QuizSession): Question | undefined => session.questions[session.currentIndex];

export function answerQuestion(session: QuizSession, selectedOptionId: string): QuizSession {
  const question = currentQuestion(session);
  if (!question || session.answers.length > session.currentIndex) return session;
  return { ...session, answers: [...session.answers, { question, selectedOptionId, correct: selectedOptionId === question.correctOptionId }] };
}

export const nextQuestion = (session: QuizSession): QuizSession => ({ ...session, currentIndex: session.currentIndex + 1 });

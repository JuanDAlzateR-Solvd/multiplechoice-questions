import type { ProgressData, Question, SessionAnswer } from '../types';
import { buildSession, type PracticeMode } from '../questions/selection';
import { recordAnswer, recordShown, saveProgress } from '../progress/progressStore';
import { answerQuestion, createSession, currentQuestion, nextQuestion, type QuizSession } from '../quiz/quizSession';

const escapeHtml = (value: string): string => {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
};

export function createApp(root: HTMLElement, questions: Question[], initialProgress: ProgressData): void {
  let progress = initialProgress;
  let session: QuizSession | undefined;

  const persist = (): void => saveProgress(progress);

  function renderHome(): void {
    session = undefined;
    const topics = [...new Set(questions.filter((q) => q.status === 'reviewed').map((q) => q.topic))].sort();
    const answered = Object.values(progress.questions).reduce((sum, item) => sum + item.timesCorrect + item.timesIncorrect, 0);
    root.innerHTML = `
      <header class="hero"><span class="eyebrow">PERSONAL STUDY TOOL</span><h1>Architect Practice</h1><p>Short, focused practice for Claude Certified Architect – Foundations.</p></header>
      <section class="card"><h2>Start a session</h2><div class="actions">
        <button data-count="5">Quick 5 <span>About 5 minutes</span></button>
        <button data-count="10">Quick 10 <span>Build your streak</span></button>
        <button data-action="topics">Practice by topic <span>Choose your focus</span></button>
        <button data-action="weak">Weak topics <span>Prioritize recent misses</span></button>
      </div></section>
      <p class="progress-note" data-testid="saved-progress">${answered ? `${answered} answer${answered === 1 ? '' : 's'} saved on this device` : 'Your progress will be saved on this device'}</p>
      <p class="disclaimer">Contains non-official sample questions only.</p>`;
    root.querySelectorAll<HTMLButtonElement>('[data-count]').forEach((button) => button.addEventListener('click', () => startSession(Number(button.dataset.count), 'normal')));
    root.querySelector('[data-action="weak"]')?.addEventListener('click', () => startSession(5, 'weak'));
    root.querySelector('[data-action="topics"]')?.addEventListener('click', () => renderTopics(topics));
  }

  function renderTopics(topics: string[]): void {
    root.innerHTML = `<button class="back" data-action="home">← Home</button><section class="card"><h1>Choose a topic</h1><div class="actions">${topics.map((topic) => `<button data-topic="${escapeHtml(topic)}">${escapeHtml(topic)}</button>`).join('')}</div></section>`;
    root.querySelector('[data-action="home"]')?.addEventListener('click', renderHome);
    root.querySelectorAll<HTMLButtonElement>('[data-topic]').forEach((button) => button.addEventListener('click', () => startSession(5, 'normal', button.dataset.topic)));
  }

  function startSession(count: number, mode: PracticeMode, topic?: string): void {
    const selected = buildSession(questions, count, progress, mode, topic);
    if (!selected.length) {
      root.innerHTML = `<section class="card error"><h1>No reviewed questions available</h1><p>Add reviewed questions${topic ? ` for ${escapeHtml(topic)}` : ''} to the question bank.</p><button data-action="home">Home</button></section>`;
      root.querySelector('[data-action="home"]')?.addEventListener('click', renderHome);
      return;
    }
    session = createSession(selected);
    showCurrentQuestion();
  }

  function showCurrentQuestion(): void {
    if (!session) return;
    const question = currentQuestion(session);
    if (!question) {
      renderSummary(session.answers);
      return;
    }
    progress = recordShown(progress, question);
    persist();
    const answered = session.answers[session.currentIndex];
    root.innerHTML = `
      <div class="quiz-top"><span>Question ${session.currentIndex + 1} of ${session.questions.length}</span><button class="text-button" data-action="quit">Quit</button></div>
      <div class="meter"><span style="width:${((session.currentIndex + (answered ? 1 : 0)) / session.questions.length) * 100}%"></span></div>
      <article class="card question-card"><div class="meta"><span>${escapeHtml(question.topic)}</span><span>${escapeHtml(question.difficulty)}</span>${question.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div><h1>${escapeHtml(question.question)}</h1><div class="options">${question.options.map((option, index) => `<button class="option" data-option="${escapeHtml(option.id)}"><b>${String.fromCharCode(65 + index)}</b><span>${escapeHtml(option.text)}</span></button>`).join('')}</div><div id="feedback"></div></article>`;
    root.querySelector('[data-action="quit"]')?.addEventListener('click', renderHome);
    root.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((button) => button.addEventListener('click', () => submitAnswer(button.dataset.option ?? '')));
  }

  function submitAnswer(optionId: string): void {
    if (!session || session.answers.length > session.currentIndex) return;
    const question = currentQuestion(session);
    if (!question) return;
    session = answerQuestion(session, optionId);
    const answer = session.answers.at(-1);
    if (!answer) return;
    progress = recordAnswer(progress, question, answer.correct);
    persist();
    root.querySelectorAll<HTMLButtonElement>('[data-option]').forEach((button) => {
      button.disabled = true;
      const id = button.dataset.option;
      if (id === question.correctOptionId) button.classList.add('correct');
      if (id === optionId && !answer.correct) button.classList.add('incorrect');
    });
    const feedback = root.querySelector<HTMLElement>('#feedback');
    if (!feedback) return;
    const correctText = question.options.find((option) => option.id === question.correctOptionId)?.text ?? question.correctOptionId;
    feedback.innerHTML = `<section class="feedback ${answer.correct ? 'is-correct' : 'is-incorrect'}"><h2>${answer.correct ? 'Correct' : 'Incorrect'}</h2>${answer.correct ? '' : `<p><strong>Correct answer:</strong> ${escapeHtml(correctText)}</p>`}<p>${escapeHtml(question.explanation)}</p><h3>Why each option?</h3><ul class="explanations">${question.options.map((option) => `<li><strong>${escapeHtml(option.text)}</strong><br>${escapeHtml(question.optionExplanations[option.id])}</li>`).join('')}</ul><button class="primary" data-action="next">${session.currentIndex + 1 === session.questions.length ? 'See summary' : 'Next question'}</button></section>`;
    feedback.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (!session) return;
      session = nextQuestion(session);
      showCurrentQuestion();
    });
  }

  function renderSummary(answers: SessionAnswer[]): void {
    const correct = answers.filter((answer) => answer.correct).length;
    const topics = [...new Set(answers.map((answer) => answer.question.topic))];
    root.innerHTML = `<header class="hero summary"><span class="eyebrow">SESSION COMPLETE</span><h1>${correct}/${answers.length}</h1><p>${Math.round((correct / answers.length) * 100)}% accuracy</p></header><section class="card"><h2>Results</h2><dl><div><dt>Total answered</dt><dd>${answers.length}</dd></div><div><dt>Correct</dt><dd>${correct}</dd></div><div><dt>Incorrect</dt><dd>${answers.length - correct}</dd></div></dl><h2>By topic</h2><ul class="topic-results">${topics.map((topic) => { const topicAnswers = answers.filter((answer) => answer.question.topic === topic); const topicCorrect = topicAnswers.filter((answer) => answer.correct).length; return `<li><span>${escapeHtml(topic)}</span><strong>${Math.round((topicCorrect / topicAnswers.length) * 100)}%</strong></li>`; }).join('')}</ul><button class="primary" data-action="home">Back home</button></section>`;
    root.querySelector('[data-action="home"]')?.addEventListener('click', renderHome);
  }

  renderHome();
}

import './styles.css';
import { validateQuestions } from './questions/validation';
import { loadProgress } from './progress/progressStore';
import { createApp } from './ui/render';

function getAppRoot(): HTMLElement {
  const element = document.querySelector<HTMLElement>('#app');
  if (!element) throw new Error('App root is missing.');
  return element;
}

const appRoot = getAppRoot();

async function start(): Promise<void> {
  const root = appRoot;
  root.innerHTML = '<section class="card"><p>Loading question bank…</p></section>';
  try {
    const response = await fetch('./questions.json');
    if (!response.ok) throw new Error(`Could not load questions.json (HTTP ${response.status}).`);
    const result = validateQuestions(await response.json());
    if (result.errors.length) {
      root.innerHTML = `<section class="card error"><h1>Question bank needs attention</h1><p>Fix these issues in <code>public/questions.json</code>:</p><ul>${result.errors.map((error) => `<li>${escapeHtml(error)}</li>`).join('')}</ul></section>`;
      return;
    }
    createApp(root, result.questions, loadProgress());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown loading error.';
    root.innerHTML = `<section class="card error"><h1>Could not start the app</h1><p>${escapeHtml(message)}</p></section>`;
  }
}

function escapeHtml(value: string): string {
  const span = document.createElement('span');
  span.textContent = value;
  return span.innerHTML;
}

void start();

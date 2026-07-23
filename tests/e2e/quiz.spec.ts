import { expect, test } from '@playwright/test';

test('incorrect feedback and progress persist on an Android viewport', async ({ page }) => {
  const bank: Array<{ question: string; correctOptionId: string }> = await (await page.request.get('/questions.json')).json();

  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Architect Practice' })).toBeVisible();
  await page.getByRole('button', { name: /Quick 5/ }).click();

  const questionText = await page.locator('.question-card h1').innerText();
  const question = bank.find((item) => item.question === questionText);
  if (!question) throw new Error(`Displayed question not found in question bank: ${questionText}`);

  await page.locator(`.option:not([data-option="${question.correctOptionId}"])`).first().click();
  await expect(page.getByRole('heading', { name: 'Incorrect' })).toBeVisible();
  await expect(page.getByText('Correct answer:', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why each option?' })).toBeVisible();
  await expect(page.locator(`.option[data-option="${question.correctOptionId}"]`)).toHaveClass(/correct/);

  await page.reload();
  await expect(page.getByTestId('saved-progress')).toContainText('1 answer saved');
});

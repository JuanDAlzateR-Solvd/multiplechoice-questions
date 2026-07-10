import { expect, test } from '@playwright/test';

test('incorrect feedback and progress persist on an Android viewport', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Architect Practice' })).toBeVisible();
  await page.getByRole('button', { name: /Quick 5/ }).click();
  const correct = page.locator('.option').filter({ has: page.locator('text=/^B$/') });
  await page.locator('.option').filter({ has: page.locator('text=/^A$/') }).click();
  await expect(page.getByRole('heading', { name: 'Incorrect' })).toBeVisible();
  await expect(page.getByText('Correct answer:', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Why each option?' })).toBeVisible();
  await expect(correct).toHaveClass(/correct/);
  await page.reload();
  await expect(page.getByTestId('saved-progress')).toContainText('1 answer saved');
});

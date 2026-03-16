import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/vue/dist/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Купить блины с красной икрой и отпраздновать масленицу');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByText('Купить блины с красной икрой и отпраздновать масленицу').click();
  await expect(page.getByRole('main')).toContainText('Купить блины с красной икрой');
});
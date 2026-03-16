import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('file:///Users/lindaleiba/OTT/qa-api-autotests/tests/burger-order.html');
  await page.getByRole('textbox', { name: 'Имя клиента' }).fill('Линда');
  await page.getByRole('combobox', { name: 'Тип бургера' }).selectOption('cheeseburger');
  await page.getByRole('radio', { name: 'Большой' }).click();
await page.getByRole('checkbox', { name: 'Горчица' }).click();
await page.getByRole('switch', { name: 'Горчица' }).click();
await page.getByRole('button', { name: 'Горчица' }).click();
});


test('test 2', async ({ page }) => {
  await page.goto('file:///Users/lindaleiba/OTT/qa-api-autotests/tests/burger-order.html');
    await page.locator('.order-form').locator('.form-group').locator('input').first().fill('Sniper');
    await page.locator('.order-form').locator('select').first().selectOption('cheeseburger');
});

test.only('Поиск селекторов по ID', async ({ page }) => {
    await page.goto('file:///Users/lindaleiba/OTT/qa-api-autotests/tests/burger-order.html');
    await page.locator('#customerName').fill('Sniper');
    await page.locator('#burgerType').selectOption('cheeseburger');
    await page.locator('#quantity').fill('2');

    await page.getByRole('button', { name: 'Заказать бургер' }).click();

// todo
    await expect(page.getByRole('heading', { name: '✅ Заказ принят!'})).toBeVisible();

  });
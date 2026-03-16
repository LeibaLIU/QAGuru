import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';

let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.fullName(({ lastName: 'Bin' })),
}

async function gotoUrl (page){
    await page.goto(URL);
    return page;
  }

test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
let userSecond = structuredClone(user);
console.log(userSecond);


await gotoUrl(page);
await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).click();
  await page.getByRole('textbox', { name: 'Your Name' }).fill(user.username);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(user.email);
  await page.getByRole('textbox', { name: 'Email' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password' }).fill(user.password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await expect(page.getByRole('main')).toContainText('Your Feed');
  // todo может быть проблемный ассерт из-за длинного имени
  await expect(page.getByRole('navigation')).toContainText(user.username);
});

test('Пользователь может зарегистрироваться используя email и пароль v2', async ({ page }) => {
// Деструктуризация 
    /*
    username = user.username;
    password = user.password;
    email = user.email;
*/

let dog = {
    age: 4,
    color: 'orange belton',
    name: 'Belka',
    gender: 'Suka',
}

dog.isSweet = true;
console.log(dog.isSweety);


const {email, password, username } = user;

    await gotoUrl(page);
    await page.getByRole('link', { name: 'Sign up' }).click();
      await page.getByRole('textbox', { name: 'Your Name' }).click();
      await page.getByRole('textbox', { name: 'Your Name' }).fill(username);
      await page.getByRole('textbox', { name: 'Email' }).click();
      await page.getByRole('textbox', { name: 'Email' }).fill(email);
      await page.getByRole('textbox', { name: 'Email' }).press('Tab');
      await page.getByRole('textbox', { name: 'Password' }).fill(password);
      await page.getByRole('button', { name: 'Sign up' }).click();
      await expect(page.getByRole('main')).toContainText('Your Feed');
      // todo может быть проблемный ассерт из-за длинного имени
      await expect(page.getByRole('navigation')).toContainText(username);
    });
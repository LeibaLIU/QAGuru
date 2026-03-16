import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

const URL = 'https://realworld.qa.guru/';

let email = faker.internet.email();
let password = faker.internet.password();
let username = faker.person.fullName(({ lastName: 'Bin' }));

async function gotoUrl (page){
    await page.goto(URL);
    return page;
  }

test('Пользователь может зарегистрироваться используя email и пароль', async ({ page }) => {
   /* console.log(getPlus(5));
    function getPlus (a, b){
        const summa = a+b;
        return summa;
      }
      
     const getPlusV2 = function (a, b){
        const summa = a+b;
        return summa;
      }
      const getPlusV3 = (a, b) => {
        const summa = a+b;
        return summa;
      }
    
      getPlusV2(3,7);
      getPlusV3(3,7);
      
    /*
    function getPlus (a, b){
        const summa = a+b;
        return summa;
      }
    function getPassword(){
        let password = faker.internet.password();
        return password;
    }
    function getInvalidUsername (username){
        const invalidUsername = ' ' + username;
        return invalidUsername;
    } 
    
*/
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

test('Пользователь не может повторно зарегистрироваться используя существующий email и пароль', async ({ page }) => {
    await page.goto(URL);
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

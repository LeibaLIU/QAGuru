import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

import { MainPage}  from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import  {YourfeedPage} from '../src/pages/yourfeed.page';


let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.fullName(({ lastName: 'Bin' })),
}
test('Пользователь может зарегистрироваться используя email и пароль page object', async ({ page }) => {

    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);


    await main.open();
    await main.gotoRegistrer();
    await register.rignup(user);
await expect(yourfeed.getProfileName()).toContainText(user.username);


});
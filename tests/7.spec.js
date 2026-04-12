import { expect, test } from '@playwright/test';

const URL = 'https://realworld.qa.guru/';

test('Ассерты видимости', async ({ page }) => {
	await page.goto(URL);
	await expect(page.locator('.article-preview')).toBeVisible();
	await expect(page.locator('.error')).toBeHidden();
});

test('Ассерты активности', async ({ page }) => {
	await page.goto('https://realworld.qa.guru/#/login');
	await expect(page.locator('.btn')).toBeEnabled();
	await expect(
		page.getByRole('textbox', { name: 'Password' })
	).not.toBeDisabled();
});

test('Ассерты инпута', async ({ page }) => {
	await page.goto('https://realworld.qa.guru/#/register');
	await page
		.getByRole('textbox', { name: 'Your Name' })
		.fill(' Константиновский Константин Константинович ');

	// для инпутов
	await expect(page.getByRole('textbox', { name: 'Your Name' })).toHaveValue(
		' Константиновский Константин Константинович '
	);
});

test('Ассерты текста', async ({ page }) => {
	await page.goto(URL);

	await expect(
		page.getByText('A place to share your knowledge.')
	).toContainText('share');
	await expect(page.getByText('A place to share your knowledge.')).toHaveText(
		'A place to share your knowledge.'
	);
	await expect(page.getByText('A place to share your knowledge.'))
		.filter({ visible: true })
		.toHaveText('A place to share your knowledge.');
});

test('Количество элементов', async ({ page }) => {
	await page.goto(URL);

	await expect(page.locator('.article-preview')).toHaveCount(3);
});
/*
- урл страницы await expect(page).toHaveURL()
await expect(locator).toHaveCount()
*/

/*
getByRole - playwright recommended - автотматом не будет искать скрытые элементы
getByText - await expect



*/

/*

loginPage

async login (email, password) {
     await this.nameInput.click();
        await this.nameInput.fill(username);
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.signupButton.click();

        await expect(this.page).toHaveURL('login'); - теста
        await expect(this.page.locator(.profile)).toBeVisible(); - теста
}

*/

/*

class loginPage {

async loginForSuccess(email, password) {}
async loginForError(email, password){}
async loginForValidation(email, password) {}

}
loginTest


Это тесты
await loginForSuccess(email, password);
await loginForError(email, password);
await loginForValidation(email, password);


export class RegisterPage {
    constructor (page)
    {
        this.page = page;
// Техническое описание страницы - селекторы/локаторы
this.signupButton = page.getByRole('button', { name: 'Sign up' })

this.emailInput = page.getByRole('textbox', { name: 'Email' });
this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    }

 export class RegisterPage {
    constructor (page)
    {
        this.page = page;
// Техническое описание страницы - селекторы/локаторы
this.signupButton = page.getByRole('button', { name: 'Sign up' })

this.emailInput = page.getByRole('textbox', { name: 'Email' });
this.nameInput = page.getByRole('textbox', { name: 'Your Name' });
this.passwordInput = page.getByRole('textbox', { name: 'Password' });

    }

     async fillEmail(user){
        const {email, password, username } = user;
        await this.emailInput.click();
        await this.emailInput.fill(email);
     
    }
          async fillPassword(user){
        const { password } = user;
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
     
    }

        async fillName(user){
        const { username } = user;
   await this.nameInput.click();
        await this.nameInput.fill(username);
     
    }

       async click(){
         await this.signupButton.click();
    }
}
 const register = new RegisterPage(page);

 await register.fillEmail();
 await register.fillPassword();
 await register.fillName();
 await register.click();



*/

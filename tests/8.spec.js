import { test } from '../src/helpers/fixtures/fixture';
import { expect } from '@playwright/test';
import { UserBuilder } from '../src/helpers/builders/index';

test('Пользователь может зарегистрироваться используя email и пароль facade + fixture', async ({
	app
}) => {

	const user = new UserBuilder()
		.withEmail()
		.withPassword()
		.withUsername()
		.build();
//	await app.main.open();

	//act
	await app.main.gotoRegister();
	await app.register.signup(user);

	//assert
	await expect(app.yourfeed.profileName).toContainText(user.username);
	await expect(app.yourfeed.getProfileName()).toContainText(user.username);
});

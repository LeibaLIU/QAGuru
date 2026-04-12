import {test as base} from '@playwright/test';
import { App } from '../../pages/app.page';
export const test = base.extend({

    app: async( {page}, use ) => {

        const app = new App(page);
        await app.main.open();
        await use(app);

    },
 /*   newUser:  async( {}, use ) => {
        const user = new UserBuilder()
		.withEmail()
		.withPassword()
		.withUsername()
		.build();
        await use(user);
    }, */
});
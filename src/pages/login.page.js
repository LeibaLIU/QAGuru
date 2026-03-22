
export class LoginPage {
    constructor(page) {
        this.page = page;

        this.loginLink = page.getByRole('link', { name: ' Login' });
        this.emailInput = page.getByRole('textbox', { name: 'Email' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        
        this.bioInput = page.getByRole('textbox', { name: 'Short bio about you' });
        this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
    }

    async goToLogin() {
        await this.loginLink.click();
    }

    async login(email, password) {
        await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.passwordInput.click();
        await this.passwordInput.fill(password);
        await this.loginButton.click();

        await this.page.waitForURL('https://realworld.qa.guru/#/');
    }

    async goToProfile(username) {
        await this.page.getByText(username).click();
        await this.page.getByRole('link', { name: ' Profile' }).click();
    }

    async goToSettings(username) {

        await this.page.getByText(username).click();
        await this.page.getByRole('link', { name: ' Settings' }).click();
    }

    async updateBio(bioText) {
        await this.bioInput.click();
        await this.bioInput.fill(bioText);
        await this.updateSettingsButton.click();
        
        await this.page.waitForURL('https://realworld.qa.guru/#/settings');
    }

    getProfileName(username) {
        return this.page.getByRole('heading', { name: username });
    }

    getSettingsEmail() {
        return this.page.getByRole('textbox', { name: 'Email' });
    }

    getBioInput() {
        return this.bioInput;
    }
}

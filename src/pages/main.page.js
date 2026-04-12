
export class MainPage  

    {
    constructor(page)
    {
    this.page = page;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
}
async gotoRegister(){
    await this.signUpLink.click();
}
async open() 
{
    await this.page.goto('https://realworld.qa.guru/');
}

}


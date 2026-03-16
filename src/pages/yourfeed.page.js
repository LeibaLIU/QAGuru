
export class Yourfeelpage   
    {
constructor(page)
    {
    this.page = page;

    this.prfileName = page.getByRole('navigation');

}

async getProfileName(){
    return this.prfileName;
}

}

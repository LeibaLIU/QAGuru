
export class FeedPage {
    constructor(page) {
        this.page = page;
        
        this.globalFeedButton = page.getByRole('button', { name: 'Global Feed' });
    }

    async goToGlobalFeed() {
        await this.globalFeedButton.click();
    }

    async likeArticle(index = 0) {
        await this.page.getByRole('button', { name: /\(\s*\d+\s*\)/ }).nth(index).click();
    }

    getLikeButton(index = 0) {
        return this.page.getByRole('button', { name: /\(\s*\d+\s*\)/ }).nth(index);
    }
}

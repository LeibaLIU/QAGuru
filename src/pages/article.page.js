export class ArticlePage {
    constructor(page) {
        this.page = page;

        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleAbout = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleWrite = page.getByRole('textbox', { name: 'Write your article (in Markdown)' });
        this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.editArticleLink = page.getByRole('link', { name: ' Edit Article' }).nth(1);
        this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
        this.deleteArticleButton = page.getByRole('button', { name: ' Delete Article' }).nth(1);
    }

    getArticleTitle() {
        return this.page.getByRole('heading');
    }

    async editArticle(article) {
        const { title, about, text, tag } = article;

        await this.editArticleLink.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleAbout.click();
        await this.articleAbout.fill(about);
        await this.articleWrite.click();
        await this.articleWrite.fill(text);
        await this.articleTag.click();
        await this.articleTag.fill(tag);
        await this.updateArticleButton.click();

        await this.page.waitForURL(/\/article\//);
    }

    async deleteArticle() {
        this.page.once('dialog', dialog => {
            dialog.accept();
        });
        await this.deleteArticleButton.click();
        await this.page.waitForURL('https://realworld.qa.guru/#/');
    }

    getMainPageURL() {
        return 'https://realworld.qa.guru/#/';
    }
}

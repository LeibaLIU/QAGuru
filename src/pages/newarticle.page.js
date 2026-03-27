export class NewArticlePage {
    constructor(page) {
        this.page = page;

        this.NewArticleLink = page.getByRole('link', { name: ' New Article' });

        this.articleTitle = page.getByRole('textbox', { name: 'Article Title' });
        this.articleAbout = page.getByRole('textbox', { name: 'What\'s this article about?' });
        this.articleWrite = page.getByRole('textbox', { name: 'Write your article (in Markdown)' });
        this.articleTag = page.getByRole('textbox', { name: 'Enter tags' });
        this.articlePublish = page.getByRole('button', { name: 'Publish Article' });
    }

    async newArticle(article) {
        const { title, about, text, tag } = article;

        await this.NewArticleLink.click();
        await this.articleTitle.click();
        await this.articleTitle.fill(title);
        await this.articleAbout.click();
        await this.articleAbout.fill(about);
        await this.articleWrite.click();
        await this.articleWrite.fill(text);
        await this.articleTag.click();
        await this.articleTag.fill(tag);
        await this.articlePublish.click();

        await this.page.waitForURL(/\/article\//);
    }

    getArticleTitle() {
        return this.page.getByRole('heading');
    }
}

import { test, expect } from '@playwright/test';
import {faker} from '@faker-js/faker';

import { MainPage}  from '../src/pages/main.page';
import { RegisterPage } from '../src/pages/register.page';
import  {YourfeedPage} from '../src/pages/yourfeed.page';
import { ArticlePage } from '../src/pages/article.page';
import { LoginPage } from '../src/pages/login.page';
import { FeedPage } from '../src/pages/feed.page';


let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.person.fullName(({ lastName: 'Bin' })),
}

let loginCredentials = {
    email: 'lindatest@gmail.com',
    password: '123456',
    username: 'Linda'
}

let profileBio = {
    bio: faker.lorem.paragraph()
}

let article = {
    title: faker.lorem.sentence(),
    about: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
}

let editedArticle = {
    title: faker.lorem.sentence(),
    about: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    tag: faker.lorem.word(),
}

test('Регистрация нового пользователя', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);

    await main.open();
    await main.gotoRegistrer();
    await register.rignup(user);
    await expect(yourfeed.getProfileName()).toContainText(user.username);
});

test('Создание новой статьи', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);

    await main.open();
    await main.gotoRegistrer();
    await register.rignup(user);
    await expect(yourfeed.getProfileName()).toContainText(user.username);

    await articlePage.newArticle(article);
    await expect(articlePage.getArticleTitle()).toBeVisible();
});

test('Редактирование статьи', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);

    await main.open();
    await main.gotoRegistrer();
    await register.rignup(user);
    await expect(yourfeed.getProfileName()).toContainText(user.username);

    await articlePage.newArticle(article);
    await expect(articlePage.getArticleTitle()).toBeVisible();

    await articlePage.editArticle(editedArticle);
    await expect(articlePage.getArticleTitle()).toBeVisible();
});

test('Удаление статьи', async ({ page }) => {
    const main = new MainPage(page);
    const register = new RegisterPage(page);
    const yourfeed = new YourfeedPage(page);
    const articlePage = new ArticlePage(page);

    await main.open();
    await main.gotoRegistrer();
    await register.rignup(user);
    await expect(yourfeed.getProfileName()).toContainText(user.username);

    await articlePage.newArticle(article);
    await expect(articlePage.getArticleTitle()).toBeVisible();

    await articlePage.deleteArticle();
    await expect(page).toHaveURL(articlePage.getMainPageURL());
});

test('Лайк другим статьям', async ({ page }) => {
    const main = new MainPage(page);
    const login = new LoginPage(page);
    const feed = new FeedPage(page);

    await main.open();
    await login.goToLogin();
    await login.login(loginCredentials.email, loginCredentials.password);
    await feed.goToGlobalFeed();
    await feed.likeArticle(0);
    await expect(feed.getLikeButton(0)).toContainText(/[1-9]\d*/);
});

test('Авторизация ранее зарегистрированным пользователем', async ({ page }) => {
    const main = new MainPage(page);
    const login = new LoginPage(page);

    await main.open();
    await login.goToLogin();
    await login.login(loginCredentials.email, loginCredentials.password);
    await login.goToProfile(loginCredentials.username);
    await expect(login.getProfileName(loginCredentials.username)).toBeVisible();
});

test('Открытие страницы Settings авторизованным пользователем', async ({ page }) => {
    const main = new MainPage(page);
    const login = new LoginPage(page);

    await main.open();
    await login.goToLogin();
    await login.login(loginCredentials.email, loginCredentials.password);
    await login.goToSettings(loginCredentials.username);
    await expect(login.getSettingsEmail()).toBeVisible();
});

test('Редактирование биографии пользователя', async ({ page }) => {
    const main = new MainPage(page);
    const login = new LoginPage(page);

    await main.open();
    await login.goToLogin();
    await login.login(loginCredentials.email, loginCredentials.password);
    await login.goToSettings(loginCredentials.username);
    await login.updateBio(profileBio.bio);
    await expect(login.getBioInput()).toHaveValue(profileBio.bio);
});


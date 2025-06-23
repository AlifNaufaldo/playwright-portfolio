const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('[data-test="username"]'); 
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async verifyErrorMessage(expectedMessage) {
        await expect(this.errorMessage).toBeVisible(); 
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    async verifyOnLoginPage() {
        await expect(this.loginButton).toBeVisible();
        await expect(this.page).toHaveURL('https://www.saucedemo.com/');
    }
}

module.exports = { LoginPage };
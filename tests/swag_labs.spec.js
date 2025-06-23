// tests/swag_labs.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../page-objects/LoginPage');
const { ProductDetailPage } = require('../page-objects/ProductDetailPage');
const { ProductsPage } = require('../page-objects/ProductPage');

test.describe('Swag Labs Core Functionality Tests', () => {

    let loginPage;
    let productsPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.navigate();
    });

    // Test Case 1: Successful User Login
    test('TC_LOGIN_001: Should successfully log in with standard user credentials', async ({ page }) => {
        await test.step('Navigate to login page and enter valid credentials', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
        });
        await test.step('Verify redirection to products page', async () => {
            await productsPage.verifyOnProductsPage();
        });
    });

    // Test Case 2: Login with Invalid Credentials
    test('TC_LOGIN_002: Should display error message for invalid login credentials', async ({ page }) => {
        await test.step('Navigate to login page and enter invalid credentials', async () => {
            await loginPage.login('invalid_user', 'wrong_password');
        });
        await test.step('Verify error message is displayed and user remains on login page', async () => {
            await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
            await loginPage.verifyOnLoginPage();
        });
    });

    // Test Case 3: Add Item to Cart and Verify
    test('TC_CART_001: Should add "Sauce Labs Backpack" to cart and update badge', async ({ page }) => {
        await test.step('Log in as standard user', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
            await productsPage.verifyOnProductsPage();
        });
        await test.step('Add "Sauce Labs Backpack" to cart', async () => {
            await productsPage.addItemToCart('Sauce Labs Backpack');
        });
        await test.step('Verify cart badge shows 1 item', async () => {
            await productsPage.verifyCartBadgeCount(1);
        });
    });

    // Test Case 4: Remove Item from Cart and Verify
    test('TC_CART_002: Should remove "Sauce Labs Backpack" from cart and update badge', async ({ page }) => {
        await test.step('Log in as standard user and add item to cart', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
            await productsPage.verifyOnProductsPage();
            await productsPage.addItemToCart('Sauce Labs Backpack');
            await productsPage.verifyCartBadgeCount(1);
        });
        await test.step('Remove "Sauce Labs Backpack" from cart', async () => {
            await productsPage.sauceLabsBackpackRemoveButton.click();
        });
        await test.step('Verify cart badge is not visible', async () => {
            await productsPage.verifyCartBadgeCount(0);
        });
    });

});
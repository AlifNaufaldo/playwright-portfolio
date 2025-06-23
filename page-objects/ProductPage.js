// page-objects/ProductsPage.js
const { expect } = require('@playwright/test');

class ProductsPage {
    constructor(page) {
        this.page = page;
        this.productsTitle = page.locator('.title');
        this.shoppingCartBadge = page.locator('.shopping_cart_badge');
        this.sauceLabsBackpackAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.sauceLabsBackpackRemoveButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.sauceLabsBikeLightAddToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]');
        this.sauceLabsBikeLightPrice = page.locator('[data-test="item-4-price"]'); 
        this.sauceLabsBikeLightLink = page.locator('#item_0_title_link');
    }

    async verifyOnProductsPage() {
        await expect(this.productsTitle).toBeVisible();
        await expect(this.productsTitle).toHaveText('Products');
        await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    }

    async addItemToCart(itemName) {
        if (itemName === 'Sauce Labs Backpack') {
            await this.sauceLabsBackpackAddToCartButton.click();
        } else if (itemName === 'Sauce Labs Bike Light') {
            await this.sauceLabsBikeLightAddToCartButton.click();
        }
    }

    async verifyCartBadgeCount(count) {
        if (count === 0) {
            await expect(this.shoppingCartBadge).not.toBeVisible();
        } else {
            await expect(this.shoppingCartBadge).toBeVisible();
            await expect(this.shoppingCartBadge).toHaveText(String(count));
        }
    }

    async getProductPrice(itemName) {
        if (itemName === 'Sauce Labs Bike Light') {
            return await this.sauceLabsBikeLightPrice.textContent();
        }
        return null;
    }

    async clickProductLink(itemName) {
        if (itemName === 'Sauce Labs Bike Light') {
            await this.sauceLabsBikeLightLink.click();
        }
    }
}

module.exports = { ProductsPage };
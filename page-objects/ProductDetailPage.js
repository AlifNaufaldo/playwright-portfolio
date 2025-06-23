const { expect } = require('@playwright/test');

class ProductDetailPage {
    constructor(page) {
        this.page = page;
        this.productName = page.locator('.inventory_details_name');
        this.productPrice = page.locator('.inventory_details_price');
        this.backToProductsButton = page.locator('[data-test="back-to-products"]');
    }

    async verifyOnProductDetailPage(expectedProductName) {
        await expect(this.productName).toBeVisible();
        await expect(this.productName).toHaveText(expectedProductName);
    }

    async getProductPrice() {
        return await this.productPrice.textContent();
    }

    async clickBackToProducts() {
        await this.backToProductsButton.click();
    }
}

module.exports = { ProductDetailPage };
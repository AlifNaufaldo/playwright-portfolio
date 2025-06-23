## 💡 Key Learnings & Implementation Details

My journey with Playwright involved understanding and applying several core concepts:

### 1. Setting Up the Automation Environment
I started by setting up the Playwright environment, which involved:
*   Installing Node.js and initializing a new Node.js project. 
*   Installing Playwright and its default browsers (Chromium, Firefox, WebKit) using `npm install @playwright/test`. 
*   Verifying the installation by running a sample test. 

### 2. Implementing the Page Object Model (POM)
A crucial learning point was implementing POM. Instead of embedding locators and actions directly in test files, I created dedicated Page Object classes for `LoginPage`, `ProductsPage`, and `ProductDetailPage`. 
*   **Locators**: Defined within the Page Object constructors using Playwright's robust locators (e.g., `page.locator('[data-test="username"]')`). I prioritized `data-test` attributes for stable and unique element identification, reducing test flakiness.
*   **Methods**: Encapsulated user interactions (e.g., `loginPage.login()`, `productsPage.addItemToCart()`) within Page Object methods, making test scripts cleaner and more focused on verification. 

### 3. Writing Robust Test Cases
I developed several test cases for Swag Labs, focusing on critical user paths:
*   **Successful Login (`TC_LOGIN_001`)**: Verifies that a standard user can log in and is redirected to the products page.
*   **Invalid Login (`TC_LOGIN_002`)**: Confirms that the application displays an appropriate error message for incorrect credentials.
*   **Add Item to Cart (`TC_CART_001`)**: Tests the functionality of adding a product and verifies the cart badge update.
*   **Remove Item from Cart (`TC_CART_002`)**: Ensures a product can be removed from the cart and the badge updates correctly.

### 4. Playwright Best Practices in Action
*   **Test Isolation**: Each test is designed to run independently, using `test.beforeEach` to ensure a clean starting state (navigating to the login page). This prevents tests from affecting each other and simplifies debugging.
*   **Web-First Assertions**: I leveraged Playwright's built-in auto-waiting and web-first assertions (e.g., `await expect(element).toBeVisible()`) to handle dynamic web elements and reduce flaky tests, eliminating the need for arbitrary `sleep()` commands.
*   **`test.step()` for Readability**: I used `test.step()` to annotate logical sections within each test, which significantly improves the readability of the test code and provides clear steps in the generated HTML reports.

## ⚙️ How to Run This Project

To run these tests locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone
    cd playwright-portfolio
    ```
2.  **Install Node.js:** If you don't have Node.js installed, download the latest LTS version from [nodejs.org](https://nodejs.org/). 
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Install Playwright browsers:**
    ```bash
    npx playwright install --with-deps
    ```
5.  **Run the tests:**
    ```bash
    npx playwright test
    ```
    To run tests in headed mode (with a visible browser UI):
    ```bash
    npx playwright test --headed
    ```
    To run a specific test file:
    ```bash
    npx playwright test tests/swag_labs.spec.js
    ```

## 📊 Reporting

Playwright generates comprehensive HTML reports that provide detailed insights into test execution. 

To view the HTML report after running tests:
```bash
npx playwright show-report

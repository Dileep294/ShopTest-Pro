# E-Commerce QA Automation Testing Framework

An industry-level, production-grade E2E and API QA Automation Framework built with **Cypress**, **JavaScript (ES6)**, **Mocha**, **Chai**, and **Mochawesome Reporting**. Designed using the **Page Object Model (POM)** design pattern for scalability, maintainability, and clean separation of test logic, data, and page locators.

Target Application: [SauceDemo (Swag Labs)](https://www.saucedemo.com)

---

## 🚀 Key Features

- 🏗️ **Page Object Model (POM)** Architecture for maintainable locators & actions.
- 🧪 **Comprehensive E2E Test Suites**: Login, Product Catalog, Shopping Cart, Checkout, and Order Confirmation.
- 📡 **API Automation Testing**: Custom REST API test suite utilizing `cy.request`.
- 📊 **Mochawesome HTML Reporting**: Aggregated test reports with execution details and failure screenshots.
- 🛠️ **Custom Cypress Commands**: Reusable actions (`cy.login`, `cy.addProductToCart`, `cy.logout`).
- 📁 **Fixtures & Data-Driven Testing**: External JSON test data for credentials, products, and checkout forms.
- 🎥 **Video & Screenshot Capture**: Automatic failure screenshot capture and headless video recording.
- 🌐 **Cross-Browser & Parallel Ready**: Command-line support for Chrome, Firefox, and Edge execution.

---

## 📁 Directory Structure

```
ecommerce-testing-framework/
├── cypress/
│   ├── e2e/
│   │   ├── login.cy.js          # Authentication & Login scenario tests
│   │   ├── product.cy.js        # Catalog, sorting, and cart action tests
│   │   ├── cart.cy.js           # Cart item validation & navigation tests
│   │   ├── checkout.cy.js       # Customer info & purchase order completion tests
│   │   └── api.cy.js            # API automation suite using cy.request
│   ├── fixtures/
│   │   ├── users.json           # User credentials & validation error messages
│   │   ├── products.json        # Catalog product details & pricing data
│   │   └── checkoutData.json    # Customer shipping form test data
│   ├── pages/
│   │   ├── LoginPage.js         # POM class for Login page
│   │   ├── ProductPage.js       # POM class for Inventory/Products page
│   │   ├── CartPage.js          # POM class for Cart page
│   │   └── CheckoutPage.js      # POM class for Checkout pages (Steps 1, 2 & Complete)
│   └── support/
│       ├── commands.js          # Reusable custom Cypress commands
│       └── e2e.js               # Global configuration & uncaught exception handlers
├── reports/
│   ├── json/                    # Mochawesome raw test outputs
│   └── html/                    # Generated standalone HTML test reports
├── screenshots/                 # Auto-captured failure screenshots
├── videos/                      # Video recordings of spec execution
├── cypress.config.js            # Main Cypress configuration file
├── package.json                 # NPM scripts & dev dependencies
└── README.md                    # Framework documentation
```

---

## 🛠️ Prerequisites & Setup

### 1. Prerequisites
- **Node.js** (v16+ recommended)
- **npm** (v8+ recommended)

### 2. Installation
Clone the repository and install all dependencies:

```bash
# Clone the repository and enter the project directory
git clone <repository-url>
cd ShopTest-Pro

# Install dependencies
npm install
```

---

## 🧪 How to Run Tests

### 1. Interactive Test Runner (Cypress GUI)
Open the Cypress Launchpad to inspect and execute tests interactively:

```bash
npm run cypress:open
```

### 2. Headless Test Execution (All Specs)
Execute all E2E & API test suites headlessly in Electron:

```bash
npm run cypress:run
# or
npm test
```

### 3. Run Specific Test Suite
Execute a single test file headlessly:

```bash
npx cypress run --spec "cypress/e2e/login.cy.js"
```

### 4. Cross-Browser Execution
Run test suites on specific browsers installed on your environment:

```bash
# Run in Chrome
npm run test:chrome

# Run in Firefox
npm run test:firefox

# Run in Edge
npm run test:edge
```

---

## 📊 Generating Reports

The framework uses **Mochawesome** to generate HTML test reports.

To run tests and compile the merged HTML report in one step:

```bash
npm test
```

To manually merge JSON outputs and generate the HTML report:

```bash
npm run generate:report
```

Report Output Location:
- Merged HTML Report: `reports/html/report.html` (generated after a successful `npm test` run)

---

## 🧩 Test Scenarios Covered

| Module | Test ID | Description |
| :--- | :--- | :--- |
| **Login** | TC-LOGIN-01 | Successful login with valid credentials |
| | TC-LOGIN-02 | Error display on invalid credentials |
| | TC-LOGIN-03 | Error message for locked-out user |
| | TC-LOGIN-04 | Empty username field validation |
| | TC-LOGIN-05 | Empty password field validation |
| | TC-LOGIN-06 | User logout functionality |
| **Products** | TC-PROD-01 | Product list rendering verification |
| | TC-PROD-02 | Price sorting (Low to High) |
| | TC-PROD-03 | Price sorting (High to Low) |
| | TC-PROD-04 | Add products & verify cart badge update |
| | TC-PROD-05 | Remove products & verify cart badge update |
| **Cart** | TC-CART-01 | Verify items in cart |
| | TC-CART-02 | Remove item directly from cart page |
| | TC-CART-03 | Continue Shopping button navigation |
| | TC-CART-04 | Proceed to Checkout button navigation |
| **Checkout**| TC-CHK-01 | Validate mandatory input fields in step 1 |
| | TC-CHK-02 | Customer details submission & overview check |
| | TC-CHK-03 | Order completion & success message verification |
| **API** | TC-API-01-06 | GET, POST, PUT, DELETE REST API request validations |

---
## ⚙️ Best Practices Implemented

1. **Page Object Model (POM)**: Complete isolation of DOM selectors and web actions into dedicated page classes.
2. **Robust Selectors**: Prioritizes `data-test` attributes to make tests resilient to UI changes.
3. **Data-Driven**: Uses Cypress `cy.fixture()` to read external JSON files for mock data.
4. **Clean Code**: Consistent Naming conventions, async assertion chaining, explicit test IDs.

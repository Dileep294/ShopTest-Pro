// ***********************************************
// Custom Cypress Commands
// ***********************************************

/**
 * Custom command to perform user login
 * @example cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/');
  if (username) {
    cy.get('[data-test="username"]').clear().type(username);
  } else {
    cy.get('[data-test="username"]').clear();
  }

  if (password) {
    cy.get('[data-test="password"]').clear().type(password);
  } else {
    cy.get('[data-test="password"]').clear();
  }

  cy.get('[data-test="login-button"]').click();
});

/**
 * Custom command to add a product to cart by item name
 * @example cy.addProductToCart('Sauce Labs Backpack')
 */
Cypress.Commands.add('addProductToCart', (productName) => {
  const formattedName = productName.toLowerCase().replace(/ /g, '-');
  cy.get(`[data-test="add-to-cart-${formattedName}"]`).click();
});

/**
 * Custom command to remove a product from cart by item name
 * @example cy.removeProductFromCart('Sauce Labs Backpack')
 */
Cypress.Commands.add('removeProductFromCart', (productName) => {
  const formattedName = productName.toLowerCase().replace(/ /g, '-');
  cy.get(`[data-test="remove-${formattedName}"]`).click();
});

/**
 * Custom command to logout from the application
 */
Cypress.Commands.add('logout', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible').click();
});

/**
 * Custom command to reset application state
 */
Cypress.Commands.add('resetAppState', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#reset_sidebar_link').click();
  cy.get('#react-burger-cross-btn').click();
});

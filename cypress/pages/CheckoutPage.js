/**
 * Page Object Model for SauceDemo Checkout Pages (Step 1, Step 2, Complete)
 */
class CheckoutPage {
  // Page Selectors
  elements = {
    // Step 1: Information
    pageTitle: () => cy.get('.title'),
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    errorMessage: () => cy.get('[data-test="error"]'),

    // Step 2: Overview
    summaryItems: () => cy.get('.cart_item'),
    subtotalLabel: () => cy.get('.summary_subtotal_label'),
    taxLabel: () => cy.get('.summary_tax_label'),
    totalLabel: () => cy.get('.summary_total_label'),
    finishButton: () => cy.get('[data-test="finish"]'),

    // Step 3: Complete
    completeHeader: () => cy.get('[data-test="complete-header"]'),
    completeText: () => cy.get('[data-test="complete-text"]'),
    backHomeButton: () => cy.get('[data-test="back-to-products"]')
  };

  // Actions & Page Behaviors

  // Step 1 Actions
  verifyStepOnePage() {
    this.elements.pageTitle().should('have.text', 'Checkout: Your Information');
    cy.url().should('include', '/checkout-step-one.html');
    return this;
  }

  fillInformation(firstName, lastName, postalCode) {
    if (firstName) {
      this.elements.firstNameInput().clear().type(firstName);
    } else {
      this.elements.firstNameInput().clear();
    }

    if (lastName) {
      this.elements.lastNameInput().clear().type(lastName);
    } else {
      this.elements.lastNameInput().clear();
    }

    if (postalCode) {
      this.elements.postalCodeInput().clear().type(postalCode);
    } else {
      this.elements.postalCodeInput().clear();
    }

    return this;
  }

  clickContinue() {
    this.elements.continueButton().click();
    return this;
  }

  verifyErrorMessage(expectedText) {
    this.elements.errorMessage().should('be.visible').and('contain.text', expectedText);
    return this;
  }

  // Step 2 Actions
  verifyStepTwoPage() {
    this.elements.pageTitle().should('have.text', 'Checkout: Overview');
    cy.url().should('include', '/checkout-step-two.html');
    return this;
  }

  verifyOverviewTotal() {
    this.elements.subtotalLabel().should('be.visible');
    this.elements.taxLabel().should('be.visible');
    this.elements.totalLabel().should('be.visible');
    return this;
  }

  clickFinish() {
    this.elements.finishButton().click();
    return this;
  }

  // Complete Page Actions
  verifyOrderCompletion(expectedHeader, expectedMessage) {
    cy.url().should('include', '/checkout-complete.html');
    if (expectedHeader) {
      this.elements.completeHeader().should('be.visible').and('have.text', expectedHeader);
    }
    if (expectedMessage) {
      this.elements.completeText().should('be.visible').and('contain.text', expectedMessage);
    }
    return this;
  }

  clickBackHome() {
    this.elements.backHomeButton().click();
    return this;
  }
}

export default new CheckoutPage();

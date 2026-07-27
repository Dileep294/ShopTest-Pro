/**
 * Page Object Model for SauceDemo Login Page
 */
class LoginPage {
  // Page Selectors
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    loginLogo: () => cy.get('.login_logo')
  };

  // Actions & Page Behaviors
  visit() {
    cy.visit('/');
    this.elements.loginLogo().should('be.visible');
    return this;
  }

  enterUsername(username) {
    if (username !== undefined && username !== '') {
      this.elements.usernameInput().clear().type(username);
    } else {
      this.elements.usernameInput().clear();
    }
    return this;
  }

  enterPassword(password) {
    if (password !== undefined && password !== '') {
      this.elements.passwordInput().clear().type(password);
    } else {
      this.elements.passwordInput().clear();
    }
    return this;
  }

  clickLogin() {
    this.elements.loginButton().click();
    return this;
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  getErrorMessage() {
    return this.elements.errorMessage();
  }

  verifyErrorMessage(expectedMessage) {
    this.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', expectedMessage);
    return this;
  }
}

export default new LoginPage();

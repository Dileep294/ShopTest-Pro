import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';

describe('SauceDemo - Login Test Suite', () => {
  let userData;

  beforeEach(() => {
    cy.fixture('users').then((data) => {
      userData = data;
    });
    LoginPage.visit();
  });

  it('TC-LOGIN-01: Should successfully log in with valid credentials', () => {
    LoginPage.login(userData.validUser.username, userData.validUser.password);
    ProductPage.verifyOnProductPage();
  });

  it('TC-LOGIN-02: Should display error message for invalid credentials', () => {
    LoginPage.login(userData.invalidUser.username, userData.invalidUser.password);
    LoginPage.verifyErrorMessage(userData.errorMessages.invalidCredentials);
  });

  it('TC-LOGIN-03: Should display error message for locked out user', () => {
    LoginPage.login(userData.lockedUser.username, userData.lockedUser.password);
    LoginPage.verifyErrorMessage(userData.errorMessages.lockedOut);
  });

  it('TC-LOGIN-04: Should validate empty username field', () => {
    LoginPage.login(userData.emptyUsername.username, userData.emptyUsername.password);
    LoginPage.verifyErrorMessage(userData.errorMessages.requiredUsername);
  });

  it('TC-LOGIN-05: Should validate empty password field', () => {
    LoginPage.login(userData.emptyPassword.username, userData.emptyPassword.password);
    LoginPage.verifyErrorMessage(userData.errorMessages.requiredPassword);
  });

  it('TC-LOGIN-06: Should successfully logout from application', () => {
    LoginPage.login(userData.validUser.username, userData.validUser.password);
    ProductPage.verifyOnProductPage();
    ProductPage.logout();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

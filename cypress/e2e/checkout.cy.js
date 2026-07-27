import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

describe('SauceDemo - Checkout & Order Completion Test Suite', () => {
  let checkoutData;
  let productsData;

  beforeEach(() => {
    cy.fixture('checkoutData').then((data) => {
      checkoutData = data;
    });
    cy.fixture('products').then((data) => {
      productsData = data;
    });
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
    ProductPage.verifyOnProductPage();
    ProductPage.addProductToCartByName('Sauce Labs Backpack');
    ProductPage.goToCart();
    CartPage.clickCheckout();
    CheckoutPage.verifyStepOnePage();
  });

  it('TC-CHK-01: Should validate mandatory fields on checkout step one', () => {
    // Empty First Name
    CheckoutPage.fillInformation(checkoutData.emptyFirstName.firstName, checkoutData.emptyFirstName.lastName, checkoutData.emptyFirstName.postalCode);
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage(checkoutData.errorMessages.requiredFirstName);

    // Empty Last Name
    CheckoutPage.fillInformation(checkoutData.emptyLastName.firstName, checkoutData.emptyLastName.lastName, checkoutData.emptyLastName.postalCode);
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage(checkoutData.errorMessages.requiredLastName);

    // Empty Postal Code
    CheckoutPage.fillInformation(checkoutData.emptyPostalCode.firstName, checkoutData.emptyPostalCode.lastName, checkoutData.emptyPostalCode.postalCode);
    CheckoutPage.clickContinue();
    CheckoutPage.verifyErrorMessage(checkoutData.errorMessages.requiredPostalCode);
  });

  it('TC-CHK-02: Should proceed to overview page with valid customer information', () => {
    CheckoutPage.fillInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );
    CheckoutPage.clickContinue();
    CheckoutPage.verifyStepTwoPage();
    CheckoutPage.elements.summaryItems().should('have.length', 1);
    CheckoutPage.verifyOverviewTotal();
  });

  it('TC-CHK-03: Should complete order purchase and display success confirmation', () => {
    CheckoutPage.fillInformation(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );
    CheckoutPage.clickContinue();
    CheckoutPage.verifyStepTwoPage();
    CheckoutPage.clickFinish();

    CheckoutPage.verifyOrderCompletion(
      checkoutData.successHeader,
      checkoutData.successMessage
    );

    CheckoutPage.clickBackHome();
    ProductPage.verifyOnProductPage();
  });
});

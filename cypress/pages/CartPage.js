/**
 * Page Object Model for SauceDemo Cart Page
 */
class CartPage {
  // Page Selectors
  elements = {
    pageTitle: () => cy.get('.title'),
    cartItems: () => cy.get('.cart_item'),
    cartItemNames: () => cy.get('.inventory_item_name'),
    cartItemPrices: () => cy.get('.inventory_item_price'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]')
  };

  // Actions & Page Behaviors
  verifyOnCartPage() {
    this.elements.pageTitle().should('be.visible').and('have.text', 'Your Cart');
    cy.url().should('include', '/cart.html');
    return this;
  }

  verifyItemInCart(productName) {
    this.elements.cartItemNames().should('contain.text', productName);
    return this;
  }

  removeItemByName(productName) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    cy.get(`[data-test="remove-${formattedName}"]`).click();
    return this;
  }

  clickContinueShopping() {
    this.elements.continueShoppingButton().click();
    return this;
  }

  clickCheckout() {
    this.elements.checkoutButton().click();
    return this;
  }

  getCartItemsCount() {
    return this.elements.cartItems().its('length');
  }
}

export default new CartPage();

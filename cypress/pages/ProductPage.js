/**
 * Page Object Model for SauceDemo Inventory/Products Page
 */
class ProductPage {
  // Page Selectors
  elements = {
    pageTitle: () => cy.get('.title'),
    inventoryItems: () => cy.get('.inventory_item'),
    inventoryItemNames: () => cy.get('.inventory_item_name'),
    inventoryItemPrices: () => cy.get('.inventory_item_price'),
    sortDropdown: () => cy.get('[data-test="product-sort-container"]'),
    cartBadge: () => cy.get('.shopping_cart_badge'),
    shoppingCartLink: () => cy.get('.shopping_cart_link'),
    menuButton: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('#logout_sidebar_link')
  };

  // Actions & Page Behaviors
  verifyOnProductPage() {
    this.elements.pageTitle().should('be.visible').and('have.text', 'Products');
    cy.url().should('include', '/inventory.html');
    return this;
  }

  getInventoryCount() {
    return this.elements.inventoryItems().its('length');
  }

  addProductToCartByName(productName) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    cy.get(`[data-test="add-to-cart-${formattedName}"]`).click();
    return this;
  }

  removeProductFromCartByName(productName) {
    const formattedName = productName.toLowerCase().replace(/ /g, '-');
    cy.get(`[data-test="remove-${formattedName}"]`).click();
    return this;
  }

  getCartBadgeCount() {
    return this.elements.cartBadge();
  }

  verifyCartBadgeCount(expectedCount) {
    if (expectedCount === 0) {
      this.elements.cartBadge().should('not.exist');
    } else {
      this.elements.cartBadge().should('be.visible').and('have.text', expectedCount.toString());
    }
    return this;
  }

  sortProducts(sortOption) {
    // Options: 'az', 'za', 'lohi', 'hilo'
    this.elements.sortDropdown().select(sortOption);
    return this;
  }

  goToCart() {
    this.elements.shoppingCartLink().click();
    return this;
  }

  logout() {
    this.elements.menuButton().click();
    this.elements.logoutLink().should('be.visible').click();
    return this;
  }
}

export default new ProductPage();

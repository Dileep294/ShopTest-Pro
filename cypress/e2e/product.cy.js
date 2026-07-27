import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';

describe('SauceDemo - Product Catalog Test Suite', () => {
  let userData;
  let productsData;

  beforeEach(() => {
    cy.fixture('users').then((users) => {
      userData = users;
    });
    cy.fixture('products').then((products) => {
      productsData = products;
    });
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
    ProductPage.verifyOnProductPage();
  });

  it('TC-PROD-01: Should display all products in the catalog', () => {
    ProductPage.elements.inventoryItems().should('have.length', 6);
    ProductPage.elements.inventoryItemNames().first().should('be.visible');
  });

  it('TC-PROD-02: Should sort products by Price (low to high)', () => {
    ProductPage.sortProducts('lohi');
    ProductPage.elements.inventoryItemPrices().then(($prices) => {
      const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedArray = [...priceArray].sort((a, b) => a - b);
      expect(priceArray).to.deep.equal(sortedArray);
    });
  });

  it('TC-PROD-03: Should sort products by Price (high to low)', () => {
    ProductPage.sortProducts('hilo');
    ProductPage.elements.inventoryItemPrices().then(($prices) => {
      const priceArray = [...$prices].map(el => parseFloat(el.innerText.replace('$', '')));
      const sortedArray = [...priceArray].sort((a, b) => b - a);
      expect(priceArray).to.deep.equal(sortedArray);
    });
  });

  it('TC-PROD-04: Should add product to cart and update cart badge count', () => {
    ProductPage.addProductToCartByName(productsData.item1.name);
    ProductPage.verifyCartBadgeCount(1);

    ProductPage.addProductToCartByName(productsData.item2.name);
    ProductPage.verifyCartBadgeCount(2);
  });

  it('TC-PROD-05: Should remove product from cart and update cart badge count', () => {
    ProductPage.addProductToCartByName(productsData.item1.name);
    ProductPage.addProductToCartByName(productsData.item2.name);
    ProductPage.verifyCartBadgeCount(2);

    ProductPage.removeProductFromCartByName(productsData.item1.name);
    ProductPage.verifyCartBadgeCount(1);

    ProductPage.removeProductFromCartByName(productsData.item2.name);
    ProductPage.verifyCartBadgeCount(0);
  });
});

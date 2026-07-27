import LoginPage from '../pages/LoginPage';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';

describe('SauceDemo - Shopping Cart Test Suite', () => {
  let productsData;

  beforeEach(() => {
    cy.fixture('products').then((products) => {
      productsData = products;
    });
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
    ProductPage.verifyOnProductPage();
  });

  it('TC-CART-01: Should verify items added to cart display correctly on cart page', () => {
    ProductPage.addProductToCartByName(productsData.item1.name);
    ProductPage.addProductToCartByName(productsData.item2.name);
    ProductPage.goToCart();

    CartPage.verifyOnCartPage();
    CartPage.verifyItemInCart(productsData.item1.name);
    CartPage.verifyItemInCart(productsData.item2.name);
    CartPage.getCartItemsCount().should('eq', 2);
  });

  it('TC-CART-02: Should remove item directly from cart page', () => {
    ProductPage.addProductToCartByName(productsData.item1.name);
    ProductPage.goToCart();

    CartPage.verifyOnCartPage();
    CartPage.verifyItemInCart(productsData.item1.name);
    CartPage.removeItemByName(productsData.item1.name);
    CartPage.elements.cartItems().should('not.exist');
  });

  it('TC-CART-03: Should return to product catalog when clicking Continue Shopping', () => {
    ProductPage.goToCart();
    CartPage.verifyOnCartPage();
    CartPage.clickContinueShopping();
    ProductPage.verifyOnProductPage();
  });

  it('TC-CART-04: Should navigate to checkout page when clicking Checkout button', () => {
    ProductPage.addProductToCartByName(productsData.item1.name);
    ProductPage.goToCart();
    CartPage.verifyOnCartPage();
    CartPage.clickCheckout();
    cy.url().should('include', '/checkout-step-one.html');
  });
});

/// <reference types="cypress" />

const indexPageSel = require('../selectors/indexPage.sel');
const cartSel = require('../selectors/cart.sel');
const { getRandomInt } = require('../support/helpers');

const {IndexPage} = require('../page objects/IndexPage');
const {Products} = require('../page objects/Products');
const {Cart} = require('../page objects/Cart');

const indexPage = new IndexPage();
const products = new Products();
const cart = new Cart();

describe('Adding Products to Cart', () =>{

    beforeEach(() => {
        indexPage.visit();
        indexPage.isDisplayed();
    });
    afterEach(() => {
        cy.reload();

    })
    it('Test if the cart can be opened and closed.', () =>{
        cart.getCart().should('not.exist');
        cart.open();
        cart.getCart().should('be.visible');
    }); 
    it('Test if the cart displays all added products with their details (name, price, and quantity).', () =>{
        const randomProductNumber = getRandomInt(1,16);
        products.clickCertainAddToCartButton(randomProductNumber);
        cart.getProducts().should('be.visible')
        .and('have.length', 1);
        cart.productNames().should('be.visible')
        .and('have.length', 1);
        cart.productPrices().should('be.visible')
        .and('have.length', 1);
        cart.getProductQuantities().should('have.text', 1);
    });
    it('Test if the cart displays the correct total price for all added products.', () =>{
        products.clickRandomAddToCartButton();
        cart.close();
        products.clickRandomAddToCartButton();
        cart.close();
        products.clickRandomAddToCartButton();
        cart.checkTotalProductPrice();
        cart.getTotalPrice('total');
        cy.get('@sum').then((sum) => {
            cy.get('@totalPrice').then((totalPrice) => {
                expect(totalPrice).to.include(sum);
            });
        }); 
    });
    it('Test if the user can increase or decrease the quantity of products in the cart.', () =>{
        const increaseTimes = getRandomInt(4,8);
        const decreaseTimes = getRandomInt(1,4)
        products.clickRandomAddToCartButton();
        cart.getProductQuantities().should('have.text', '1');
        cart.increaseProductQuantity(increaseTimes);
        cart.getProductQuantity('increased');
        cy.get('@increasedQuantity').should('be.equal', increaseTimes+1);
        cart.decreaseProductQuantity(decreaseTimes);
        cart.getProductQuantity('decreased');
        cy.get('@decreasedQuantity').should('be.equal', increaseTimes+1-decreaseTimes);
    });
    it('Test if the user can remove products from the cart.', () =>{
        products.clickRandomAddToCartButton();
        cart.getProducts().should('be.visible')
        .and('have.length', 1);
        cart.clearCart();
        cy.get(cartSel.products).should('not.exist');
    });
    it('Test if the cart updates the total price when the quantity of products is changed or a product is removed.', () =>{
        products.clickRandomAddToCartButton();
        cart.getProducts().should('be.visible')
        .and('have.length', 1);
        cart.getTotalPrice('initial');
        cart.increaseProductQuantity(getRandomInt(1,8));
        cart.getTotalPrice('changed');
        cy.get('@initialPrice').then((inital) => {
            cy.get('@changedPrice').then((changed) => {
                expect(inital).not.to.equal(changed);
            });
        }); 
        cart.clearCart();
        cy.get(cartSel.totalPrice).should('have.text', '$ 0.00');
    });
});

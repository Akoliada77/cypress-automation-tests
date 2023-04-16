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

// Cypress.env('productName') = '';
// Cypress.env('producDollars') = 0;
// Cypress.env('productNameCents') = 0;


describe('Adding Products to Cart', () =>{
    
    beforeEach(() =>{
        indexPage.visit();
        indexPage.isDisplayed();
    });

    it('Test if clicking the "Add to Cart" button adds the correct product to the cart.', () =>{
        const randomProduct = getRandomInt(1,16);
        products.clickCertainAddToCartButton(randomProduct);
        products.getCertainProductName(randomProduct)
        products.getCertainProductPrice(randomProduct)
        cart.getProductNames();
        cart.getProductPrices();
        cy.get('@productName').then((productName) => {
            cy.get('@cartProductName').then((cartproductName) => {
                expect(productName).to.equal(cartproductName);
            })
        });
        cy.get('@productPrice').then((productPrice) => {
            cy.get('@cartProductPrice').then((cartproductPrice) => {
                expect(productPrice).to.equal(cartproductPrice);
            })
        });
    });
    it('Test if the cart quantity indicator increases when a product is added.', () =>{
        const randomProduct = getRandomInt(1,16);
        products.clickCertainAddToCartButton(randomProduct);
        cart.increaseProductQuantity(1);
        cart.getProductQuantity('increased');
        cy.get('@increasedQuantity').should('equal', 2);
    });
    it('Test if adding the same product multiple times increases the quantity in the cart.', () =>{
        const randomProduct = getRandomInt(1,16);
        products.clickCertainAddToCartButton(randomProduct);
        cart.getProductQuantity('inital');
        cart.increaseProductQuantity(getRandomInt(1,8));
        cart.getProductQuantity('increased');
        cy.get('@increasedQuantity').then(increasedQuantity => {
            cy.get('@initalQuantity').then((initalQuantity) => {
                expect(increasedQuantity).to.be.greaterThan(initalQuantity);
            });
        });
    });
    it('Test if the cart displays the correct total price after adding products.',() =>{
        const firstProduct = getRandomInt(1,15);
        const secondProduct = getRandomInt(1,15);
        products.clickCertainAddToCartButton(firstProduct);
        products.clickCertainAddToCartButton(secondProduct);
        products.getCertainProductPrice(firstProduct);
        products.getCertainProductPrice(secondProduct);
        products.sumProductPrices(firstProduct, secondProduct);
        cart.getTotalPrice('total');
        cy.get('@totalPrice').then((totalPrice) => {
            cy.get('@productPricesSum').then((productPricesSum) => {
                expect(totalPrice).to.include(productPricesSum);
            });
        });
    });
});

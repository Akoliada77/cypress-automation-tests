/// <reference types="cypress" />

const indexPageSel = require('../selectors/indexPage.sel')

const {IndexPage} = require('../page objects/IndexPage');
const {Products} = require('../page objects/Products');

const indexPage = new IndexPage();
const products = new Products();

describe('Product Listing Page', () =>{

    beforeEach(() =>{
        indexPage.visit();
        indexPage.isDisplayed()
    });

    it('Test if all products are loaded and displayed correctly.', () =>{
        products.getProducts().should('be.visible')
        .and('have.length', 16);
    });
    it('Test if the product image, name, and price are displayed correctly.', () =>{
        for (let i = 0; i < 16; i++){
            products.getCertainProduct(i).find(indexPageSel.productImages);
            products.getCertainProduct(i).find(indexPageSel.productNames);
            products.getCertainProduct(i).find(indexPageSel.productPrice.dollars);
            products.getCertainProduct(i).find(indexPageSel.productPrice.cents);
        };
    });
    it('Test if the "Add to Cart" button is displayed and enabled for each product.', () =>{
        for(let i = 0; i < 16; i++){
            products.getCertainProduct(i).find(indexPageSel.productAddToCartButtons)
            .should('be.enabled');
        };
    });

});

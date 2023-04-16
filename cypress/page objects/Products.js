const { IndexPage } = require('./IndexPage');
const indexPageSel = require('../selectors/indexPage.sel');
const { getRandomInt } = require('../support/helpers');

class Products extends IndexPage {

    // constructor(){
    // }

    getProducts(){
        return cy.get(indexPageSel.products);
    }
    getCertainProduct(number){
        return cy.get(indexPageSel.products).eq(number);
    }
    getProductImages(){
        return cy.get(indexPageSel.productImages);
    }
    getProductNames(){
        return cy.get(indexPageSel.productNames);
    }
    getProductPrices(){
        return cy.get(indexPageSel.productPrice);
    }
    checkProductContent(){
        
    }
    getRandomProduct(){
        const randomInt = getRandomInt(1,16);
        return cy.get(indexPageSel.products).eq(randomInt);
    }
    getCertainProductName(number){
        cy.get(indexPageSel.productNames).eq(number).then((value) =>{
            return value.text();
        }).as('productName');
    }
    getCertainProductPrice(number){
        cy.get(indexPageSel.productPrice.dollars).eq(number).then((value) => {
            return value.text() 
        }).as('dollars');
        cy.get(indexPageSel.productPrice.cents).eq(number).then((value) => {
            return value.text() 
        }).as('cents')
        cy.get('@dollars').then((dollars) => {
            cy.get('@cents').then((cents) => {
                return `$  ${dollars}${cents}`
            })
        }).as('productPrice');
    }
    clickCertainAddToCartButton(number){
        return cy.get(indexPageSel.productAddToCartButtons).eq(number).click();
    }
    clickRandomAddToCartButton(){
        return cy.get(indexPageSel.productAddToCartButtons).eq(getRandomInt(1,15)).click();
    }
    sumProductPrices(firstProduct, secondProduct){

        cy.get(indexPageSel.productPrice.dollars).eq(firstProduct).then((value) => {
            return value.text() 
        }).as('dollars');
        cy.get(indexPageSel.productPrice.cents).eq(firstProduct).then((value) => {
            return value.text() 
        }).as('cents');
        cy.get('@dollars').then((dollars) => {
            cy.get('@cents').then((cents) => {
                const firstPrice = Number((dollars + cents)).toFixed(2)
                return firstPrice;
            }).as('firstProductPrice');
        });

        cy.get(indexPageSel.productPrice.dollars).eq(secondProduct).then((value) => {
            return value.text() 
        }).as('dollars');
        cy.get(indexPageSel.productPrice.cents).eq(secondProduct).then((value) => {
            return value.text() 
        }).as('cents')
        cy.get('@dollars').then((dollars) => {
            cy.get('@cents').then((cents) => {
                const secondPrice = Number((dollars + cents)).toFixed(2)
                return secondPrice;            
            }).as('secondProductPrice');
        });

        cy.get('@firstProductPrice').then((firstValue) => {
            cy.get('@secondProductPrice').then((secondValue) => {
                return Number(firstValue) + Number(secondValue);
            }).as('productPricesSum');
        });
    }
}
module.exports = {Products};
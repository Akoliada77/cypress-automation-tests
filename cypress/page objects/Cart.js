const { IndexPage } = require('./IndexPage');
const indexPageSel = require('../selectors/indexPage.sel');
const cartSel = require('../selectors/cart.sel');
const { getRandomInt } = require('../support/helpers')

class Cart extends IndexPage {

    // constructor(){
    // }
    getCart(){
        return cy.get(cartSel.cart);
    }
    open(){
        return cy.get(cartSel.cartButton).click();
    }
    getProducts(){
        return cy.get(cartSel.products);
    }
    productNames(){
        return cy.get(cartSel.productNames);
    }
    productPrices(){
        return cy.get(cartSel.productPrices);
    }
    getProductNames(){
        cy.get(cartSel.productNames).then((value) =>{
            return value.text();
        }).as('cartProductName');
        }
    getProductPrices(){
        cy.get(cartSel.productPrices).then((value) =>{
            return value.text();
        }).as('cartProductPrice');
    }
    getProductQuantities(){
        return cy.xpath(cartSel.productQuantity.quantityNumber);
    }
    close(){
        return cy.get(cartSel.cartButton).click(); 
    }
    checkTotalProductPrice(){
        cy.get(cartSel.productPrices).then(($prices)=>
        {
            const totalPrices = $prices.toArray()
            .map((el) => el.innerText)
            .map((s) => s.replace('$', ''))
            .map((el) => el.trim())
            .map(parseFloat);
            const sum = Cypress._.sum(totalPrices).toFixed(2);
            return sum
        }).as('sum');
    }
    clearCart(){
        cy.get(cartSel.deleteProductButton).then(($value) => {
            const length = $value.length
            cy.log(length);
            cy.get(cartSel.cart).should('be.visible');
            for(let i = 0; i < length; i++)
            {
                cy.get(cartSel.deleteProductButton).eq(0).click()
            }
            cy.get(cartSel.deleteProductButton).should('not.exist');
            });
    }
    increaseProductQuantity(number){
        for(let n = 0; n < number; n ++){
            cy.get(cartSel.changeQuantityButtons).eq(1)
              .click();
          }    
    }
    getProductQuantity(str){
        cy.xpath(cartSel.productQuantity.quantityNumber)
        .then(($btn) => { 
            return Number($btn.text());})
        .as(`${str}Quantity`);
    }
    decreaseProductQuantity(number){
        for(let n = 0; n < number; n ++){
            cy.get(cartSel.changeQuantityButtons).eq(0)
              .click();
          }    
    }
    getTotalPrice(str){
        cy.get(cartSel.totalPrice).then(($value) => {
            return $value.text()})
        .as(`${str}Price`);
    }
}

module.exports = {Cart};
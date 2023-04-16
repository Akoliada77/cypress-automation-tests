const indexPageSel = require('../selectors/indexPage.sel')

class IndexPage {

    // constructor(){
    // }

    isDisplayed() {
        return cy.get(indexPageSel.page).should('be.visible');
    };
    visit() {
        cy.visit('/');
    }        
};
module.exports = {IndexPage};
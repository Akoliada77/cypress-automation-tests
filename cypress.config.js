const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
    specPattern: 'cypress/tests/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: "https://react-shopping-cart-67954.firebaseapp.com/",
    defaultCommandTimeout: 7_000,
    viewportHeight: 1080,
    viewportWidth: 1920,
    retries:{
      "runMode": 2,
      "openMode": 2
    },
    env: {
    },
    chromeWebSecurity: false,
    supportFile: 'cypress/support/index.{js,jsx,ts,tsx}'
  },
});

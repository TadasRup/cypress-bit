const { defineConfig } = require("cypress");
require("dotenv").config({path: `./cypress/ENV/${process.env.NODE_ENV || 'test'}.env`});

module.exports = defineConfig({
  env: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    url: process.env.URL,
    apiUrl: process.env.API_URL,
    apiKey: process.env.API_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

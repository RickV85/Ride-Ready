const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    CLIENT_ID: 102662,
    CLIENT_SECRET: 'e62b9b88fb1b8a808a435c886cc13dcfe13c4947'
  },
});

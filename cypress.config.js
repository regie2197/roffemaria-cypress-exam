const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 10000,
  watchForFileChanges: false,
  
  e2e: {
    baseUrl: "https://testautomation-ph-quiz-app.vercel.app",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

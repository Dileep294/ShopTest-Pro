const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    video: true,
    videosFolder: 'videos',
    screenshotOnRunFailure: true,
    screenshotsFolder: 'screenshots',
    chromeWebSecurity: false,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'reports/json',
      overwrite: false,
      html: false,
      json: true,
      timestamp: 'mmddyyyy_HHMMss'
    },
    env: {
      apiUrl: 'https://reqres.in/api',
      standardUser: 'standard_user',
      lockedOutUser: 'locked_out_user',
      problemUser: 'problem_user',
      performanceGlitchUser: 'performance_glitch_user'
    },
    setupNodeEvents(on, config) {
      // Node event listeners can be implemented here if needed
      return config;
    }
  }
});

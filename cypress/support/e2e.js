// ***********************************************************
// This support file is loaded automatically before spec files.
// Global configuration and behavior modification can be added here.
// ***********************************************************

// Import custom commands
import './commands';

// Prevent Cypress from failing tests when uncaught exceptions occur on target application
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false prevents Cypress from failing the test
  console.warn('Uncaught exception detected:', err.message);
  return false;
});

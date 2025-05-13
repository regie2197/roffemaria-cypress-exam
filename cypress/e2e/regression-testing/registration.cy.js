import { generateRegistrationData } from "../../support/fakerUtils";

describe('Sprint 1 -  Registration for Quiz Master & Regular User', { testIsolation: false }, () => {
  let registrationData = null;
  before(() => {
      cy.visit('/register')
      cy.url().should('include', '/register')
  })
  it('Verify the password dont match validation message when user enters password mismatch', () => {
     registrationData = generateRegistrationData()

     cy.get('#username').type(registrationData.username)
     cy.get('#email').type(registrationData.email)
     cy.get('#password').type('regietest')
     cy.get('#confirmPassword').type('regietest123')

     cy.contains('Register').should('be.visible').click()

     cy.get(':nth-child(4) > .text-red-600').should('be.visible')
  })
  it('Verify user registration works for both Quiz Master and Regular User roles', () => {
     registrationData = generateRegistrationData()

     cy.get('#username').clear().type(registrationData.username)
     cy.get('#email').clear().type(registrationData.email)
     cy.get('#password').clear().type(registrationData.password)
     cy.get('#confirmPassword').clear().type(registrationData.confirmPassword)
     

      cy.get('#' + registrationData.roleId).check()

        // Submit form
        cy.contains('Register').should('be.visible').click()
        cy.wait(2000)
        cy.url().should('include', '/login')
     
  })

   it('Verify newly created account can successfully log in and access appropriate URL', () => {
         
        cy.get('[data-testid="input-username"]').type(registrationData.username)
        cy.get('[data-testid="input-password"]').type(registrationData.password)
        cy.get('[data-testid="login-button"]').click()

        cy.wait(2000)
        cy.url().should('include', registrationData.expectedRedirect)

        // Verify the user is logged in
        cy.url().should('include', registrationData.expectedRedirect, { timeout: 10000 })
        cy.contains('Log out').should('be.visible')


        if (registrationData.role === 'quiz_master') {
            cy.contains('Manage Topics').should('be.visible')
        } else {
            cy.contains('Browse Topics').should('be.visible')
        }
  })

  after(() => {
    cy.clearAllSessionStorage();
    cy.contains('Log out').click()
    cy.url().should('include', '/login')
  })
})
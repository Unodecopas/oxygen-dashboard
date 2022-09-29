/* eslint-disable jest/expect-expect */
/* global cy */

describe('Authentication', () => {
  it('login page can be opened in first visit', () => {
    cy.visit('http://localhost:3000/oxygen-dashboard')
    cy.contains('Login')
  })
  it('login dont accept any username or password', () => {
    cy.get('[name="Username"]').type('username')
    cy.get('[name="Password"]').type('password')
    cy.get('#form-login-button').click()
    cy.contains('Has introducido datos incorrectos')
  })
  it('user can login', () => {
    cy.get('[name="Username"]').clear()
    cy.get('[name="Password"]').clear()
    cy.get('[name="Username"]').type('JesusGallardo')
    cy.get('[name="Password"]').type('admin')
    cy.get('#form-login-button').click()
    cy.contains('Dashboard')
  })
})

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

describe('Routes', () => {
  it('Rooms Page', () => {
    cy.get('a[href*="rooms"]').click()
    cy.contains('All Rooms')
  })

  it('Bookings Page', () => {
    cy.get('a[href*="bookings"]').click()
    cy.contains('All Bookings')
  })
  it('Users Page', () => {
    cy.get('a[href*="user"]').click()
    cy.contains('All Employee')
  })
  it('Contact Page', () => {
    cy.get('a[href*="contact"]').click()
    cy.contains('ContactPage')
  })
})

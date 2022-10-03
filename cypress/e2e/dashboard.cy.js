/* eslint-disable jest/expect-expect */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-focused-tests */
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
    cy.get('#form-login-button').click().should(() => {
      expect(JSON.parse(localStorage.getItem('userMiranda'))).to.deep.equal({ username: 'JesusGallardo', email: 'correo@correo.com', logged: true, id: 1 })
    })
    cy.contains('Dashboard')
  })
  it('logout button delete the user', () => {
    cy.get('#btn-logout').click().should(() => {
      expect(JSON.parse(localStorage.getItem('userMiranda'))).to.deep.equal({ username: '', email: '', logged: false, id: 0 })
    })
  })
  it('user can login again', () => {
    cy.get('[name="Username"]').clear()
    cy.get('[name="Password"]').clear()
    cy.get('[name="Username"]').type('JesusGallardo')
    cy.get('[name="Password"]').type('admin')
    cy.get('#form-login-button').click().should(() => {
      expect(JSON.parse(localStorage.getItem('userMiranda'))).to.deep.equal({ username: 'JesusGallardo', email: 'correo@correo.com', logged: true, id: 1 })
    })
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
    cy.get('a[href="/oxygen-dashboard/users"]').click()
    cy.contains('All Employee')
  })
  it('Contact Page', () => {
    cy.get('a[href*="contact"]').click()
    cy.contains('ContactPage')
  })
})

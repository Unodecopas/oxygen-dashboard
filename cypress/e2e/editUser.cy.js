/* eslint-disable jest/expect-expect */
/* eslint-disable jest/valid-expect */
/* eslint-disable jest/no-focused-tests */
/* global cy */

describe('User', () => {
  it('Can be visit edit profile page', () => {
    localStorage.setItem('userMiranda', JSON.stringify({ username: 'JesusGallardo', logged: true, email: 'correo@correo.com', id: 1 }))
    cy.visit('http://localhost:3000/oxygen-dashboard/')
    cy.get('#btn-edit-profile').click()
    cy.contains('Hi')
  })
  it('username input must be not the same', () => {
    cy.get('[name="username"]').type('JesusGallardo')
    cy.get('#submit-form').click()
    cy.contains('El username introducido es el mismo que el anterior')
    cy.get('[name="username"]').clear()
  })
  it('email must be not the same', () => {
    cy.get('[name="email"]').type('correo@correo.com')
    cy.get('#submit-form').click()
    cy.contains('El email introducido es el mismo que el anterior')
    cy.get('[name="email"]').clear()
  })
  it('clear button reset the inputs', () => {
    cy.get('[name="username"]').type('JesusGallardo')
    cy.get('[name="email"]').type('correo@correo.com')
    cy.get('#clear-form').click()
    cy.get('[name="username"]').should('have.value', '')
    cy.get('[name="email"]').should('have.value', '')
  })
  it('save button save the data in localstorage', () => {
    cy.get('[name="username"]').type('LolaFlores')
    cy.get('[name="email"]').type('correo2@correo.com')
    cy.get('#submit-form').click().should(() => {
      expect(JSON.parse(localStorage.getItem('userMiranda'))).to.deep.equal({ username: 'LolaFlores', email: 'correo2@correo.com', logged: true, id: 1 })
    })
    cy.get('[name="username"]').should('have.value', '')
    cy.get('[name="email"]').should('have.value', '')
  })
})

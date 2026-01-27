describe('login spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[placeholder="Enter your email"]').type('admin@gmail.com')
    cy.get('input[placeholder="Enter your password"]').type('admin123')
    cy.contains('button', 'Login').click()
    cy.wait(2000)
    cy.url().should('include', 'localhost:3000/dashboard/home')
  })

  it('fails', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[placeholder="Enter your email"]').type('user@gmail.com')
    cy.get('input[placeholder="Enter your password"]').type('admin123')
    cy.contains('button', 'Login').click()
    cy.get('div.text-sm.font-medium.text-highlighted')
      .should('be.visible')
      .and('contain', 'Login Gagal')
    cy.url().should('include', '/login')
  })

  it('fails', () => {
    cy.visit('localhost:3000/login')
    cy.get('input[placeholder="Enter your email"]').type('admin@gmail.com')
    cy.get('input[placeholder="Enter your password"]').type('admin12345')
    cy.contains('button', 'Login').click()
    cy.get('div.text-sm.font-medium.text-highlighted')
      .should('be.visible')
      .and('contain', 'Login Gagal')
    cy.url().should('include', '/login')
  })
})

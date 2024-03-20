describe('Login spec', () => {

  beforeEach(() =>{
    cy.visit(`${Cypress.env("url")}/register`)
    cy.contains(/log in to webIssues/i)
  });

  it('Should be able to login', () => {
    cy.login(Cypress.env("username"), Cypress.env("password"))
    cy.contains(/Administration Panel/i)
    cy.get(`a[href="${Cypress.env("url")}/register/index.php"]`).contains(/Log Out/i)
  })

  it('Should be not able to login with ivalid username', () => {
    cy.login("blogas", Cypress.env("password"))
    cy.contains(/Incorrect value: Invalid login or password./i)

  })

  it('Should be not able to login with ivalid password', () => {
    cy.login(Cypress.env("username"), "blogas")
    cy.contains(/Incorrect value: Invalid login or password./i)

  })

  it('Should be not able to login with empty username and password', () => {
    cy.login(" ", " ")
    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i)

  })
});
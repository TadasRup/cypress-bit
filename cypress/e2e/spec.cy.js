describe('Login spec', () => {

  beforeEach(() =>{
    cy.visit('https://www.testingmarathon.com/register')
    cy.contains(/log in to webIssues/i)
  });

  it('Should be able to login', () => {
    cy.get('input[id="field-login-login"]').type('tadas.msp@gmail.com')
    cy.get('input[id="field-login-password"]').type('tadas.msp@gmail.com')
    cy.get('#field-login-loginSubmit').click()
    cy.contains(/Administration Panel/i)
    cy.get('a[href="https://www.testingmarathon.com/register/index.php"]').contains(/Log Out/i)
  })

  it('Should be not able to login with ivalid username', () => {
    cy.get('input[id="field-login-login"]').type('aatadas.msp@gmail.com')
    cy.get('input[id="field-login-password"]').type('tadas.msp@gmail.com')
    cy.get('#field-login-loginSubmit').click()
    cy.contains(/Incorrect value: Invalid login or password./i)

  })

  it('Should be not able to login with ivalid password', () => {
    cy.get('input[id="field-login-login"]').type('tadas.msp@gmail.com')
    cy.get('input[id="field-login-password"]').type('aatadas.msp@gmail.com')
    cy.get('#field-login-loginSubmit').click()
    cy.contains(/Incorrect value: Invalid login or password./i)

  })

  it('Should be not able to login with empty username and password', () => {
    cy.get('input[id="field-login-login"]').type(" ")
    cy.get('input[id="field-login-password"]').type(" ")
    cy.get('#field-login-loginSubmit').click()
    cy.get('[class="error"]').contains(/Incorrect value: Required value is missing./i)

  })
});
import { faker } from '@faker-js/faker';

describe('Issue spec', () => {

    let createIssueTitle;
    let deleteIssueTitle;

    beforeEach(() =>{
      cy.visit('https://www.testingmarathon.com/register')
      cy.contains(/log in to webIssues/i)
      cy.get('input[id="field-login-login"]').type('tadas.msp@gmail.com')
      cy.get('input[id="field-login-password"]').type('tadas.msp@gmail.com')
      cy.get('#field-login-loginSubmit').click()
      cy.contains(/Administration Panel/i)
      cy.get(
        'a[href="https://www.testingmarathon.com/register/index.php"]'
      ).contains(/Log Out/i)

      cy.visit(
        'https://www.testingmarathon.com/register/client/index.php?folder=1')

      
    });

    after(() => {
        if (createIssueTitle !== undefined) {
        cy.visit('https://www.testingmarathon.com/register/client/index.php?folder=1'
        );
        cy.get('[name="searchBox"]').type(createIssueTitle);
        cy.get('#field-search-searchSubmit').click()
        cy.get(`[title="${createIssueTitle}"]`).click();
        cy.get('[title="Delete Issue"]').click();
        cy.get('#field-issues-okSubmit').click();
        }
    });

    before(() =>{
        deleteIssueTitle = faker.string.uuid();
        cy.visit('https://www.testingmarathon.com/register')
        cy.contains(/log in to webIssues/i)
        cy.get('input[id="field-login-login"]').type('tadas.msp@gmail.com')
        cy.get('input[id="field-login-password"]').type('tadas.msp@gmail.com')
        cy.get('#field-login-loginSubmit').click()
        cy.contains(/Administration Panel/i)
        cy.get(
          'a[href="https://www.testingmarathon.com/register/index.php"]'
        ).contains(/Log Out/i)

        cy.visit(
            'https://www.testingmarathon.com/register/client/index.php?folder=1')

        cy.get('[title="Add Issue"]').click();
        cy.get('#field-issues-issueName').type(deleteIssueTitle)
        cy.get('#field-issues-descriptionText').type(`cypress issue description ${deleteIssueTitle}`)
        cy.get('#field-issues-okSubmit').click();
    });
  
    it('It should be abble to create and delete issue', () => {
      cy.get('[title="Add Issue"]').click();
      cy.get('#field-issues-issueName').type("cypress issue title")
      cy.get('#field-issues-descriptionText').type("cypress issue description")
      cy.get('#field-issues-okSubmit').click();
      cy.get('#infobar-left').contains(/Cypress issue title/i).should("be.visible")

      cy.get('[title="Delete Issue"]').click();
      cy.get('#field-issues-okSubmit').click();
      cy.contains(/Cypress issue title/i).should("not.exist");
        })

    it('Should be able to create issue with empty titile', () => {
        cy.get('[title="Add Issue"]').click();
        cy.get('#field-issues-issueName').type(" ")
        cy.get('#field-issues-descriptionText').type("Cypress issue description")
        cy.get('#field-issues-okSubmit').click();
        })

    it('It should be abble to create issue', () => {
        createIssueTitle = faker.string.uuid();
        cy.get('[title="Add Issue"]').click();
        cy.get('#field-issues-issueName').type(createIssueTitle)
        cy.get('#field-issues-descriptionText').type(
            `cypress issue description ${createIssueTitle}`)
        cy.get('#field-issues-okSubmit').click();
        cy.get('#infobar-left').contains(createIssueTitle).should("be.visible")
    })

    it('It should be abble to delete issue', () => {
        cy.get('[name="searchBox"]').type(deleteIssueTitle);
        cy.get('#field-search-searchSubmit').click()
        cy.get(`[title="${deleteIssueTitle}"]`).click();
        cy.get('[title="Delete Issue"]').click();
        cy.get('#field-issues-okSubmit').click();
        cy.contains(deleteIssueTitle).should("not.exist");
    })
});  
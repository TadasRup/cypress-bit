// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("POSTcontact", (contact, failOnStatusCode = true) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}`,
        failOnStatusCode: failOnStatusCode,
        body: contact,
        headers: {
            "X-API-KEY": `${Cypress.env("apiKey")}`,
        },
    });
});

Cypress.Commands.add("createContactByEmail", (email, failOnStatusCode = true) => {
    return cy.request({
        method: "POST",
        url: `${Cypress.env("apiUrl")}`,
        failOnStatusCode: failOnStatusCode,
        body: {
            identifiers: [
              {
                type: "email",
                channels: {
                  email: {
                    status: "subscribed"
                  }
                },
                id: email,
              }
            ],
            firstName: ")txin0šc%p$h",
            lastName: "6p1#4tzsb2jį"
          },
        headers: {
            "X-API-KEY": `${Cypress.env("apiKey")}`
        },
    })
})

Cypress.Commands.add("GETcontact", (contactID, failOnStatusCode = true) => {
    return cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/${contactID}`,
        failOnStatusCode: failOnStatusCode,
        headers: {
            "X-APi-KEY": `${Cypress.env("apiKey")}`
        },
    })
})

Cypress.Commands.add("GETcontacts", (email, limit, failOnStatusCode = true) => {

    let quearyParams = `limit=${limit}`
    if (email) {
        quearyParams = `${quearyParams}&email=${email}`
    }

    return cy.request({
        method: "GET",
        url: `${Cypress.env("apiUrl")}?${quearyParams}&limit=${limit}`,
        failOnStatusCode: failOnStatusCode,
        headers: {
            "X-API-KEY": `${Cypress.env("apiKey")}`,
        },
    })
})

Cypress.Commands.add("PATCHcontact", (contactID, contact, failOnStatusCode = true) => {
    return cy.request({
        method: "PATCH",
        url: `${Cypress.env("apiUrl")}/${contactID}`,
        failOnStatusCode: failOnStatusCode,
        body: contact,
        headers: {
            "X-API-KEY": `${Cypress.env("apiKey")}`,
        },
    })
})
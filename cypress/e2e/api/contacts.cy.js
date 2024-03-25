import { faker } from "@faker-js/faker";

let contact = {
  identifiers: [
    {
      type: "email",
      channels: {
        email: {
          status: "subscribed"
        }
      },
      id: `${faker.string.uuid()}@lokalus.lt`,
    }
  ],
  firstName: `Jonas ${faker.string.uuid()}`,
  lastName: `Jonaitis ${faker.string.uuid()}`
}

describe('API contacts spec', () => {

  before(() =>{
    cy.createContactByEmail(contact.identifiers[0].id).then((response) => {
      contact.contactID = response.body.contactID;
      
    })
  });

  it('Should be able to create contact', () => {
    cy.createContactByEmail("createdjustwithemail@dfsahgdf.com")
    .then((response) => {
      expect(response.body.email).eql("createdjustwithemail@dfsahgdf.com")
      expect(response.body.contactID).exist;
      expect(response.body.password).not.exist;
      expect(response.status).eq(200);
      expect(response.body.contactID).lengthOf(24);
      return response.body.contactID;
    })
  });

  it("Should not be able to create contact with invalid email", () => {
    cy.createContactByEmail("asasdadsadsa.com", false).then((
      response) => {
      expect(response.status).eq(400);
    });
  });

  it("Should be able to get contact list of 10 contact", () => {
    cy.GETcontacts(undefined, 10).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.contacts).lengthOf(10);
    });
  });

  it("Should be able to get by id", () => {
    cy.GETcontact(contact.contactID).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.email).eq(contact.identifiers[0].id)
      expect(response.body.contactID).eq(contact.contactID)
    });
  });

  it("Should be able to get by email", () => {
    cy.GETcontacts(contact.identifiers[0].id, 10).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.contacts[0].email).eq(contact.identifiers[0].id)
      expect(response.body.contacts[0].contactID).eq(contact.contactID)
      expect(response.body.contacts).lengthOf(1);
    });
  });

  it("Should be able to update contact", () => {
    contact.firstName = 'Petras',
    contact.lastName = "Petraitis",
    cy.PATCHcontact(contact.contactID, contact).then((response) => {
      expect(response.status).eq(200);
      expect(response.body.email).eq(contact.identifiers[0].id)
      expect(response.body.contactID).eq(contact.contactID)
      expect(response.body.firstName).eq(contact.firstName);
      expect(response.body.lastName).eq(contact.lastName);
    });
  });
});
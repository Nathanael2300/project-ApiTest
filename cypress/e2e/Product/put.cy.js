import { faker } from '@faker-js/faker';

let CreateProduct = {
  nome: faker.commerce.productName(),
  preco: faker.number.int({ min: 1, max: 100 }),
  quantidade: faker.number.int({ min: 1, max: 100 }),
  descricao: "teste desc"
};

let UpdateProduct = {
  nome: faker.commerce.productName(),
  preco: faker.number.int({ min: 1, max: 100 }),
  quantidade: faker.number.int({ min: 1, max: 100 }),
  descricao: "teste desc"
};

describe("Should change a information of product", () => {
    let userData;
    let token;
    let productId;

    beforeEach(() => {

      userData = {
        nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
    };

      cy.api({
        method: "POST",
        url: "/usuarios",
        body: userData,
        failOnStatusCode: false
      }).then((resPost) => {
        expect(resPost.status).to.be.equal(201);
        expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso")
        .and.to.be.a("String");
        expect(resPost.body).to.be.a("Object");

        token = resPost.body.authorization;

        cy.api({
          method: "POST",
          url: "/login",
          headers: {
            authorization: token
          },
          body: {
            email: userData.email,
            password: userData.password
          },
          failOnStatusCode: false
        }).then((resPost) => {
          expect(resPost.status).to.be.equal(200);
          token = resPost.body.authorization;

          cy.api({
            method: "POST",
            url: "/produtos",
            body: CreateProduct,
            headers: {
              authorization: token
            },
            failOnStatusCode: false
          }).then((resPost) => {
            expect(resPost.status).to.be.equal(201);
            productId = resPost.body._id; 
          });
        });
      });
    });

  it("Change a information of product", () => {
    cy.api({
      method: "PUT",
      url: `/produtos/${productId}`,
      headers: {
        authorization: token
      },
      body: UpdateProduct,
      failOnStatusCode: false
    }).then((resPut) => {
      expect(resPut.status).to.be.equal(200);
        expect(resPut.body).to.have.property("message", "Registro alterado com sucesso")
        .and.to.be.a("String");
        expect(resPut.body).to.be.a("Object");
    });

    cy.api({
      method: "GET",
      url: `/produtos/${productId}`,
      failOnStatusCode: false
    }).then((resGet) => {
      expect(resGet.status).to.be.equal(200);  
      expect(resGet.body).to.include({
        nome: UpdateProduct.nome,
        preco: UpdateProduct.preco,
        quantidade: UpdateProduct.quantidade,
        descricao: UpdateProduct.descricao
      });
      expect(resGet.body.nome).to.be.a("String");
      expect(resGet.body.preco).to.be.a("Number");
      expect(resGet.body.quantidade).to.be.a("Number");
      expect(resGet.body.descricao).to.be.a("String");
      expect(resGet.body._id).to.be.a("String");
      expect(resGet.body).to.be.a("Object");
    });
  });
});
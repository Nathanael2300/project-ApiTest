import { faker } from '@faker-js/faker';

let UpdateProduct = {
  nome: faker.commerce.productName(),
  preco: faker.number.int({ min: 1, max: 100 }),
  quantidade: faker.number.int({ min: 1, max: 100 }),
  descricao: "teste desc"
};

describe("Should change a information of product", () => {
  it("Change a information of product", () => {
    cy.api({
      method: "POST",
      url: "/login",
      body: {
        email: "donald_prohaska-ebert60@gmail.com",
        password: "Senha!123",
      },
    }).then((resLogin) => {
      expect(resLogin.status).to.be.equal(200);
      expect(resLogin.body).to.have.property("message", "Login realizado com sucesso");
      expect(resLogin.body).to.have.property("authorization").and.to.be.a("String");
      expect(resLogin.body).to.be.a("Object");

      const token = resLogin.body.authorization; 

      cy.api({
        method: "PUT",
        url: "/produtos/0HmNit3LKBVBRNXt",
        headers: {
          Authorization: token
        },
        body: UpdateProduct,
        failOnStatusCode: false
      }).then((resPut) => {
        expect(resPut.status).to.be.equal(200);
        expect(resPut.body).to.be.property("message", "Registro alterado com sucesso");
        expect(resLogin.body.authorization).to.be.a("string");
        expect(resPut.body).to.be.a("Object");
      });
    });
  });
});
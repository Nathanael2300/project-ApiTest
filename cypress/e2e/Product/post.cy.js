import { faker } from '@faker-js/faker';

let CreateProduct = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 100 }),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    descricao: "teste desc"
};

describe("Should create a product", () => {
    it("Create a product", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: "507f1f77bcf86cd7@teste.com",
                password: "123456",
            },
            failOnStatusCode: false
        }).then((resLogin) => {
            expect(resLogin.status).to.be.equal(200);
            expect(resLogin.body).to.have.property("message", "Login realizado com sucesso");
            expect(resLogin.body).to.have.property("authorization").and.to.be.a("String");
            expect(resLogin.body).to.be.a("Object");

            const token = resLogin.body.authorization;

            cy.api({
                method: "POST",
                url: "/produtos",
                headers: {
                    authorization: token
                },
                body: CreateProduct,
                failOnStatusCode: false
            }).then((resPut) => {
                expect(resPut.status).to.be.equal(201)
                expect(resPut.body).to.have.property("message", "Cadastro realizado com sucesso");
                expect(resPut.body).to.have.property("_id");
                expect(resPut.body.message).to.be.a("String");
                expect(resPut.body._id).to.be.a("String");
                expect(resLogin.body).to.be.a("Object");
            });
        });
    });
});
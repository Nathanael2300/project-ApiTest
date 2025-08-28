import { faker } from '@faker-js/faker';

let CreateProduct = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 100 }),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    descricao: "teste desc"
}; 

describe("Should delete a product of list", () => {
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
            expect(resPost.status).to.equal(201);
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso")
            .and.to.be.a("String");
            expect(resPost.body).to.be.a("Object");

            cy.api({
                method: "POST",
                url: "/login",
                body: {
                    email: userData.email,
                    password: userData.password
                },
                failOnStatusCode: false
            }).then((resLogin) => {
                expect(resLogin.status).to.equal(200);
                token = resLogin.body.authorization;

                cy.api({
                    method: "POST",
                    url: "/produtos",
                    body: CreateProduct,
                    headers: { authorization: token },
                    failOnStatusCode: false
                }).then((resProduct) => {
                    expect(resProduct.status).to.be.equal(201);
                    productId = resProduct.body._id; 
                });
            });
        });
    });

    it("Delete a product of list", () => {
        cy.api({
            method: "DELETE",
            url: `/produtos/${productId}`,
            headers: { authorization: token },
            failOnStatusCode: false
        }).then((resDelete) => {
            expect(resDelete.status).to.equal(200);
            expect(resDelete.body).to.have.property("message", "Registro excluído com sucesso")
            .and.to.be.a("String");
            expect(resDelete.body).to.be.a("Object");
        });

        cy.api({
            method: "GET",
            url: `/produtos/${productId}`,
            failOnStatusCode: false
        }).then((resGet) => {
            expect(resGet.status).to.equal(400);  
            expect(resGet.body).to.have.property("message", "Produto não encontrado").and.to.be.a("String");
            expect(resGet.body).to.be.a("Object");
        });
    });
});
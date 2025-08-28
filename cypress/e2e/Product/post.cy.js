import { faker } from '@faker-js/faker';

let CreateProduct = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 100 }),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    descricao: "teste desc"
};

describe("Should create a product", () => {
    let userData;

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
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
            expect(resPost.body).to.have.property("_id");
            expect(resPost.body).to.be.a("Object")
        });
    });

    it("Create a product", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: userData.email,
                password: userData.password
            },
            failOnStatusCode: false
        }).then((resPost) => {
            expect(resPost.status).to.be.equal(200);
            expect(resPost.body).to.have.property("message", "Login realizado com sucesso");
            expect(resPost.body).to.have.property("authorization").and.to.be.a("String");
            expect(resPost.body).to.be.a("Object")

            let token = resPost.body.authorization;

            cy.api({
                method: "POST",
                url: "/produtos",
                headers: {
                    authorization: token
                },
                body: CreateProduct,
                failOnStatusCode: false
            }).then((resProduct) => {
                expect(resProduct.status).to.be.equal(201);
                expect(resProduct.body).to.have.property("message", "Cadastro realizado com sucesso");
                expect(resProduct.body).to.have.property("_id").and.to.be.a("String");
                expect(resProduct.body).to.be.a("Object");
            });
        });
    });
});
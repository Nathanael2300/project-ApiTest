import { faker } from '@faker-js/faker';

let CreateProduct = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 100 }),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    descricao: "teste desc"
};

describe("Should return a list of products", () => {
    it("Return a list of products", () => {
        cy.api({
            method: "GET",
            url: "/produtos"
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            res.body.produtos.forEach(product => {
                expect(product).to.have.property("nome").and.to.be.a("String");
                expect(product).to.have.property("preco").and.to.be.a("Number");
                expect(product).to.have.property("descricao").and.to.be.a("String");
                expect(product).to.have.property("quantidade").and.to.be.a("Number");
                expect(product).to.have.property("_id").and.to.be.a("String");
                expect(product).to.be.a("Object");
            });
        });
    });
});

describe("Should return a product of list", () => {
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
    it("Return a product of list", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: userData.email,
                password: userData.password
            }
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
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(201);
                expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
                expect(resPost.body).to.have.property("_id").and.to.be.a("String");
                expect(resPost.body).to.be.a("Object");

                let id = resPost.body._id

                cy.api({
                    method: "GET",
                    url: `/produtos/${id}`
                }).then((resGet) => {
                    expect(resGet.status).to.be.equal(200);
                    expect(resGet.body).to.include({
                        nome: CreateProduct.nome,
                        preco: CreateProduct.preco,
                        descricao: CreateProduct.descricao,
                        quantidade: CreateProduct.quantidade,
                    });
                    expect(resGet.body._id).to.be.a("String");
                    expect(resGet.body.nome).to.be.a("String");
                    expect(resGet.body.preco).to.be.a("Number");
                    expect(resGet.body.descricao).to.be.a("String");
                    expect(resGet.body.quantidade).to.be.a("Number");
                    expect(resGet.body._id).to.be.a("String");
                    expect(resGet.body).to.be.a("Object");
                });
            });
        });
    });
});
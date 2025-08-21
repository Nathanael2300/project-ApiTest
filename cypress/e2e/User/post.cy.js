import { faker } from '@faker-js/faker';

let generateUserData = (overrides = {}) => {
    return {
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true',
        ...overrides
    };
};

describe("Should register a user", () => {

    it("Register a user", () => {
        const createUser = generateUserData();

        cy.api({
            method: 'POST',
            url: '/usuarios',
            body: createUser,
            failOnStatusCode: false
        }).then((resPost) => {
            expect(resPost.status).to.equal(201);
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
            expect(resPost.body).to.have.property("_id");
            expect(resPost.body).to.be.a("object");

            const userId = res.body._id;

            cy.api({
                method: 'GET',
                url: `/usuarios/${userId}`
            }).then((resGet) => {
                expect(resGet.status).to.equal(200);
                expect(resGet.body).to.have.property("nome", createUser.nome);
                expect(resGet.body.nome).to.be.a("string");
                expect(resGet.body).to.have.property("email", createUser.email);
                expect(resGet.body.email).to.be.a("string");
                expect(resGet.body.email).to.include("@");
                expect(resGet.body).to.have.property("administrador", createUser.administrador);
                expect(resGet.body.administrador).to.be.a("string");
                expect(resGet.body).to.be.a("object");
            });
        });
    });
});

    describe("Should return 400 if required fields are missing", () => {

        it("Should return 400 when name is missing in registration", () => {
            const data = generateUserData({ nome: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((resPost) => {
                expect(resPost.status).to.equal(400);
                expect(resPost.body).to.have.property("nome", "nome não pode ficar em branco");
                expect(resPost.body).to.be.a("object");
            });
        });

        it("Should return 400 when email is missing in registration", () => {
            const data = generateUserData({ email: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(400);
                expect(resPost.body).to.be.a("object");
                expect(resPost.body).to.have.property("email", "email não pode ficar em branco");
                expect(resPost.body).to.be.a("object");
            });
        });

        it("Should return 400 when password is missing in registration", () => {
            const data = generateUserData({ password: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(400);
                expect(resPost.body).to.be.a("object");
                expect(resPost.body).to.have.property("password", "password não pode ficar em branco");
                expect(resPost.body).to.be.a("object");
            });
        });

        it("Should return 400 when administrador is missing in registration", () => {
            const data = generateUserData({ administrador: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(400);
                expect(resPost.body).to.have.property("administrador", "administrador deve ser 'true' ou 'false'");
                expect(resPost.body).to.be.a("object");
            });
        });
    });
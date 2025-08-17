import { faker } from '@faker-js/faker';

// Função para gerar dados únicos por teste
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
        }).then((res) => {
            expect(res.status).to.equal(201);
            expect(res.body).to.have.property("message", "Cadastro realizado com sucesso");
            expect(res.body).to.have.property("_id");
            expect(res.body).to.be.a("object");

            const userId = res.body._id;

            cy.api({
                method: 'GET',
                url: `/usuarios/${userId}`
            }).then((resUser) => {
                expect(resUser.status).to.equal(200);
                expect(resUser.body).to.have.property("nome", createUser.nome);
                expect(resUser.body.nome).to.be.a("string");
                expect(resUser.body).to.have.property("email", createUser.email);
                expect(resUser.body.email).to.be.a("string");
                expect(resUser.body.email).to.include("@");
                expect(resUser.body).to.have.property("administrador", createUser.administrador);
                expect(resUser.body.administrador).to.be.a("string");
                expect(res.body).to.be.a("object");
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
            }).then((res) => {
                expect(res.status).to.equal(400);
                expect(res.body).to.have.property("nome", "nome não pode ficar em branco");
                expect(res.body).to.be.a("object");
            });
        });

        it("Should return 400 when email is missing in registration", () => {
            const data = generateUserData({ email: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("email", "email não pode ficar em branco");
                expect(res.body).to.be.a("object");
            });
        });

        it("Should return 400 when password is missing in registration", () => {
            const data = generateUserData({ password: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.be.a("object");
                expect(res.body).to.have.property("password", "password não pode ficar em branco");
                expect(res.body).to.be.a("object");
            });
        });

        it("Should return 400 when administrador is missing in registration", () => {
            const data = generateUserData({ administrador: '' });

            cy.api({
                method: 'POST',
                url: '/usuarios',
                body: data,
                failOnStatusCode: false
            }).then((res) => {
                expect(res.status).to.be.equal(400);
                expect(res.body).to.have.property("administrador", "administrador deve ser 'true' ou 'false'");
                expect(res.body).to.be.a("object");
            });
        });
    });
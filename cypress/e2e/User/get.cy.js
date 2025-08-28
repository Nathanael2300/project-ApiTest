import { faker } from '@faker-js/faker';

describe("Should return a list of users", () => {
    it("Return a list of users and status 200", () => {
        cy.api({
            method: 'GET',
            url: '/usuarios'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property("usuarios").and.to.be.a("array");

            res.body.usuarios.forEach(user => {
                expect(user).to.include.all.keys("nome", "email", "password", "administrador", "_id");
                expect(user.nome).to.be.a("String");
                expect(user.email).to.be.a("String").and.to.include("@");
                expect(user.password).to.be.a("String");
                expect(user.administrador).to.be.a("String")
                expect(user._id).to.be.a("String");
                expect(res.body).to.be.a("object");
            });
        });
    });
});

describe("Should return a user of list", () => {
    let userData;
    let usuario;
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
            usuario = resPost.body._id
            expect(resPost.status).to.be.equal(201);
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
            expect(resPost.body).to.have.property("_id");
            expect(resPost.body).to.be.a("Object");
        });
    });
    it("Return a user of list", () => {
        cy.api({
            method: 'GET',
            url: `/usuarios/${usuario}`,
            failOnStatusCode: false
        }).then((resGet) => {
            expect(resGet.status).to.be.eq(200);
            expect(resGet.body).to.include({
                nome: userData.nome,
                email: userData.email,
                password: userData.password,
                administrador: userData.administrador,
            });
            expect(resGet.body.nome).to.be.a("String");
            expect(resGet.body.email).to.be.a("String");
            expect(resGet.body.password).to.be.a("String");
            expect(resGet.body._id).to.be.a("String");
            expect(resGet.body).to.be.a("Object");
        });
    });
});
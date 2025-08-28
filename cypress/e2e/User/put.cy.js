import { faker } from '@faker-js/faker';

describe("Should change a information of user", () => {

    let UserData = {
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true',
    };

    let usuario;
    beforeEach(() => {
        cy.api({
            method: "POST",
            url: "/usuarios",
            body: UserData,
            failOnStatusCode: false
        }).then((resPost) => {
            usuario = resPost.body._id;
            expect(resPost.status).to.equal(201);
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
            expect(resPost.body).to.have.property("_id");
            expect(resPost.body).to.be.a("object");
        });
    });

    it("Change a information of user", () => {
        cy.api({
            method: 'PUT',
            url: `/usuarios/${usuario}`,
            body: UserData,
            failOnStatusCode: false
        }).then((resPut) => {
            expect(resPut.status).to.be.equal(200);
            expect(resPut.body).to.have.property("message", "Registro alterado com sucesso");
            expect(resPut.body).to.be.a("object");
        });
    });
});
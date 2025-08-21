import { faker } from '@faker-js/faker';

let data = {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: 'true'
};

describe("Should change a information of user", () => {

    let UpdateUser = {
        nome: `${data.firstname} ${data.lastname}`,
        email: data.email,
        password: data.password,
        administrador: data.administrador
    };

    it("Change a information of user", () => {
        cy.api({
            method: 'PUT',
            url: '/usuarios/0uxuPY0cbmQhpEz1',
            body: UpdateUser,
            failOnStatusCode: false
        }).then((resPut) => {
            expect(resPut.status).to.be.equal(200);
            expect(resPut.body).to.have.property("message", "Registro alterado com sucesso");
            expect(resPut.body).to.be.a("object");
        });
    });
});
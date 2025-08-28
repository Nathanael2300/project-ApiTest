import { faker } from '@faker-js/faker';

let UserData =  {
    nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: 'true',  
    };

describe("Should delete a user of list", () => {
    let usuario;
    beforeEach(() => {
       cy.api({
        method: "POST",
        url: "/usuarios",
        body: UserData,
        failOnStatusCode: false
       }) .then((resPost) => {
        usuario = resPost.body._id;
        expect(resPost.status).to.equal(201);
        expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
        expect(resPost.body).to.have.property("_id");
        expect(resPost.body).to.be.a("object");
       });
    });
    it("Delete a user of list", () => {
        cy.api({
            method: 'DELETE',
            url: `/usuarios/${usuario}`,
            failOnStatusCode: false
        }).then((resDelete) => {
            expect(resDelete.status).to.be.equal(200);
            expect(resDelete.body).to.have.property("message", "Registro excluído com sucesso");
            expect(resDelete.body.message).to.be.a("String");
        });
        cy.api({
            method: 'GET',
            url: `/usuarios/${usuario}`,
            failOnStatusCode: false
        }).then((resGet) => {
            expect(resGet.status).to.be.equal(400);
            expect(resGet.body).to.have.property('message', "Usuário não encontrado");
            expect(resGet.body.message).to.be.a("String");
        });
    });
});
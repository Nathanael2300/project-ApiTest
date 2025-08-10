describe("Should return a list of users", () => {
    it("Return a list of users and status 200", () => {
        cy.api({
            method: 'GET',
            url: '/usuarios'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.have.property("usuarios").and.to.be.a("array");

            res.body.usuarios.forEach(user => {
                expect(user).to.include.all.keys("nome", "email", "password", "administrador", "_id");
                expect(user.nome).to.be.a("String");
                expect(user.email).to.be.a("String").and.to.include("@");
                expect(user.password).to.be.a("String");
                expect(user.administrador).to.be.a("String")
                expect(user._id).to.be.a("String");
            });
        });
    });
});

describe("Should return a user of list", () => {
    it("Return a user of list", () => {
        cy.api({
            method: 'GET',
            url: '/usuarios/0uxuPY0cbmQhpEz1'
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.be.a("object");
            expect(res.body).to.include({
                nome: "Fulano da Silva",
                password: "teste",
                email: "fulano@qa.com",
                administrador: "true",
                _id: "0uxuPY0cbmQhpEz1"
            });
            expect(res.body.nome).to.be.a("String");
            expect(res.body.email).to.be.a("String");
            expect(res.body.password).to.be.a("String");
            expect(res.body.administrador).to.be.a("String");
            expect(res.body._id).to.be.a("String")
        });
    });
});
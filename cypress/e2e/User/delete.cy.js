describe("Should delete a user of list", () => {
    it("Delete a user of list", () => {
        cy.api({
            method: 'DELETE',
            url: '/usuarios/89wXfgo1juR7WWst',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property("message", "Registro excluído com sucesso");
            expect(res.body.message).to.be.a("String");
        });
        cy.api({
            method: 'GET',
            url: '/usuarios/89wXfgo1juR7WWst',
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property('message', "Usuário não encontrado");
            expect(res.body.message).to.be.a("String");
        });
    });
});
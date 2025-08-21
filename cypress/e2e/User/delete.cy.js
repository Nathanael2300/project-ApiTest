describe("Should delete a user of list", () => {
    it("Delete a user of list", () => {
        cy.api({
            method: 'DELETE',
            url: '/usuarios/89wXfgo1juR7WWst',
            failOnStatusCode: false
        }).then((resDelete) => {
            expect(resDelete.status).to.be.equal(200);
            expect(resDelete.body).to.have.property("message", "Registro excluído com sucesso");
            expect(resDelete.body.message).to.be.a("String");
        });
        cy.api({
            method: 'GET',
            url: '/usuarios/89wXfgo1juR7WWst',
            failOnStatusCode: false
        }).then((resGet) => {
            expect(resGet.status).to.be.equal(400);
            expect(resGet.body).to.have.property('message', "Usuário não encontrado");
            expect(resGet.body.message).to.be.a("String");
        });
    });
});
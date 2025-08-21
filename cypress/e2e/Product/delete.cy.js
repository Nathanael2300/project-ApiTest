describe("Should delete a product of list", () => {
    it("Delete a product of list", () => {

        const loginUser = {
            email: "fulano@qa.com",
            password: "teste"
        }

        cy.api({
            method: "POST",
            url: "/login",
            body: loginUser,
            failOnStatusCode: false
        }).then((resPost) => {
            expect(resPost.status).to.be.equal(200);
            expect(resPost.body).to.have.property("message", "Login realizado com sucesso")
            .and.to.be.a("String");
            expect(resPost.body).to.have.property("authorization").and.to.be.a("String");
            expect(resPost.body).to.be.a("Object");

            const token = resPost.body.authorization;

            cy.api({
                method: "DELETE",
                url: "/produtos/B5DO7Bv7rS9phNSV",
                headers: {
                    authorization: token  
                },
                failOnStatusCode: false
            }).then((resDelete) => {
                expect(resDelete.status).to.be.equal(200);
                expect(resDelete.body).to.have.property("message", "Registro excluído com sucesso").and.to.be.a("String");
                expect(resDelete.body).to.be.a("Object");   
            });

            cy.api({
                method: "GET",
                url: "/produtos/B5DO7Bv7rS9phNSV",
                failOnStatusCode: false
            }).then((resGet) => {
                expect(resGet.status).to.be.equal(400);
                expect(resGet.body).to.have.ownProperty("message", "Produto não encontrado").and.to.be.a("String");
                expect(resGet.body).to.be.a("Object"); 
            });
        });        
    });
});
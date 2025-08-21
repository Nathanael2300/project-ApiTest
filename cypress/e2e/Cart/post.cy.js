describe("Should create a product in cart", () => {
    it("Create a product in cart", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: "Noemi52@yahoo.com",
                password: "TIV7EP7zehs_vh2",
            },
            failOnStatusCode: false
        }).then((resGet) => {
            expect(resGet.status).to.be.equal(200);
            expect(resGet.body).to.have.property("message", "Login realizado com sucesso");
            expect(resGet.body.message).to.be.a("String");
            expect(resGet.body.authorization).to.be.a("String");
            expect(resGet.body).to.be.a("object");

            const token = resGet.body.authorization;

            cy.api({
                method: "POST",
                url: "/carrinhos",
                headers: {
                    authorization: token
                },
                failOnStatusCode: false,
                body: {
                    produtos: [
                        {
                            idProduto: "BeeJh5lz3k6kSIzA",
                            quantidade: 4
                        },
                        {
                            idProduto: "05la7ORsSqV0PURk",
                            quantidade: 6
                        },
                        {
                            idProduto: "2aSU4FIrt64aCmFZ",
                            quantidade: 8
                        }
                    ]
                }
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(201);
                expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso").and.to.be.a("String");
                expect(resPost.body).to.have.property("_id").and.to.be.a("String");
            })
        });
    });
});
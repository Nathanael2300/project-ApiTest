describe("Should complete the purchase", () => {
    it("Complete the purchase", () => {

        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: "tsilvaa01@qa.com.br",
                password: "teste",
            },
            failOnStatusCode: false
        }).then((resLogin) => {
            expect(resLogin.status).to.be.equal(200);
            expect(resLogin.body).to.have.property("message", "Login realizado com sucesso");
            expect(resLogin.body).to.have.property("authorization").and.to.be.a("String");
            expect(resLogin.body).to.be.a("Object");

            const token = resLogin.body.authorization;

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
                            idProduto: "QaZE46WR5nLyYNsu",
                            quantidade: 4
                        },
                        {
                            idProduto: "TccAW9s6ycnvAdKo",
                            quantidade: 6
                        },
                        {
                            idProduto: "UMBCvYY6lncXsaPm",
                            quantidade: 8
                        }
                    ]
                }
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(201);
                expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso").and.to.be.a("String");
                expect(resPost.body).to.have.property("_id").and.to.be.a("String");
            });


            cy.api({
                method: "DELETE",
                url: "/carrinhos/cancelar-compra",
                headers: {
                    authorization: token
                },
                failOnStatusCode: false,
            }).then((resDelete) => {
                expect(resDelete.status).to.be.equal(200);
                expect(resDelete.body).to.have.property("message", "Registro excluído com sucesso");
            });
        });
    });
});


describe("Should cancel the purchase", () => {
    it("Cancel the purchase", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: "tsilvaa01@qa.com.br",
                password: "teste",
            },
            failOnStatusCode: false
        }).then((resLogin) => {
            expect(resLogin.status).to.be.equal(200);
            expect(resLogin.body).to.have.property("message", "Login realizado com sucesso");
            expect(resLogin.body).to.have.property("authorization").and.to.be.a("String");
            expect(resLogin.body).to.be.a("Object");

            const token = resLogin.body.authorization;

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
                            idProduto: "QaZE46WR5nLyYNsu",
                            quantidade: 4
                        },
                        {
                            idProduto: "TccAW9s6ycnvAdKo",
                            quantidade: 6
                        },
                        {
                            idProduto: "UMBCvYY6lncXsaPm",
                            quantidade: 8
                        }
                    ]
                }
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(201);
                expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso").and.to.be.a("String");
                expect(resPost.body).to.have.property("_id").and.to.be.a("String");
            })
        })
    });
});
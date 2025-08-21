describe("Should return a list of cart", () => {
    it("Return a list of cart", () => {
        cy.api({
            method: "GET",
            url: "/carrinhos",
        }).then((resGet) => {
            expect(resGet.status).to.be.equal(200);

            resGet.body.carrinhos.forEach(cart => {
                expect(cart).to.have.property("produtos");

                cart.produtos.forEach(product => {
                    expect(product).to.have.property("idProduto").and.to.be.a("String");
                    expect(product).to.have.property("quantidade").and.to.be.a("Number");
                    expect(product).to.have.property("precoUnitario").and.to.be.a("Number");
                });

                expect(cart).to.have.property("precoTotal").and.to.be.a("Number");
                expect(cart).to.have.property("quantidadeTotal").and.to.be.a("Number");
                expect(cart).to.have.property("idUsuario").and.to.be.a("String");
                expect(cart).to.have.property("_id").and.to.be.a("String");
                expect(cart).to.be.a("Object");
            });
        });
    });
});

describe("Should return a cart of list", () => {
    it("Return a cart of list", () => {
        cy.api({
            method: "GET",
            url: "/carrinhos/qbMqntef4iTOwWfg"
        }).then((resGet) => {
            expect(resGet.status).to.be.equal(200);

            const cart = resGet.body;

            expect(cart).to.have.property("produtos");

            cart.produtos.forEach(product => {
                expect(product.idProduto).to.be.a("String");
                expect(product.quantidade).to.be.a("Number");
                expect(product.precoUnitario).to.be.a("Number");
            });

            expect(cart.produtos).to.deep.include({
                idProduto: "BeeJh5lz3k6kSIzA",
                quantidade: 2,
                precoUnitario: 470,
            });

            expect(cart.produtos).to.deep.include({
                idProduto: "K6leHdftCeOJj8BJ",
                quantidade: 1,
                precoUnitario: 5240
            });

            expect(cart).to.include({
                precoTotal: 6180,
                quantidadeTotal: 3,
                idUsuario: "0uxuPY0cbmQhpEz1",
                _id: "qbMqntef4iTOwWfg"
            });

            expect(cart.precoTotal).to.be.a("Number");
            expect(cart.quantidadeTotal).to.be.a("Number");
            expect(cart.idUsuario).to.be.a("String");
            expect(cart._id).to.be.a("String");
            expect(cart).to.be.a("Object");
        });
    });
});
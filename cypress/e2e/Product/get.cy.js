describe("Should return a list of products", () => {
    it("Return a list of products", () => {
        cy.api({
            method: "GET",
            url: "/produtos"
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            res.body.produtos.forEach(product => {
                expect(product).to.have.property("nome").and.to.be.a("String");
                expect(product).to.have.property("preco").and.to.be.a("Number");
                expect(product).to.have.property("descricao").and.to.be.a("String");
                expect(product).to.have.property("quantidade").and.to.be.a("Number");
                expect(product).to.have.property("_id").and.to.be.a("String");
                expect(product).to.be.a("Object");
            });
        });
    });
});

describe("Should return a product of list", () => {
    it("Return a product of list", () => {
        cy.api({
            method: "GET",
            url: "/produtos/30KFjzDmd941Y6jA"
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.include({
                nome: "Mouse 1755106314082",
                preco: 10,
                descricao: "Mouse gamer",
                quantidade: 1,
                _id: "30KFjzDmd941Y6jA",
            });
            expect(res.body.nome).to.be.a("String");
            expect(res.body.preco).to.be.a("Number");
            expect(res.body.descricao).to.be.a("String");
            expect(res.body.quantidade).to.be.a("Number");
            expect(res.body._id).to.be.a("String");
            expect(res.body).to.be.a("Object");
        });
    });
});
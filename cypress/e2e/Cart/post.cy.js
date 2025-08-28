import { faker } from '@faker-js/faker';

let userData;
let token;
let idProduct;

let CreateProduct = {
    nome: faker.commerce.productName(),
    preco: faker.number.int({ min: 1, max: 100 }),
    quantidade: faker.number.int({ min: 1, max: 100 }),
    descricao: "teste desc"
};

beforeEach(() => {
    userData = {
        nome: `${faker.person.firstName()} ${faker.person.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true'
    };

    cy.api({
        method: "POST",
        url: "/usuarios",
        body: userData,
        failOnStatusCode: false
    }).then((resPost) => {
        expect(resPost.status).to.equal(201);
        expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
        expect(resPost.body).to.have.property("_id");
        expect(resPost.body).to.be.a("Object");

        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: userData.email,
                password: userData.password,
            }
        }).then((resPost) => {
            expect(resPost.status).to.be.equal(200);
            expect(resPost.body).to.have.property("message", "Login realizado com sucesso");
            expect(resPost.body.message).to.be.a("String");
            expect(resPost.body.authorization).to.be.a("String");
            expect(resPost.body).to.be.a("object");

            token = resPost.body.authorization;

            cy.api({
                method: "POST",
                url: "/produtos",
                headers: { authorization: token },
                body: CreateProduct,
                failOnStatusCode: false
            }).then((resPost) => {
                expect(resPost.status).to.be.equal(201);
                expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
                idProduct = resPost.body._id
            });
        });
    });
});

describe("Should create a product in cart", () => {
    it("Create a product in cart", () => {
        cy.api({
            method: "POST",
            url: "carrinhos",
            body: {
                "produtos": [
                  {
                    "idProduto": idProduct,
                    "quantidade": 5
                  },
                ]
              },
              headers: { authorization: token },
              failOnStatusCode: false
        }).then((resPost) => {
            expect(resPost.status).to.be.equal(201);
            expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
        })
    });
});
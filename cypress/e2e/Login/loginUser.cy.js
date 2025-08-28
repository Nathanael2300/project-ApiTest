import { faker } from '@faker-js/faker';

let userData;
beforeEach(() => {
    userData =  {
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: 'true',  
    };
    cy.api({
        method: "POST",
        url: "/usuarios",
        body: userData
    }).then((resPost) => {
        expect(resPost.status).to.equal(201);
        expect(resPost.body).to.have.property("message", "Cadastro realizado com sucesso");
        expect(resPost.body).to.have.property("_id");
        expect(resPost.body).to.be.a("object");
    });
});

describe("Should perform the login which success", () => {
    it("perform the login which success", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: userData.email,
                password: userData.password,
            }
        }).then((res) => {
            expect(res.status).to.be.equal(200);
            expect(res.body).to.have.property("message", "Login realizado com sucesso");
            expect(res.body.message).to.be.a("String");
            expect(res.body.authorization).to.be.a("String");
            expect(res.body).to.be.a("object");
        });
    });
});

describe("Should return the error 401 if credentials are not correct", () => {
    it("Return 401 if email are not correct", () => {
        const data = {
            email: "email@Errado.com.br",
            password: userData.password
        };
        cy.api({
            method: "POST",
            url: "/login",
            body: data,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(401);
            expect(res.body).to.have.property("message", "Email e/ou senha inválidos");
        });
    });

    it("Return 401 if password are not correct", () => {
        const data = {
            email: userData.email,
            password: "SenhaErrada"
        }
        cy.api({
            method: "POST",
            url: "/login",
            body: data,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(401);
            expect(res.body).to.have.property("message", "Email e/ou senha inválidos");
            expect(res.body).to.be.a("object");
        });
    });
});

describe("Should return the error 400 if the email not include '@'", () => {
    
    it("Return the error 400 if the email not include '@'", () => {
        const data = {
            email: "testUsergmail.com",
            password: userData.password
        };
        cy.api({
            method: "POST",
            url: "/login",
            body: data,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property("email", "email deve ser um email válido");
            expect(res.body).to.be.a("object");
        });
    });
});

describe("Should return 400 if required fields are missing", () => {
    it("Return 400 if required email are missing", () => {
        const data = {
            email: "",
            password: userData.password
        };
        cy.api({
            method: "POST",
            url: "/login",
            body: data,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property("email", "email não pode ficar em branco");
            expect(res.body.email).to.be.a("String")
            expect(res.body).to.be.a("object");
        });     
    });

    it("Return 400 if required password are missing", () => {
        const data = {
            email: userData.email,
            password: ""
        };
        cy.api({
            method: "POST",
            url: "/login",
            body: data,
            failOnStatusCode: false
        }).then((res) => {
            expect(res.status).to.be.equal(400);
            expect(res.body).to.have.property("password", "password não pode ficar em branco");
            expect(res.body.password).to.be.a("String");
            expect(res.body).to.be.a("object");
        });
    });
});
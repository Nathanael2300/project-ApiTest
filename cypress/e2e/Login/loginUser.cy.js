const loginUser = (user = {}) => {
    return {
    email: "lugosilveira1@qa.com.br",
    password: "teste",
    ...user
    };
};

describe("Should perform the login which success", () => {
    it("perform the login which success", () => {
        cy.api({
            method: "POST",
            url: "/login",
            body: {
                email: "lugosilveira1@qa.com.br",
                password: "teste",
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
        const data = loginUser({email: "email@Errado.com.br"});
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
        const data = loginUser({password: "senhaErrada"});
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
        const data = loginUser({email: "lugosilveira1qa.com.br"});
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
        const data = loginUser({email: ""})
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
        const data = loginUser({password: ""})
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
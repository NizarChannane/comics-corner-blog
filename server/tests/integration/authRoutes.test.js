import createApp from "../../app.js";
import request from "supertest";
import { jest, expect } from "@jest/globals";
import dbIndex from "../../models/dbIndex.js";
import manuallyParseCookies from "../../utils/manualCookieParser.js";
import utils from "../../utils/utilsIndex.js";

// --  POST -- /auth/signup -- PUBLIC -- créer un compte utilisateur
// --  POST -- /auth/signin -- PUBLIC -- se déconnecter
// --  POST -- /auth/authenticate -- PRIVATE -- verify jwt inside cookie
// --  GET -- /auth/verify-email -- PRIVATE -- vérifier l'email
// --  POST -- /auth/send-reset-email -- PUBLIC -- send an email with link to change password
// --  PUT -- /auth/reset-pwd -- PRIVATE -- change password in DB
// --  DELETE -- /auth/delete-user -- PRIVATE -- delete user

const app = createApp();
const db = dbIndex.getAuthDb().tests;

const signupValidUser = {
	username: "username",
	lastName: "lastName",
	firstName: "firstName",
	email: "fake@email.com",
	password: "Password314#"
};

const signupInvalidUsers = [
    {
        // username missing
        body: {
            lastName: "lastName",
            firstName: "firstName",
            email: "fake@email.com",
            password: "Password314#"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir un nom d'utilisateur",
                path: "username",
                location: "body"
            }]
        }
    },
    {
        // lastName missing
        body: {
            username: "username",
            firstName: "firstName",
            email: "fake@email.com",
            password: "Password314#"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir un nom",
                path: "lastName",
                location: "body"
            }]
        }
    },
    {
        // firstName missing
        body: {
            username: "username",
            lastName: "lastName",
            email: "fake@email.com",
            password: "Password314#"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir un prénom",
                path: "firstName",
                location: "body"
            }]
        }
    },
    {
        // email missing
        body: {
            username: "username",
            lastName: "lastName",
            firstName: "firstName",
            password: "Password314#"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir une adresse email",
                path: "email",
                location: "body"
            }]
        }
    },
    {
        // password missing
        body: {
            username: "username",
            lastName: "lastName",
            firstName: "firstName",
            email: "fake@email.com"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir un mot de passe",
                path: "password",
                location: "body"
            }]
        }
    }
];

const signinValidUser = {
	email: "fake@email.com",
	password: "Password314#"
};

const signinInvalidUser = [
    {
        // email missing
        body: {
            email: "",
            password: "Password314#"
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir une adresse email",
                path: "email",
                location: "body"
            }]
        }
    },
    {
        // password missing
        body: {
            email: "fake@email.com",
            password: ""
        },
        expectations: {
            errors: [{
                type: "field",
                value: "",
                msg: "Champ obligatoire, doit contenir un mot de passe",
                path: "password",
                location: "body"
            }]
        },
    },
    {
        // wrong password
        body: {
            email: "fake@email.com",
            password: "Password14#"
        },
        expectations: {
            msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe.",
        },
    },
    {
        // wrong email
        body: {
            email: "wrongFake@email.com",
            password: "Password314#"
        },
        expectations: {
            msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
        },
    }
];

const testId = {};

const dummyUser = {
    username: "username",
    lastName: "lastName",
    firstName: "firstName",
    email: "fake@email.com",
    //  password: Password314#
    password: "$2b$10$goHqjEMkP8kfgxISI2cSCuDVcEjGkmBG7iUbYd570GauJ0Q0.7G7K"
};

describe("auth routes integration", () => {

    describe("signup route", () => {

        afterAll(async () => {
            //  db cleanup
            const dbRes = await db.getUserByEmail("fake@email.com");
            const deleteRes = await db.deleteUser(dbRes[0].userId);
            // console.log(deleteRes);
        });

        test("invalid request", async () => {
    
            for (const user of signupInvalidUsers) {
                // console.log(user.body);
                const response = await request(app)
                    .post("/auth/signup")
                    .send(user.body);
    
                expect(response.statusCode).toBe(400);
                expect(JSON.parse(response.text)).toStrictEqual(user.expectations);
            };
    
        });

        test("valid request", async () => {
            const expectedMsg = "Votre compte a bien été créé. Veuillez cliquer sur le lien se trouvant dans le mail de vérification qui vous a été envoyé."

            const response = await request(app)
                .post("/auth/signup")
                .send(signupValidUser);

            // console.log(JSON.parse(response.text).userId);

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).userId).toBeDefined();
            expect(JSON.parse(response.text).msg).toBe(expectedMsg);
        });

        test("user already exists", async () => {
            const expectation = {
                msg: "Un compte est déjà associé à cette adresse email."
            };

            const response = await request(app)
                .post("/auth/signup")
                .send(signupValidUser);

            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.text)).toStrictEqual(expectation);
        });

    });

    describe("signin route", () => {

        beforeAll(async () => {
            //  db setup
            testId.userId = (await db.createUser(dummyUser)).insertId;
            console.log(testId.userId);
        });

        afterAll(async () => {
            //  db cleanup
            const dbRes = await db.getUserByEmail("fake@email.com");
            await db.deleteUser(dbRes[0].userId);
        });

        test("invalid request", async () => {
            for (const user of signinInvalidUser) {
                const response = await request(app)
                    .post("/auth/signin")
                    .send(user.body);

                expect(response.statusCode).toBe(400);
                expect(JSON.parse(response.text)).toStrictEqual(user.expectations);
            };

        });

        test("user email not verified", async () => {
            const response = await request(app)
                .post("/auth/signin")
                .send(signinValidUser);

            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.text).msg).toBe(
                "Il semblerait que votre adresse ne soit pas encore vérifiée, veuillez consulter le mail qui vous a été envoyé lors de la création de votre compte"
            );
        });

        test("valid request", async () => {
            await db.verifyEmail(testId.userId);
            const response = await request(app)
                .post("/auth/signin")
                .send(signinValidUser);

            console.log(response.headers["set-cookie"]);

            const parsedCookie = manuallyParseCookies(response.headers["set-cookie"][0]);
            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).userId).toBe(testId.userId);
            expect(parsedCookie.ccAuthCookie).toBeDefined();
            expect(typeof parsedCookie.ccAuthCookie).toBe("string");
            expect(parsedCookie.path).toBeDefined();
            expect(parsedCookie.expires).toBeDefined();
        });

    });

    describe("verifyEmail route", () => {

        let invalidTokens = [
            {
                //  invalid payload
                token: ""
            },
            {
                //  invalid JWT
                token: ""
            }
        ];
        let validToken = "";

        let tempPayload = {}
        let invalidPayload = {}

        beforeAll(async () => {
            const response = await request(app)
                .post("/auth/signup")
                .send(signupValidUser);

            // validToken = JSON.parse(response.text).token;
            validToken = await utils.tokensTool.createToken({ userId: JSON.parse(response.text).userId });
            tempPayload = await utils.tokensTool.decodeToken(validToken);
            invalidPayload = { idUser: tempPayload.userId, ...tempPayload };
            delete invalidPayload.userId;
            invalidTokens[0].token = await utils.tokensTool.createToken(invalidPayload);
            invalidTokens[1].token = validToken.substring(3);
        });

        afterAll(async () => {
            //  db cleanup
            const dbRes = await db.getUserByEmail("fake@email.com");
            await db.deleteUser(dbRes[0].userId);
        });

        test("invalid request", async () => {
            for (const body of invalidTokens) {
                const response = await request(app)
                    .get(`/auth/verify-email?token=${body.token}`);

                expect(response.statusCode).toBe(400);
                expect(JSON.parse(response.text).msg).toBe("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer.");
            };
        });

        test("valid request", async () => {
            const response = await request(app)
                .get(`/auth/verify-email?token=${validToken}`);

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).msg).toBe("L'adresse email a bien été vérifiée. Vous pouvez vous connecter.");
        });

        test("user doesn't exist", async () => {
            const dummyUser = { userId: 1 };
            const token = await utils.tokensTool.createToken(dummyUser);
            const response = await request(app)
                .get(`/auth/verify-email?token=${token}`);

            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.text).msg).toBe("Il semblerait que ce compte n'existe pas ou a été supprimé.");
        });
        
        test("email already verified", async () => {
            const response = await request(app)
                .get(`/auth/verify-email?token=${validToken}`);

            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.text).msg).toBe("Cette adresse mail a déjà été vérifiée. Vous pouvez vous connecter normalement.")
        });

    });

    // describe("authenticate route", () => {

    // });

    describe("sendResetEmail route", () => {

        beforeAll( async () => {
            await db.createUser(dummyUser);
        });

        afterAll(async () => {
            //  db cleanup
            const dbRes = await db.getUserByEmail("fake@email.com");
            await db.deleteUser(dbRes[0].userId);
        });

        test("invalid request", async () => {
            const response = await request(app)
                .post("/auth/send-reset-email")
                .send({ email: "wrongEmail@email.com" });

            expect(response.statusCode).toBe(400);
            expect(JSON.parse(response.text).msg).toBe("Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire.");
        });

        test("valid request", async () => {
            const dummyEmail = { email: "fake@email.com" }
            const response = await request(app)
                .post("/auth/send-reset-email")
                .send(dummyEmail);

            expect(response.statusCode).toBe(200);
            expect(JSON.parse(response.text).msg).toBe("Un mail de réinitialisation a été envoyé sur votre adresse mail.");
        });
    });

    describe("resetPwd route", () => {

        let dummyToken = "";

        // beforeAll(async () => {
        //     const userId = (await db.createUser(dummyUser)).insertId;
        //     console.log({userId});
        //     dummyToken = await utils.tokensTool.createToken({userId});
        //     console.log(dummyToken);
        // });

        test("invalid request", async () => {
            // const response = await request(app)
            //     .put("/auth/reset-pwd?token=")
            //     .send();

            //  invalid token
            //  invalid JWT
        });

        test("valid request", async () => {
            // const response = await request(app)
            //     .put("/auth/reset-pwd")
        });
    });
});
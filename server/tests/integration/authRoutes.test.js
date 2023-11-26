import createApp from "../../app";
import response from "supertest";

// --  POST -- /auth/signup -- PUBLIC -- créer un compte utilisateur
// --  POST -- /auth/signin -- PUBLIC -- se déconnecter
// --  POST -- /auth/authenticate -- PRIVATE -- verify jwt inside cookie
// --  GET -- /auth/verify-email -- PRIVATE -- vérifier l'email
// --  POST -- /auth/send-reset-email -- PUBLIC -- send an email with link to change password
// --  PUT -- /auth/reset-pwd -- PRIVATE -- change password in DB
// --  DELETE -- /auth/delete-user -- PRIVATE -- delete user

describe("auth routes integration", () => {
    test("integration test", async () => {

    });
});
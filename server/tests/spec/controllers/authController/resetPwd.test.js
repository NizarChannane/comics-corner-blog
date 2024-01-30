import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals";

const mockReq = {
    body: {
        password: "password"
    },
    param: {},
    cookies: {},
    get: jest.fn()
};

const mockRes = {
    status: jest.fn(),
    send: jest.fn()
};

const mockDb = {
    getUserByEmail: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn(),
    isUserVerified: jest.fn(),
    verifyEmail: jest.fn(),
    changePwd: jest.fn()
};

const mockUtils = {
    tokensTool: {
        createToken: jest.fn(),
        decodeToken: jest.fn()
    },
    encryptionTool: {
        hashPwd: jest.fn()
    },
    mailingTool: {
        sendVerificationEmail: jest.fn(),
        sendResetEmail: jest.fn()
    }
};

const validatorResultObj = {
    isEmpty: jest.fn(),
    array: jest.fn()
};

const mockValidator = {
    validationResult: jest.fn(),
    matchedData: jest.fn()
};

//  resetPwd
describe("resetPwd", () => {

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNTE2MjM5MDIyfQ.VvlnVPAZ7j6e50xKQ9fEEMwpcFOYXYeZj-MWHj661jU";
    const userId = 123;
    const dummyUser = {
        userId: 123,
        username: "username",
        email: "fake@email.com"
    };
    const dbResult = {
        userId: 123,
        username: "username",
        email: "fake@email.com",
        password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0.",
        verified: false
    };

    beforeEach(() => {
        mockRes.status.mockReturnThis();
        mockValidator.validationResult.mockReturnValue(validatorResultObj);
        validatorResultObj.isEmpty.mockReturnValue(true);
        mockReq.cookies.resetToken = token;
        mockUtils.tokensTool.decodeToken.mockResolvedValue({ userId });
        mockDb.getUserById.mockResolvedValue(dbResult);
        // mockDb.changePwd.mockResolvedValue()
    });

    //  get validation errors
    describe("get validation errors", () => {

        beforeEach(() => {
            validatorResultObj.isEmpty.mockReturnValue(false);
        });

        //  get validation results
        test("get validation results", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockValidator.validationResult).toHaveBeenCalledTimes(1);
            expect(mockValidator.validationResult.mock.calls[0][0]).toBe(mockReq);
        });

        //  sets response status to 400 if errors
        test("sets response status to 400 if errors", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back array of errors in an object
        test("sends back array of errors in an object", async () => {
            const errObj = {
                location: "query",
                msg: "Invalid value",
                path: "person",
                type: "field"
            };
            validatorResultObj.array.mockReturnValue([errObj]);

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(validatorResultObj.isEmpty).toHaveBeenCalledTimes(1);
            expect(validatorResultObj.array).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({ errors: [errObj] });
        });
    });

    //  gets token from cookie
    describe("gets token from cookie", () => {

        beforeEach(() => {
            mockReq.cookies.resetToken = "";
        });

        //  sets response status to 400 if cookie is missing/expired
        test("sets response status to 400 if cookie is missing", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Il semblerait que votre lien a expiré. Veuillez réessayer."
            });
        });
    });

    //  decodes token
    describe("decodes token", () => {

        beforeEach(() => {
            mockUtils.tokensTool.decodeToken.mockResolvedValue("");
        });

        //  passes token to decoding function
        test("passes token to decoding function", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.tokensTool.decodeToken).toHaveBeenCalledTimes(1);
            expect(mockUtils.tokensTool.decodeToken.mock.calls[0][0]).toBe(token);
        });

        //  sets response status to 400 if token doesn't contain userId
        test("sets response status to 400 if token doesn't contain userId", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Il semblerait que le serveur n'arrive pas à vous authentifier. Veuillez recommencer la procédure."
            });
        });
    });

    //  checks if user exists
    describe("checks if user exists", () => {

        beforeEach(() => {
            mockDb.getUserById.mockResolvedValue("");
        });

        //  passes userId to db function
        test("passes userId to db function", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserById.mock.calls[0][0]).toBe(userId);
        });

        //  sets response status to 400 if user doesn't exists
        test("sets response status to 400 if user doesn't exists", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Il semblerait que ce compte n'existe pas. Veuillez vous inscrire."
            });
        });
    });

    //  processes user data
    describe("processes user data", () => {

        //  hashes password
        test("hashes password", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.encryptionTool.hashPwd).toHaveBeenCalledTimes(1);
            expect(mockUtils.encryptionTool.hashPwd.mock.calls[0][0]).toBe(dbResult.password);
        });

        //  passes hashed password to db function
        test("passes hashed password to db function", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.changePwd).toHaveBeenCalledTimes(1);
            expect(mockDb.changePwd.mock.calls[0][0]).toBe(dbResult.userId);
            expect(mockDb.changePwd.mock.calls[0][1]).toBe(
                mockUtils.encryptionTool.hashPwd(dbResult.password)
            );
        });

        //  sets response status code to 200 when user updated
        test("sets response status code to 200 when user updated", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {

            await authController.resetPwd(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Le mot de passe a bien été modifié. Vous pouvez vous connecter en utilisant le nouveau mot de passe."
            });
        });
    });

});
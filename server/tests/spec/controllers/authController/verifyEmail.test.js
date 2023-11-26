import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals";

const mockReq = {
    body: {
        username: "username",
        firstname: "firstname",
        lastname: "lastname",
        email: "fake@email.com",
        password: "sup3rs3cr3t"
    },
    param: {}
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
    verifyEmail: jest.fn()
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
        sendVerificationEmail: jest.fn()
    }
};

const validatorResultObj = {
    isEmpty: jest.fn(),
    array: jest.fn(),
};

const mockValidator = {
    validationResult: jest.fn(),
    matchedData: jest.fn()
};


//  verifyEmail
describe("verifyEmail function", () => {

    const dbResult = {
        userId: 123,
        username: "username",
        email: "fake@email.com",
        password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0.",
        verified: false
    };

    beforeEach(() => {
        mockRes.status.mockReturnThis();
        mockUtils.tokensTool.decodeToken.mockReturnValue({ userId: 123 });
        mockReq.param.token = "some token";
        mockDb.getUserById.mockResolvedValue(dbResult);
    });

    //  gets token from request params
    describe("get token from query param", () => {

        beforeEach(() => {
            mockReq.param.token = "";
        });

        //  sets response status to 400 if param is missing
        test("sets response status to 400 if param is missing", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
            });
        });

    });


    //  decodes token
    describe("decode token", () => {

        beforeEach(() => {
            mockUtils.tokensTool.decodeToken.mockReturnValue({});
        });

        //  passes token to decoding function
        test("passes token to decoding function", async () => {
            // mockReq.param.token = "some token";

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.tokensTool.decodeToken).toHaveBeenCalledTimes(1);
            expect(mockUtils.tokensTool.decodeToken.mock.calls[0][0]).toBe(mockReq.param.token);
        });

        //  sets response status to 400 if token doesn't contain userId
        test("sets response status to 400 if token doesn't contain userId", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
            });
        });
    });


    //  checks if email is already verified
    describe("checks if email is already verified", () => {

        beforeEach(() => {
            // mockDb.getUserById.mockResolvedValue({});
            dbResult.verified = true;
        });

        afterEach(() => {
            dbResult.verified = false;
        })

        //  passes userId to db function
        test("passes userId to db function", async () => {
            const userId = 123;
            mockUtils.tokensTool.decodeToken.mockResolvedValue({userId});

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserById.mock.calls[0][0]).toBe(userId);
        });

        //  sets response status to 400 if email is already verified
        test("sets response status to 400 if email is already verified", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Cette adresse mail a déjà été vérifiée. Vous pouvez vous connecter normalement."
            });
        });
    });


    //  processes user data and sends confirmation to client
    describe("processes user data and sends confirmation to client", () => {

        //  updates user in db
        test("update user in db", async () => {
            // mockDb.verifyEmail.mockReturnValue();

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.verifyEmail).toHaveBeenCalledTimes(1);
            expect(mockDb.verifyEmail.mock.calls[0][0]).toBe(dbResult.userId);
        });

        //  sends user info
        // test("sends user info", async () => {

        // });

        //  sets response status to 200
        test("sets response status to 200", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.verifyEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "L'adresse email a bien été vérifiée. Vous pouvez vous connecter."
            });
        });
    });

});
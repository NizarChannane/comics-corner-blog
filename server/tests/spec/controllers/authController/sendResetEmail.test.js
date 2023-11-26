import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals";

const mockReq = {
    body: {
        email: "fake@email.com"
    },
    param: {},
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
        sendVerificationEmail: jest.fn(),
        sendResetEmail: jest.fn()
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

//  sendResetEmail
describe("sendResetEmail", () => {

    beforeEach(() => {
        mockRes.status.mockReturnThis();
        mockValidator.validationResult.mockReturnValue(validatorResultObj);
        validatorResultObj.isEmpty.mockReturnValue(true);
    });

    //  check validation errors
    describe("check validation errors", () => {

        beforeEach(() => {
            validatorResultObj.isEmpty.mockReturnValue(false);
        });

        //  get validation results
        test("get validation results", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockValidator.validationResult).toHaveBeenCalledTimes(1);
            expect(mockValidator.validationResult.mock.calls[0][0]).toBe(mockReq);
        });

        //  sets response status to 400 if errors
        test("sets response status to 400 if errors", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

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

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(validatorResultObj.isEmpty).toHaveBeenCalledTimes(1);
            expect(validatorResultObj.array).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({ errors: [errObj] });
        });
    });

    //  gets user info from db
    describe("gets user info from db", () => {

        //  passes email to db function
        test("passes email to db function", async () => {
            mockDb.getUserByEmail.mockResolvedValue({
                ...mockReq.body,
                password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0."
            });

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserByEmail.mock.calls[0][0]).toBe(mockReq.body.email);
        });

        //  sets response status code to 400 if user doesn't exist
        test("sets response status code to 400 if doesn't exist", async () => {
            mockDb.getUserByEmail.mockResolvedValue();

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockDb.getUserByEmail.mockResolvedValue();

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
            });
        });
    });

    //  processes user data and sends confirmation to client
    describe("processes user data and sends confirmation to client", () => {

        const dummyUser = {
            userId: 123,
            username: "username",
            email: "fake@email.com"
        };

        beforeEach(() => {
            mockDb.getUserByEmail.mockResolvedValue(dummyUser);
        });

        //  create reset token
        test("create reset token", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.tokensTool.createToken).toHaveBeenCalledTimes(1);
            expect(mockUtils.tokensTool.createToken.mock.calls[0][0]).toBe(dummyUser.userId);
        });

        //  sends reset email
        test("sends reset email", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.mailingTool.sendResetEmail).toHaveBeenCalledTimes(1);
            expect(mockUtils.mailingTool.sendResetEmail.mock.calls[0][0]).toBe(dummyUser.email);
        });

        //  sets response status to 200
        test("sets response status to 200", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.sendResetEmail(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "L'adresse email a bien été vérifiée."
            });
        });
    });
});
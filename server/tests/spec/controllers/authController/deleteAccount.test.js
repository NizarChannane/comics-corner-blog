import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals";

const mockReq = {
    body: {
        userId: 123
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
    changePwd: jest.fn(),
    deleteUser: jest.fn()
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

//  deleteAccount
describe("deleteAccount", () => {

    //  checks if user exists
    describe("checks if user exists", () => {

        //  passes user info to db function
        test("passes user info to db function", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
            // expect(mockDb.getUserById.mock.calls[0][0]).toBe(mockReq.body);
        });

        //  sets response status to 400 if user doesn't exist
        test("sets response status to 400 if user doesn't exist", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockRes.status).toHaveBeenCalledTimes(1);
            // expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockRes.send).toHaveBeenCalledTimes(1);
            // expect(mockRes.send.mock.calls[0][0]).toBe({
            //     msg: ""
            // });
        });
    });

    //  deletes user
    describe("deletes user", () => {

        //  passes userId to db function
        test("passes userId to db function", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockDb.deleteUser).toHaveBeenCalledTimes(1);
            // expect(mockDb.deleteUser.mock.calls[0][0]).toBe(1);
        });

        //  sets response status to 200 if user doesn't exist
        test("sets response status to 200 if user doesn't exist", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockRes.status).toHaveBeenCalledTimes(1);
            // expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back json response
        test("sends back json response", async () => {

            await authController.deleteUser(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            // expect(mockRes.send).toHaveBeenCalledTimes(1);
            // expect(mockRes.send.mock.calls[0][0]).toBe({
            //     msg: ""
            // });
        });
    });

});
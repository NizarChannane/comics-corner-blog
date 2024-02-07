import * as authController from "../../../../controllers/authController.js";
import { jest, expect, beforeAll } from "@jest/globals";

const mockReq = {
    body: {
        username: "username",
        firstname: "firstname",
        lastname: "lastname",
        email: "fake@email.com",
        password: "sup3rs3cr3t"
    },
    param: {},
    get: jest.fn()
};

const mockRes = {
    status: jest.fn(),
    send: jest.fn()
};

const mockNext = jest.fn();

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
    validationResult: jest.fn().mockReturnValue(),
    matchedData: jest.fn()
};

const mockRole = "admin";


//  authenticate
describe("authenticate", () => {

    const dummyUser = {
        userId: 123,
        username: "username",
        role: "user"
    };
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNTE2MjM5MDIyfQ.VvlnVPAZ7j6e50xKQ9fEEMwpcFOYXYeZj-MWHj661jU";

    // beforeAll(() => {
    //     mockValidator.validationResult.mockReturnValue({ isEmpty: jest.fn() })
    // });

    beforeEach(() => {
        mockRes.status.mockReturnThis();
        mockReq.get.mockReturnValue(`Bearer ${token}`);
        mockUtils.tokensTool.decodeToken.mockResolvedValue({ userId: dummyUser.userId });
        mockDb.getUserById.mockResolvedValue(dummyUser);
    });

    //  gets token from auth header
    describe("get token from auth header", () => {

        //  sets response status to 401 if token is missing
        test("sets response status to 401 if token is missing", async () => {
            // mockReq.get.mockReturnValue("");
            const mockErrors = "some error";
            mockValidator.validationResult.mockReturnValue({ 
                isEmpty: jest.fn(() => false),
                array: jest.fn().mockReturnValue(mockErrors)
            });

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            // expect(mockReq.get).toHaveBeenCalledTimes(1);
            // expect(mockReq.get.mock.calls[0][0]).toBe("Authorization");
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(401);
        });

        //  sends back "unauthorized" json response
        test("sends back \"unauthorized\" json response", async () => {
            mockReq.get.mockReturnValue("");

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
            });
        });

        //  sets response status to 401 if header doesn't contain bearer keyword
        test("sets response status to 401 if header doesn't contain bearer keyword", async () => {
            mockReq.get.mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNTE2MjM5MDIyfQ.VvlnVPAZ7j6e50xKQ9fEEMwpcFOYXYeZj-MWHj661jU");

            await authController.authenticate(mockDb, mockUtils, mockValidator)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(401);
        });

        //  sends back json response
        test("sends back json response", async () => {
            mockReq.get.mockReturnValue("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNTE2MjM5MDIyfQ.VvlnVPAZ7j6e50xKQ9fEEMwpcFOYXYeZj-MWHj661jU");

            await authController.authenticate(mockDb, mockUtils, mockValidator)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "L'authentification a échoué. Veuillez réessayer."
            });
        });
    });


    //  decode token
    describe("decode token", () => {

        beforeEach(() => {
            mockUtils.tokensTool.decodeToken.mockResolvedValue({});
        });

        //  passes token to decoding function
        test("passes token to decoding function", async () => {
            // mockReq.get.mockResolvedValue(`Bearer ${token}`);

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockUtils.tokensTool.decodeToken).toHaveBeenCalledTimes(1);
            expect(mockUtils.tokensTool.decodeToken.mock.calls[0][0]).toBe(token);
        });

        //  sets response status to 400 if token doesn't contain userId
        test("sets response status to 400 if token doesn't contain userId", async () => {
            // mockUtils.tokensTool.decodeToken.mockResolvedValue({});

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(401);
        });

        //  sends back json response
        test("sends back json response", async () => {
            // mockUtils.tokensTool.decodeToken.mockResolvedValue({});

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
            });
        });
    });

    //  processes authorization checks
    describe("processes authorization checks", () => {

        //  passes id to db function
        test("passes id to db function", async () => {

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockDb.getUserById).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserById.mock.calls[0][0]).toBe(dummyUser.userId);
        });

        // //  checks authorization based on role
        // test("checks authorization based on role", async () => {
        //     // dummyUser.role = ""

        //     await authController.authenticate(mockDb, mockUtils, mockValidator)(mockReq, mockRes, mockNext);

        //     expect(0).toBe(1);
        // });

        //  sets response status to 401 if unauthorized user
        test("sets response status to 401 if unauthorized user", async () => {

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(401);
        });

        //  sends back unauthorized json response
        test("sends back unauthorized json response", async () => {

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Vos droits d'accèes ne permmettent pas cette action."
            });
        });

        //  passes request to next middleware if authorized
        test("passes request to next middleware if authorized", async () => {
            dummyUser.role = "admin"

            await authController.authenticate(mockDb, mockUtils, mockValidator, mockRole)(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext.mock.calls[0][0]).toBe();
        });
    });

});
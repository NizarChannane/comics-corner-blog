import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals"

const mockReq = {
    body: {
        email: "fake@email.com",
        password: "sup3rs3cr3t"
    }
};

const mockRes = {
    status: jest.fn(),
    send: jest.fn(),
    cookie: jest.fn()
};

const mockDb = {
    getUserByEmail: jest.fn(),
};

const mockUtils = {
    tokensTool: {
        createToken: jest.fn(),
        decodeToken: jest.fn()
    },
    encryptionTool: {
        hashPwd: jest.fn(),
        comparePwd: jest.fn()
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


//  signin
describe("signin function", () => {

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

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockValidator.validationResult).toHaveBeenCalledTimes(1);
            expect(mockValidator.validationResult.mock.calls[0][0]).toBe(mockReq);
        });

        //  sets response status to 400 if errors
        test("sets response status to 400 if errors", async () => {

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

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

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

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
            mockDb.getUserByEmail.mockReturnValue({
                ...mockReq.body,
                password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0."
            });

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserByEmail.mock.calls[0][0]).toBe(mockReq.body.email);
        });

        //  sets response status code to 400 if doesn't exists
        test("sets response status code to 400 if doesn't exists", async () => {
            mockDb.getUserByEmail.mockReturnValue();

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockDb.getUserByEmail.mockReturnValue();

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
            });
        });
    });


    //  compare passwords
    describe("compare passwords", () => {
        
        const dbResult = {
            email: mockReq.body.email,
            password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0."
        };

        beforeEach(() => {
            mockDb.getUserByEmail.mockReturnValue(dbResult);
        });

        //  passes hashed pwd and submitted pwd to comparison function
        test("passes hashed pwd and submitted pwd to comparison function", async () => {

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.encryptionTool.comparePwd).toHaveBeenCalledTimes(1);
            // console.log(mockReq.body.password);
            expect(mockUtils.encryptionTool.comparePwd.mock.calls[0][0]).toBe(mockReq.body.password);
            expect(mockUtils.encryptionTool.comparePwd.mock.calls[0][1]).toBe(dbResult.password);
        });

        //  sets response status to 400 if passwords don't match
        test("sets response status to 400 if passwords don't match", async () => {
            mockUtils.encryptionTool.comparePwd.mockReturnValue(false);

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockUtils.encryptionTool.comparePwd.mockReturnValue(false);

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe."
            });
        });
    });


    //  sends back user info
    describe("sends back user info", () => {
        
        const dbReturn = {
            userId: 1,
            username: "username",
            email: mockReq.body.email,
            password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0."
        };

        beforeEach(() => {
            mockDb.getUserByEmail.mockReturnValue(dbReturn);
            mockUtils.encryptionTool.comparePwd.mockReturnValue(true);
        });

        //  creates jwt
        test("creates jwt", async () => {

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.tokensTool.createToken).toHaveBeenCalledTimes(1);
            expect(mockUtils.tokensTool.createToken.mock.calls[0][0]).toStrictEqual(dbReturn.userId);
        });

        //  places token in cookie
        test("places token in cookie", async () => {
            const fakeJwt = "someFakeToken";
            mockUtils.tokensTool.createToken.mockReturnValue(fakeJwt);

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.cookie).toHaveBeenCalledTimes(1);
            expect(mockRes.cookie.mock.calls[0][0]).toBe("authToken");
            expect(mockRes.cookie.mock.calls[0][1]).toBe(`Bearer ${fakeJwt}`);
        });

        //  sets response status to 200
        test("sets response status to 200", async () => {

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockRes.status.mockReturnThis();

            await authController.signin(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({
                userId: dbReturn.userId,
                username: dbReturn.username,
                email: dbReturn.email
            });
        });

    });
});
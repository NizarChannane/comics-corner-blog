import * as authController from "../../../../controllers/authController.js";
import { jest, expect } from "@jest/globals";

const mockReq = {
    body: {
        username: "username",
        firstname: "firstname",
        lastname: "lastname",
        email: "fake@email.com",
        password: "sup3rs3cr3t"
    }
};

const mockRes = {
    status: jest.fn(),
    send: jest.fn()
};

const mockDb = {
    getUserByEmail: jest.fn(),
    createUser: jest.fn()
};

const mockUtils = {
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


//  signup
describe("signup function", () => {

    beforeEach(() => {
        // validatorResultObj.isEmpty.mockReset();
        // validatorResultObj.array.mockReset();
        // mockUtils.encryptionTool.hashPwd.mockReset();
        // mockUtils.mailingTool.sendVerificationEmail.mockReset();
        // mockDb.createUser.mockReset();
        // mockDb.getUserByEmail.mockReset();
        // mockRes.status.mockReset();
        // mockRes.send.mockReset();
        // jest.resetAllMocks();
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

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockValidator.validationResult).toHaveBeenCalledTimes(1);
            expect(mockValidator.validationResult.mock.calls[0][0]).toBe(mockReq);
        });

        //  sets response status to 400 if errors
        test("sets response status to 400 if errors", async () => {

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

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

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(validatorResultObj.isEmpty).toHaveBeenCalledTimes(1);
            expect(validatorResultObj.array).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({ errors: [errObj] });
        });

    });


    //  checks if user already exists
    describe("checks if user already exists", () => {

        //  passes email to db function
        test("passes email to db function", async () => {
            
            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockDb.getUserByEmail.mock.calls[0][0]).toBe(mockReq.body.email);
        });

        //  sets response status code to 400 if already exists
        test("sets response status code to 400 if already exists", async () => {
            mockDb.getUserByEmail.mockReturnValue(1);

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);
            
            expect(mockDb.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(400);
        });
        
        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockDb.getUserByEmail.mockReturnValue(1);
            mockRes.status.mockReturnThis();
            
            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);
            
            expect(mockDb.getUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({ msg: "Un compre est déjà associé à cette adress mail." });
        });
    });


    //  processes user data
    describe("processes user data", () => {

        beforeEach(() => {
            // jest.clearAllMocks();
            mockUtils.encryptionTool.hashPwd.mockReturnValue("$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0.");
            mockReq.body.password = "sup3rs3cr3t";
        });

        //  hashes password
        test("hashes password", async () => {
            const expectedPassword = mockReq.body.password

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.encryptionTool.hashPwd).toHaveBeenCalledTimes(1);
            expect(mockUtils.encryptionTool.hashPwd.mock.calls[0][0]).toBe(expectedPassword);
        });

        //  replaces password's value with hash
        test("replaces password's value with hash", async () => {

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockReq.body.password).toBe("$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0.");
        });
        
        //  passes user info to db function
        test("passes user info to db function", async () => {
            const processedUserData = {
                ...mockReq.body,
                password: "$2y$10$9ituCqkY4GfEw.OecDHNZuhX1dvgVSjqZv99Hc3yBPtvzv2UE8x0."
            };

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockDb.createUser).toHaveBeenCalledTimes(1);
            expect(mockDb.createUser.mock.calls[0][0]).toStrictEqual(processedUserData);
        });
    
        //  sends verification email
        test("sends verification email", async () => {

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockUtils.mailingTool.sendVerificationEmail).toHaveBeenCalledTimes(1);
            expect(mockUtils.mailingTool.sendVerificationEmail.mock.calls[0][0]).toBe(mockReq.body.email);
        });
    
        //  sets response status code to 200 when user created
        test("sets response status code to 200 when user created", async () => {

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledTimes(1);
            expect(mockRes.status.mock.calls[0][0]).toBe(200);
        });

        //  sends back proper json response
        test("sends back proper json response", async () => {
            mockDb.createUser.mockReturnValue(1);

            await authController.signup(mockDb, mockUtils, mockValidator)(mockReq, mockRes);

            expect(mockRes.send).toHaveBeenCalledTimes(1);
            expect(mockRes.send.mock.calls[0][0]).toStrictEqual({ userId: 1, msg: "Votre compte a bien été créé." });
        });
    
        //  sends back userId with jwt in cookie (for integration test ?)
    });

});
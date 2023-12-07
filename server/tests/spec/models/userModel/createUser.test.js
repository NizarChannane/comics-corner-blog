import * as userModel from "../../../../models/userModel.js";
import * as db from "../../../../config/db.config.js";
import { jest, expect } from "@jest/globals";

jest.mock("../../../../config/db.config.js");

const mockUser = {
    username: "username",
    lastName: "lastname",
    firstName: "firstname",
    email: "fake@email.com",
    password: "sup3rs3cr3t"
};

const mockUserArr = [
    mockUser.username,
    mockUser.lastName,
    mockUser.firstName,
    mockUser.email,
    mockUser.password,
    false,
    3
];

// const {username, firstname, lastaname, email, password} = mockUser;

//  createUser
describe("createUser function", () => {

    const sql = "INSERT INTO utilisateurs SET utilisateur=?, nom=?, prenom =?; email=?, mdp=?, verified=?, id_role=?";

    //  logs err if any
    test("logs err if any", async () => {
        const mockErr = new Error("createUser error");
        db.query.mockRejectedValue(mockErr);
        const log = jest.spyOn(console, "log").mockImplementation(() => {});
        
        await userModel.createUser(mockUser);
        
        // console.log(log.mock.calls);
        expect(db.query).toBeCalledTimes(1);
        expect(log).toBeCalledTimes(1);
        expect(log.mock.calls[0][0]).toBe(mockErr);
    });

    //  calls query function
    test("calls query function", async () => {

        await userModel.createUser(mockUser);

        expect(db.query).toBeCalledTimes(1);
        expect(db.query.mock.calls[0][0]).toBe(sql);
        expect(db.query.mock.calls[0][1]).toStrictEqual(mockUserArr);

    });

    //  returns db result
    test("returns db result", async () => {
        const dbQueryRes = ["user succesfully created"];
        db.query.mockResolvedValueOnce(dbQueryRes);

        const res = await userModel.createUser(mockUser)

        expect(res).toBe(dbQueryRes[0]);
    });
});
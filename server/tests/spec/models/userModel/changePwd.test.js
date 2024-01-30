import * as userModel from "../../../../models/userModel.js";
import * as db from "../../../../config/db.config.js";
import { jest, expect } from "@jest/globals";

jest.mock("../../../../config/db.config.js");

const mockData = {
    id: 123,
    password: "sup3rs3cr3t"
};

const mockDataArr = [
    "sup3rs3cr3t",
    123
];

//  changePwd
describe("changePwd", () => {

    const sql = "UPDATE utilisateurs SET password=? WHERE id=?"

    //  logs errors if any
    test("logs errors if any", async () => {
        const mockErr = new Error("changePwd error");
        db.query.mockRejectedValue(mockErr);
        const log = jest.spyOn(console, "log").mockImplementation(() => {});

        await userModel.changePwd(mockData);

        expect(db.query).toBeCalledTimes(1);
        expect(log).toBeCalledTimes(1);
        expect(log.mock.calls[0][0]).toBe(mockErr);
    });
    
    //  calls query function
    test("calls query function", async () => {

        await userModel.changePwd(mockData);

        expect(db.query).toBeCalledTimes(1);
        expect(db.query.mock.calls[0][0]).toBe(sql);
        expect(db.query.mock.calls[0][1]).toStrictEqual(mockDataArr);

    });
    
    //  returns db results
    test("returns db results", async () => {
        const dbQueryRes = ["user found"];
        db.query.mockResolvedValueOnce(dbQueryRes);

        const res = await userModel.changePwd(mockData);

        expect(res).toBe(dbQueryRes);
    });

});
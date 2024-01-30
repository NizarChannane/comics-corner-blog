import * as userModel from "../../../../models/userModel.js";
import * as db from "../../../../config/db.config.js";
import { jest, expect } from "@jest/globals";

jest.mock("../../../../config/db.config.js");

const mockId = 123;

//  verifyEmail
describe("verifyEmail", () => {

    const sql = "UPDATE utilisateurs SET verified=1 WHERE id_utilisateur=?";

    //  logs errors if any
    test("logs errors if any", async () => {
        const mockErr = new Error("verifyEmail error");
        db.query.mockRejectedValue(mockErr);
        const log = jest.spyOn(console, "log").mockImplementation(() => {});

        await userModel.verifyEmail(mockId);

        expect(db.query).toBeCalledTimes(1);
        expect(log).toBeCalledTimes(1);
        expect(log.mock.calls[0][0]).toBe(mockErr);
    });

    //  calls query function
    test("calls query function", async () => {

        await userModel.verifyEmail(mockId);

        expect(db.query).toBeCalledTimes(1);
        expect(db.query.mock.calls[0][0]).toBe(sql);
        expect(db.query.mock.calls[0][1]).toStrictEqual([mockId]);

    });

    //  returns db results
    test("returns db results", async () => {
        const dbQueryRes = ["user found"];
        db.query.mockResolvedValueOnce(dbQueryRes);

        const res = await userModel.verifyEmail([mockId]);

        expect(res).toBe(dbQueryRes);
    });

});
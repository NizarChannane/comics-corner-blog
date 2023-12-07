import jwt from "jsonwebtoken";
import * as asyncWrapper from "./asyncWrapper.js";

export const createToken = async (payload) => {
    const token = await asyncWrapper.promisify(jwt.sign)(payload, "some secret");
    return token;
};

export const decodeToken = async (token) =>  {
    try {
        const decoded = await (asyncWrapper.promisify(jwt.verify))(token, "some secret");
        return decoded;
    } catch (err) {
        return err
    };
};
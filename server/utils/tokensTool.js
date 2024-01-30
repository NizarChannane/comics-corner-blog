import jwt from "jsonwebtoken";
import * as asyncWrapper from "./asyncWrapper.js";

export const createToken = async (payload) => {
    const token = await asyncWrapper.promisify(jwt.sign)(payload, process.env.JWT_SECRET);
    return token;
};

export const decodeToken = async (token) =>  {
    try {
        const decoded = await (asyncWrapper.promisify(jwt.verify))(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return err
    };
};
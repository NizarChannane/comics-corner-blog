import dbIndex from "../models/dbIndex.js";

export const getProfile = (db) => async (req, res) => {
    try {

        const userInfo = (await db.getUserByEmail(req.user.email))[0];

        res.status(200).send({
            data: {
                username: userInfo.username,
                firstname: userInfo.prenom,
                lastname: userInfo.nom,
                email: userInfo.email,
                role: userInfo.role
            }
        });
    } catch (error) {
        console.log("error caught in getProfile controller ");
        console.log(error.message);
    };
};
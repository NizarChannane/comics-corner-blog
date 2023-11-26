import * as db from "../config/db.config";

export const createUser = async ({ username, lastName, firstName, email, password }) => {
    try {
        const newUser = [
            username,
            lastName,
            firstName,
            email,
            password,
            false,
            3
        ];

        const res = await db.query(
            "INSERT INTO utilisateurs SET utilisateur=?, nom=?, prenom =?; email=?, mdp=?, verified=?, id_role=?",
            newUser
        );
        console.log(res);

        return res[0];

    } catch (err) {
        console.log(err);
    }
};


export const getUserByEmail = async (email) => {
    try {
        const res = await db.query(
            "SELECT username, email FROM utilsateurs WHERE email=?",
            [email]
        );

        return res;
    } catch (err) {
        console.log(err);
    };

};


export const getUserById = async (id) => {
    try {
        const res = await db.query(
            "SELECT username, email FROM utilsateurs WHERE id_utilisateur=?",
            [id]
        );

        return res;
    } catch (err) {
        console.log(err);
    };
};


export const isUserVerified = async (id) => {
    try {
        const res = await db.query(
            "SELECT verified FROM utilisateurs WHERE id_utilisateur=?",
            [id]
        );

        return res;
    } catch (err) {
        console.log(err);
    };
};


export const verifyEmail = async (id) => {
    try {
        const res = await db.query(
            "UPDATE utilisateurs SET verified=1 WHERE id_utilisateur=?",
            [id]
        );

        return res;
    } catch (err) {
        console.log(err);
    };
};


export const changePwd = async ({id, password}) => {
    try {
        const res = await db.query(
            "UPDATE utilisateurs SET password=? WHERE id=?",
            [password, id]
        );

        return res;
    } catch (err) {
        console.log(err);
    };
};


// export const updateUser = async () => {
//     try {
//         const res = await db.query();
//     } catch (err) {
//         console.log(err);
//     };
// };


export const deleteUser = async (id) => {
    try {
        const res = await db.query(
            "DELETE FROM utilisateurs WHERE id_utilisateur=?",
            [id]
        );

        return res;
    } catch (err) {
        console.log(err);
    };
};
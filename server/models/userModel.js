import * as db from "../config/db.config.js";

export const createUser = async ({ username, lastName, firstName, email, password }) => {
    try {
        const newUser = [
            username,
            lastName,
            firstName,
            email,
            password,
            false,
            "user"
        ];

        const [rows, fields] = await db.query(
            "INSERT INTO utilisateurs SET username=?, nom=?, prenom =?, email=?, mdp=?, verified=?, role=?",
            newUser
        );

        return rows;

    } catch (err) {
        console.log(err);
        throw err;
    }
};


export const getUserByEmail = async (email) => {
    try {
        const [rows, fields] = await db.query(
            "SELECT * FROM utilisateurs WHERE email=?",
            [email]
        );

        return rows;

    } catch (err) {
        console.log(err);
        throw err;
    };

};


export const getUserById = async (id) => {
    try {
        const [rows, fields] = await db.query(
            "SELECT userId, username, email, role FROM utilisateurs WHERE userId=?",
            [id]
        );

        return rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    };
};


export const isUserVerified = async (id) => {
    try {
        const [rows, fields] = await db.query(
            "SELECT verified FROM utilisateurs WHERE userId=?",
            [id]
        );

        return rows[0];
    } catch (err) {
        console.log(err);
        throw err;
    };
};


export const verifyEmail = async (id) => {
    try {
        const [rows, fields] = await db.query(
            "UPDATE utilisateurs SET verified=1 WHERE userId=?",
            [id]
        );

        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    };
};


export const changePwd = async (id, password) => {
    try {
        const [rows, fields] = await db.query(
            "UPDATE utilisateurs SET mdp=? WHERE userId=?",
            [password, id]
        );

        return rows;
    } catch (err) {
        console.log(err);
        throw err;
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
        const [rows, fields] = await db.query(
            "DELETE FROM utilisateurs WHERE userId=?",
            [id]
        );

        return [rows, fields];
    } catch (err) {
        console.log(err);
        throw err;
    };
};
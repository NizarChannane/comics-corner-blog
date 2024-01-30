import mysql from "mysql2/promise";

const config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DATABASE,
};

export const query = async (sql, params) => {
    const connection = await mysql.createConnection(config);
    console.log("connected to database");
    const [rows, fields] = await connection.execute(sql, params);
    await connection.end();
    console.log("disconnected from database");

    return [rows, fields];
};

// export const initDb = async () => {

// };
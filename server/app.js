import express from "express";

const createApp = (db) => {
    const app = express();

    app.use(express.json());

    return app;
};

export default createApp;
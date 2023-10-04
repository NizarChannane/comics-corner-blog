import express from "express";
import getAuthRouter from "./routes/authRouter.js"

const createApp = (db) => {
    const app = express();

    app.use(express.json());

    app.use("/auth", getAuthRouter(db));

    return app;
};

export default createApp;
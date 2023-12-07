import express from "express";
import router from "./routes/routerIndex.js";
import cookieParser from "cookie-parser";

const createApp = () => {
    const app = express();

    app.use(express.json());
    app.use(cookieParser("cookieSecret"));

    app.use(router);

    return app;
};

export default createApp;
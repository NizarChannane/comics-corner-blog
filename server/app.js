import express from "express";
import cors from "cors";
import router from "./routes/routerIndex.js";
import cookieParser from "cookie-parser";

const createApp = () => {
    const app = express();

    // app.use(cors())

    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cookieParser("cookieSecret"));

    // app.use("/api", router);
    app.use(router);

    return app;
};

export default createApp;
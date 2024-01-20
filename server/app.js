import express from "express";
import path from "path";
import cors from "cors";
import router from "./routes/routerIndex.js";
import cookieParser from "cookie-parser";

const createApp = () => {
    const app = express();

    // app.use(cors())

    app.disable("x-powered-by");
    app.use(express.json());
    app.use(cookieParser(process.env.COOKIE_SECRET));

    app.use("/api", router);
    // app.use(router);
    
    if (process.env.Node_ENV === "production") {
        const __dirname = path.resolve();
        app.use(express.static(path.join(__dirname, "client/dist")));

        app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "dist", "index.html")));
    } else {
        app.get("/", (req, res) => res.send("Server is ready"));
    };

    return app;
};

export default createApp;
import express from "express";
import * as authController from "../controllers/authController.js"

const getAuthRouter = (db) => {
    console.log("from the router file " + db);

    const router = express.Router();
    
    router.post("/auth/signup", authController.signup(db, utils, validator));
    
    router.post("/auth/signin", (req, res) => {
        
    });
    
    router.post("/auth/verify-email", (req, res) => {
    
    });
    
    router.post("/auth/authenticate", (req, res) => {
    
    });
    
    router.post("/auth/send-reset-email", (req, res) => {
    
    });
    
    router.put("/auth/reset-pwd", (req, res) => {
    
    });
    
    router.delete("/auth/delete-user", (req, res) => {
    
    });
    
    return router;

};

export default getAuthRouter;
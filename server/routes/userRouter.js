import express from "express";
import * as userController from "../controllers/userController.js";
import * as validationSchemas from "../utils/validationSchemas.js";
import { authenticate } from "../controllers/authController.js";
import dbIndex from "../models/dbIndex.js";
import utils from "../utils/utilsIndex.js";
import { matchedData, validationResult } from "express-validator";

const db = dbIndex.getUserDb();
const authDb = dbIndex.getAuthDb();
const validator = { matchedData, validationResult };

const router = express.Router();

router.get(
    "/get-profile",
    validationSchemas.authenticateSchema,
    authenticate(authDb.authenticate, utils, validator, "user"), 
    userController.getProfile(db.getProfile, utils)
);

export default router;
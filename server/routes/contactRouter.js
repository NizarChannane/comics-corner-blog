import express from "express";
import * as contactController from "../controllers/contactController.js";
import * as validationSchemas from "../utils/validationSchemas.js";
import utils from "../utils/utilsIndex.js";
import { matchedData, validationResult } from "express-validator";

const validator = { matchedData, validationResult };

const router = express.Router();

router.post(
    "/send-message",
    validationSchemas.contactSchema,
    contactController.sendMessage(utils, validator)
);

export default router;
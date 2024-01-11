import express from "express";
import * as authController from "../controllers/authController.js";
import * as validationSchemas from "../utils/validationSchemas.js";
import dbIndex from "../models/dbIndex.js";
import utils from "../utils/utilsIndex.js";
import { matchedData, validationResult } from "express-validator";

const db = dbIndex.getAuthDb();
const validator = { matchedData, validationResult };

const router = express.Router();

router.post(
    "/signup",
    validationSchemas.signupSchema,
    authController.signup(db.signup, utils, validator)
);

router.post(
    "/signin",
    validationSchemas.signinSchema,
    authController.signin(db.signin, utils, validator)
);

router.get(
    "/get-auth-status",
    validationSchemas.authenticateSchema,
    authController.authenticate(db.authenticate, utils, validator, "user"),
    authController.getAuthStatus
);

router.get(
    "/signout",
    validationSchemas.authenticateSchema,
    authController.authenticate(db.authenticate, utils, validator, "user"),
    authController.signout
);

router.get(
    "/verify-email",
    validationSchemas.verifyEmailSchema,
    authController.verifyEmail(db.verifyEmail, utils, validator),
);

router.post(
    "/send-reset-email",
    validationSchemas.sendPwdResetSchema,
    authController.sendResetEmail(db.sendResetEmail, utils, validator)
);

router.put(
    "/reset-pwd",
    validationSchemas.passwordResetSchema,
    authController.resetPwd(db.resetPwd, utils, validator)
);

router.put(
    "/update-pwd",
    validationSchemas.authenticateSchema,
    validationSchemas.updatePasswordSchema,
    authController.authenticate(db.authenticate, utils, validator, "user"),
    authController.updatePwd(db.updatePwd, utils, validator)
    );

router.post(
    "/delete-account",
    validationSchemas.authenticateSchema,
    validationSchemas.deleteAccountSchema,
    authController.authenticate(db.authenticate, utils, validator, "user"),
    authController.deleteAccount(db.deleteAccount, utils, validator)
);

router.delete(
    "/confirm-delete-account",
    validationSchemas.authenticateSchema,
    authController.authenticate(db.authenticate, utils, validator, "user"),
    authController.confirmDeleteAccount(db.confirmDeleteAccount, utils, validator)
);



export default router;
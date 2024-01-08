import { body, header, query, cookie, check } from "express-validator";

export const signupSchema = [
    body("username", "Le nom d'utilisateur n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un nom d'utilisateur")
        .escape()
        .isLength({ min: 2, max: 35 })
            .withMessage("Le nom d'utilisateur doit contenir entre 2 et 35 caractères"),
    body("lastname", "Le champ nom n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un nom")
        .escape()
        .isLength({ min: 2, max: 35 })
            .withMessage("Le nom doit contenir entre 2 et 35 caractères"),
    body("firstname", "Le champ prénom n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un prénom")
        .escape()
        .isLength({ min: 2, max: 35 })
            .withMessage("Le prénom doit contenir entre 2 et 35 caractères"),
    body("email", "Le champ email n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir une adresse email")
        .escape()
        .isEmail()
            .withMessage("Doit contenir une adresse email valide"),
        // .normalizeEmail()
    body("password", "Le mot de passe ne remplit pas les conditions")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un mot de passe")
        .escape()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un sumbole")
];

export const signinSchema = [
    body("email", "Le champ email n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir une adresse email")
        .escape()
        .isEmail()
            .withMessage("Doit contenir une adresse email valide"),
        // .normalizeEmail(),
    body("password", "Le mot de passe ne remplit pas les conditions")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un mot de passe")
        .escape()
];

export const authenticateSchema = [
    header("cookie")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Aucun cookie d'authentification n'a été trouvé")
        .custom(async (value, { req, location, path }) => {
            req.cookies = req.signedCookies
            await cookie("ccAuthCookie")
                .trim()
                .notEmpty()
                    .bail()
                    .withMessage("Aucun jeton d'authentification n'a été trouvé")
                .escape()
                .isJWT()
                    .bail()
                    .withMessage("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer.")
                .run(req);
        })
];

export const verifyEmailSchema = [
    query("token")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer.")
        .escape()
        .isJWT()
            .bail()
            .withMessage("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer.")
];

export const sendPwdResetSchema = [
    body("email", "Le champ email n'est pas valide")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir une adresse email")
        .escape()
        .isEmail()
            .withMessage("Doit contenir une adresse email valide"),
        // .normalizeEmail(),
];

export const passwordResetSchema = [
    query("token")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer.")
        .escape()
        .isJWT()
            .bail()
            .withMessage("Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."),
    body("password", "Le mot de passe ne remplit pas les conditions")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un mot de passe")
        .escape()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un sumbole")
];

export const updatePasswordSchema = [
    body(["oldPassword", "newPassword"], "Le mot de passe ne remplit pas les conditions")
        .trim()
        .notEmpty()
            .bail()
            .withMessage("Champ obligatoire, doit contenir un mot de passe")
        .escape()
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        }).withMessage("Le mot de passe doit contenir au moins 8 caractères, dont au moins une majuscule, une minuscule, un chiffre et un sumbole")
];
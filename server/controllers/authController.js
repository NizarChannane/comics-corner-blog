export const signup = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };

    const userExists = db.getUserByEmail(req.body.email);

    if(userExists) {
        res.status(400).send({
            msg: "Un compre est déjà associé à cette adress mail."
        });
        return;
    };

    const hashedPwd = await utils.encryptionTool.hashPwd(req.body.password);
    req.body.password = hashedPwd;

    const userData = {...req.body};

    const dbResult = await db.createUser(userData);

    await utils.mailingTool.sendVerificationEmail(userData.email);

    res.status(200).send({
        userId: dbResult,
        msg: "Votre compte a bien été créé."
    });
    return;

};


export const signin = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };

    const userInfo = await db.getUserByEmail(req.body.email);

    if(!userInfo) {
        res.status(400).send({
            msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
        });
        return;
    };

    const pwdMatch = await utils.encryptionTool.comparePwd(req.body.password, userInfo.password);

    if(!pwdMatch) {
        res.status(400).send({
            msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe."
        });
        return;
    };

    const token = await utils.tokensTool.createToken(userInfo.userId);

    res.cookie("authToken", `Bearer ${token}`);

    res.status(200).send({
        userId: userInfo.userId,
        username: userInfo.username,
        email: userInfo.email
    });
    return;

};


export const verifyEmail = (db, utils, validator) => async (req, res) => {
    const { token } = req.param;

    if(!token) {
        res.status(400).send({
            msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
        });
        return;
    };

    const decodedToken = await utils.tokensTool.decodeToken(token);

    if(!decodedToken.userId) {
        res.status(400).send({
            msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
        })
        return;
    };

    const userInfo = await db.getUserById(decodedToken.userId);

    if(userInfo.verified) {
        res.status(400).send({
            msg: "Cette adresse mail a déjà été vérifiée. Vous pouvez vous connecter normalement."
        });
        return;
    };

    await db.verifyEmail(userInfo.userId);

    res.status(200).send({
        msg: "L'adresse email a bien été vérifiée. Vous pouvez vous connecter."
    });
    return;

};


export const authenticate = (db, utils, validator, role) => async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if(!authHeader) {
        res.status(401).send({
            msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
        });
        return;
    };

    const headerArray = authHeader.split(" ");

    if(headerArray[0] !== "Bearer") {
        res.status(401).send({
            msg: "L'authentification a échoué. Veuillez réessayer."
        });
        return;
    };

    const decodedToken = await utils.tokensTool.decodeToken(headerArray[1]);

    if(!decodedToken.userId) {
        res.status(401).send({
            msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
        });
        return;
    };

    const userInfo = await db.getUserById(decodedToken.userId);

    switch (role) {
        case "user":
            if(userInfo.role !== "user" || userInfo !== "writer" || userInfo !== "admin") {
                res.status(401).send({ msg: "Vos droits d'accèes ne permmettent pas cette action." })
                return;
            };
            break;

        case "writer":
            if(userInfo.role !== "writer" || userInfo !== "admin") {
                res.status(401).send({ msg: "Vos droits d'accèes ne permmettent pas cette action." })
                return;
            };
            break;

        case "admin":
            if(userInfo.role !== "admin") {
                res.status(401).send({ msg: "Vos droits d'accèes ne permmettent pas cette action." })
                return;
            };
            break;

        default:
            res.status(401).send({ msg: "Vos droits d'accèes ne permmettent pas cette action." })
            break;
    };

    next();
    // return;

};


export const sendResetEmail = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };

    const userInfo = await db.getUserByEmail(req.body.email);

    if(!userInfo) {
        res.status(400).send({
            msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
        });
        return;
    };

    const resetToken = await utils.tokensTool.createToken(userInfo.userId);

    await utils.mailingTool.sendResetEmail(userInfo.email, resetToken);

    res.status(200).send({
        msg: "L'adresse email a bien été vérifiée."
    });
    return;

};


export const resetPwd = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };

    const { resetToken } = req.cookies;

    if(!resetToken) {
        res.status(400).send({
            msg: "Il semblerait que votre lien a expiré. Veuillez réessayer."
        });
        return;
    };

    const decodedToken = await utils.tokensTool.decodeToken(resetToken);

    if(!decodedToken.userId) {
        res.status(400).send({
            msg: "Il semblerait que le serveur n'arrive pas à vous authentifier. Veuillez recommencer la procédure."
        });
        return;
    };

    const userInfo = await db.getUserById(decodedToken.userId);

    if(!userInfo) {
        res.status(400).send({
            msg: "Il semblerait que ce compte n'existe pas. Veuillez vous inscrire."
        })
        return;
    };

    const hashedPwd = await utils.encryptionTool.hashPwd(userInfo.password);

    await db.changePwd(userInfo.userId, hashedPwd);

    res.status(200).send({
        msg: "Le mot de passe a bien été modifié. Vous pouvez vous connecter en utilisant le nouveau mot de passe."
    });
    return;

};


export const deleteAccount = (db, utils, validator) => async (req, res) => {
    
};
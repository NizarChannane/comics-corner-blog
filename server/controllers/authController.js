export const signup = (db, utils, validator) => async (req, res) => {
    try {
        console.log("request received");
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        const userExists = await db.getUserByEmail(data.email);

        if(userExists.length) {
            res.status(400).send({
                msg: "Un compte est déjà associé à cette adresse email."
            });
            return;
        };

        const hashedPwd = await utils.encryptionTool.hashPwd(data.password);
        data.password = hashedPwd;

        const dbResult = await db.createUser(data);

        const token = await utils.tokensTool.createToken({ userId: dbResult.insertId });

        await utils.mailingTool.sendVerificationEmail(data.email, token);

        res.status(200).send({
            userId: dbResult.insertId,
            msg: "Votre compte a bien été créé. Veuillez cliquer sur le lien se trouvant dans le mail de vérification qui vous a été envoyé.",
            //  NOT FOR PRODUCTION
            // token: token
        });
        return;

    } catch (error) {
        console.log("error caught in signup controller ");
        console.log(error.message);
    };

};


export const signin = (db, utils, validator) => async (req, res) => {
    try {
        console.log("request received");
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        const userInfo = (await db.getUserByEmail(data.email))[0];

        if(!userInfo) {
            res.status(400).send({
                msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
            });
            return;
        };

        const pwdMatch = await utils.encryptionTool.comparePwd(data.password, userInfo.mdp);

        if(!pwdMatch) {
            res.status(400).send({
                msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe."
            });
            return;
        };

        if(!userInfo.verified) {
            res.status(400).send({
                msg: "Il semblerait que votre adresse ne soit pas encore vérifiée, veuillez consulter le mail qui vous a été envoyé lors de la création de votre compte"
            });
            return;
        };

        const token = await utils.tokensTool.createToken({ userId: userInfo.userId });

        res.cookie("ccAuthCookie", token, { httpOnly: true, signed: true });

        res.status(200).send({
            data: {
                userId: userInfo.userId,
                username: userInfo.username,
                role: userInfo.role,
            },
            msg: "Vous êtes connecté. Vous pouvez accéder à votre profil utilisateur."
        });
        return;

    } catch (error) {
        console.log("error caught in signin controller ");
        console.log(error.message);
    };

};


export const getAuthStatus = async (req, res) => {
    try {
        res.status(200).send({
            ...req.user
        });
    } catch (error) {
        console.log("error caught in getAuthStatus controller ");
        console.log(error.message);
    }
};


export const signout = async (req, res) => {
    try {
        res.clearCookie("ccAuthCookie").status(200).send({
            msg: "Vous avez bien été déconnecté."
        });
    } catch (error) {
        console.log("error caught in signout controller ");
        console.log(error.message);
    }
};


export const verifyEmail = (db, utils, validator) => async (req, res) => {
    try {
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const { token } = validator.matchedData(req);

        if(!token) {
            res.status(400).send({
                msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
            });
            return;
        };

        const decodedToken = await utils.tokensTool.decodeToken(token);
        
        if(decodedToken.message === "invalid token" || !decodedToken.userId) {
            res.status(400).send({
                msg: "Il semblerait que le lien soit incorrect ou corrompu. Veuillez rééssayer."
            });
            return;
        };

        const isEmailVerified = (await db.isUserVerified(decodedToken.userId))?.verified;

        if(isEmailVerified === undefined) {
            res.status(400).send({
                msg: "Il semblerait que ce compte n'existe pas ou a été supprimé."
            });
            return;
        };

        if(isEmailVerified) {
            res.status(400).send({
                msg: "Cette adresse mail a déjà été vérifiée. Vous pouvez vous connecter normalement."
            });
            return;
        };

        await db.verifyEmail(decodedToken.userId);

        res.status(200).send({
            msg: "L'adresse email a bien été vérifiée. Vous pouvez vous connecter."
        });
        return;

    } catch (error) {
        console.log("error caught in verifyEmail controller ");
        console.log(error.message);
    };

};


export const authenticate = (db, utils, validator, role) => async (req, res, next) => {
    try {
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const token = (validator.matchedData(req)).ccAuthCookie;

        if(!token) {
            res.status(401).send({
                msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
            });
            return;
        };

        const decodedToken = await utils.tokensTool.decodeToken(token);

        if(!decodedToken.userId) {
            res.status(401).send({
                msg: "Vous n'étes pas autorisé à accéder à cette ressource. Veuillez vous connecter."
            });
            return;
        };

        const userInfo = await db.getUserById(decodedToken.userId);

        switch (role) {
            case "user":
                if(userInfo.role !== "user" && userInfo.role !== "writer" && userInfo.role !== "admin") {
                    res.status(401).send({ msg: "Vos droits d'accèes ne permmettent pas cette action." })
                    return;
                };
                break;

            case "writer":
                if(userInfo.role !== "writer" && userInfo.role !== "admin") {
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

        req.user = { ...userInfo };
        next();
        // return;

    } catch (error) {
        console.log("error caught in authenticate controller ");
        console.log(error.message);
    };

};


export const sendResetEmail = (db, utils, validator) => async (req, res) => {
    try {
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        const userInfo = (await db.getUserByEmail(data.email))[0];

        if(!userInfo) {
            res.status(400).send({
                msg: "Aucun compte n'est associé à cette adresse mail. Veuillez vous inscire."
            });
            return;
        };

        const resetToken = await utils.tokensTool.createToken({ userId: userInfo.userId });

        await utils.mailingTool.sendResetEmail(userInfo.email, resetToken);

        res.status(200).send({
            msg: "Un lien de réinitialisation a été envoyé sur votre adresse mail."
        });
        return;

    } catch (error) {
        console.log("error caught in sendResetEmail controller ");
        console.log(error.message);
    };

};


export const resetPwd = (db, utils, validator) => async (req, res) => {
    try {
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        if(!data.token) {
            res.status(400).send({
                msg: "Il semblerait que votre lien a expiré. Veuillez réessayer."
            });
            return;
        };

        const decodedToken = await utils.tokensTool.decodeToken(data.token);

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

        const hashedPwd = await utils.encryptionTool.hashPwd(data.password);

        await db.changePwd(userInfo.userId, hashedPwd);

        res.status(200).send({
            msg: "Le mot de passe a bien été modifié. Vous pouvez vous connecter en utilisant le nouveau mot de passe."
        });
        return;

    } catch (error) {
        console.log("error caught in resetPwd controller ");
        console.log(error.message);
    };

};


export const updatePwd = (db, utils, validator) => async (req, res) => {
    try {
        const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        const userInfo = (await db.getUserByEmail(req.user.email))[0];

        const pwdMatch = await utils.encryptionTool.comparePwd(data.oldPassword, userInfo.mdp);

        if(!pwdMatch) {
            res.status(400).send({
                msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe depuis la page de connexion."
            });
            return;
        };

        const hashedPwd = await utils.encryptionTool.hashPwd(data.newPassword);

        await db.changePwd(userInfo.userId, hashedPwd);

        res.status(200).send({
            msg: "Le mot de passe a bien été modifié. Vous pouvez vous connecter en utilisant le nouveau mot de passe."
        });
        return;
    } catch (error) {
        console.log("error caught in updatePwd controller ");
        console.log(error.message);
    };
};


export const deleteAccount = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

        if(!validationErrors.isEmpty()) {
            const errors = validationErrors.array();
            res.status(400).send({ errors });
            return;
        };

        const data = validator.matchedData(req);

        const userInfo = (await db.getUserByEmail(req.user.email))[0];

        const pwdMatch = await utils.encryptionTool.comparePwd(data.password, userInfo.mdp);

        if(!pwdMatch) {
            res.status(400).send({
                msg: "Le mot de passe soumit n'est pas correct. Veuillez réessayer ou réinitialiser le mot de passe depuis la page de connexion."
            });
            return;
        };

        res.status(200).send({
            data: {
                allowDelete: true
            }
        });
};


export const confirmDeleteAccount = (db, utils, validator) => async (req, res) => {
    await db.deleteUser(req.user.userId);

    res.clearCookie("ccAuthCookie").status(200).send({
        msg: "Votre compte a bien été supprimé",
        data: {
            accDeleted: true
        }
    });
};
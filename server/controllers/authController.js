export const signup = (db, utils, validator) => async (req, res) => {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };
    
    const userExists = db.getUserByEmail(req.body.email);
    
    if(userExists) {
        res.status(400).send({ msg: "Un compre est déjà associé à cette adress mail." });
        return;
    };
    
    const hashedPwd = await utils.encryptionTool.hashPwd(req.body.password);
    req.body.password = hashedPwd;
    
    const userData = {...req.body};

    const dbResult = await db.createUser(userData);

    await utils.mailingTool.sendVerificationEmail(userData.email);

    return res.status(200).send({ userId: dbResult, msg: "Votre compte a bien été créé." });

};
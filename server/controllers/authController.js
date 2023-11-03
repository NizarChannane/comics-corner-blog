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

    res.status(200).send({ userId: dbResult, msg: "Votre compte a bien été créé." });
    return;

};

export const signin = (db, utils, validator) => async (req, res) => {

};

export const verifyEmail = (db, utils, validator) => async (req, res) => {

};

export const authenticate = (db, utils, validator, role) => async (req, res, next) => {

};

export const sendResetEmail = (db, utils, validator) => async (req, res) => {

};

export const resetPwd = (db, utils, validator) => async (req, res) => {

};

export const deleteUser = (db, utils, validator) => async (req, res) => {

};
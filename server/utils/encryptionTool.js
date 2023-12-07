import bcrypt from "bcrypt";

export const hashPwd = async (pwd) => {
    const hash = await bcrypt.hash(pwd, 10);
    console.log(hash);
    return hash;
};

export const comparePwd = async (rawPwd, hashedPwd) => {
    const match = await bcrypt.compare(rawPwd, hashedPwd);
    return match;
};
export const sendVerificationEmail = async (token) => {
    try {
        console.log(token);
        return "Verification email succesfully sent";
    } catch (err) {
        console.log(err);
    };
};

export const sendResetEmail = async (token, mail) => {
    try {
        console.log(token);
        console.log(mail);
        return "Password reset email succesfully sent";
    } catch (err) {
        console.log(err);
    };
};
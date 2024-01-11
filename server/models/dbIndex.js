import * as userModel from "./userModel.js";

const getAuthDb = () => {

    return {
        signup: {
            createUser: userModel.createUser,
            getUserByEmail: userModel.getUserByEmail,
        },
        signin: {
            getUserByEmail: userModel.getUserByEmail
        },
        verifyEmail: {
            getUserById: userModel.getUserById,
            verifyEmail: userModel.verifyEmail,
            isUserVerified: userModel.isUserVerified
        },
        sendResetEmail: {
            getUserByEmail: userModel.getUserByEmail
        },
        resetPwd: {
            getUserByEmail: userModel.getUserByEmail,
            getUserById: userModel.getUserById,
            changePwd: userModel.changePwd
        },
        updatePwd: {
            getUserByEmail: userModel.getUserByEmail,
            getUserById: userModel.getUserById,
            changePwd: userModel.changePwd
        },
        authenticate: {
            getUserById: userModel.getUserById
        },
        deleteAccount: {
            getUserByEmail: userModel.getUserByEmail,
        },
        confirmDeleteAccount: {
            deleteUser: userModel.deleteUser
        },
        tests: {
            createUser: userModel.createUser,
            getUserByEmail: userModel.getUserByEmail,
            deleteUser: userModel.deleteUser,
            verifyEmail: userModel.verifyEmail
        }
    };
};

export default { getAuthDb };
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_ACC,
        pass: process.env.EMAIL_PWD
    }
});

export const sendVerificationEmail = async (email, token) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ACC,
            to: email,
            subject: "Vérification de l'adresse email.",
            html: `
                <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <title>Verification Email</title>
                            <style>
                                .container {
                                    text-align: center;
                                    padding: 2rem;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Bienvenue sur Comics Corner</h1>
                                <p>Afin de valider votre inscription, veuillez cliquer sur le lien ci-desous: </p>
                                <a href="http://localhost:5173/email-verification?token=${token}">Valider mon compte</a>
                            </div>
                            
                        </body>
                    </html>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err;
            } else {
                console.log("Email sent: " + info.response);
            }
        });

        return;
    } catch (err) {
        console.log(err);
    };
};

export const sendResetEmail = async (email, token) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_ACC,
            to: email,
            subject: "Réinitialisation de mot de passe",
            html: `
                <!DOCTYPE html>
                    <html>
                        <head>
                            <meta charset="utf-8">
                            <title>Réinitialisation de mot de passe</title>
                            <style>
                                .container {
                                    text-align: center;
                                    padding: 2rem;
                                }
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Réinitialisation de mot de passe</h1>
                                <p>Afin de réinitialiser votre mot de passe, veuillez cliquer sur le lien ci-desous: </p>
                                <a href="http://localhost:5173/password-reset?token=${token}">Réinitialisation le mot de passe</a>
                            </div>
                            
                        </body>
                    </html>
            `
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                throw err;
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        return;
    } catch (err) {
        console.log(err);
    };
};

export const maskEmail = (email) => {
    const maskedMailArr = [];
    const [name, rest] = email.split("@");
    const [server, domain] = rest.split(".");
    const nameArr = name.split("");
    const serverArr = server.split("");
    const nameLength = nameArr.length;
    const serverLength = serverArr.length;

    if (nameLength <= 3) {
        maskedMailArr.push("***");
    } else {
        nameArr.forEach((item, index) => {
            if (index >= 1 && index <= nameLength - 2) {
                maskedMailArr.push("*");
            } else {
                maskedMailArr.push(item);
            };
        });
    };

    maskedMailArr.push("@");

    if (serverLength <= 3) {
        maskedMailArr.push("***");
    } else {
        serverArr.forEach((item, index) => {
            if (index >= 1 && index <= serverLength - 2) {
                maskedMailArr.push("*");
            } else {
                maskedMailArr.push(item);
            };
        });
    };

    maskedMailArr.push("." + domain);

    const maskedEmail = maskedMailArr.join("");

    return maskedEmail;
};
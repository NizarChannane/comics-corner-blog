export const sendMessage = (utils, validator) => async (req, res) => {
try {
    const validationErrors = validator.validationResult(req);

    if(!validationErrors.isEmpty()) {
        const errors = validationErrors.array();
        res.status(400).send({ errors });
        return;
    };

    const data = validator.matchedData(req);

    const { lastname, firstname, email, message } = data;

    console.log(data);
    await utils.mailingTool.sendContactForm(lastname, firstname, email, message);

    res.status(200).send({
        msg: "Votre message a bien été envoyé. Nous essaierons de vous répondre dans les plus bref délais.",
    });
    return;
} catch (error) {
    console.log("error caught in sendMessage controller ");
    console.log(error.message);
}
};
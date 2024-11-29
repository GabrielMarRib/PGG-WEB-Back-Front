const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const sendEmail = async () => {

    const mailerSend = new MailerSend({
        apiKey: "mlsn.38485878fc716d9d01adeda586fa2e52172209e25d8834793cdb1edce87a15ef",
    });

    const sentFrom = new Sender("rigeltechtcc@gmail.com", "rigel tech");

    const recipients = [
        new Recipient("acessofull92@gmail.com", "Your Client")
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml("<strong>This is the HTML content</strong>")
        .setText("This is the text content");

    try {
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = {sendEmail};

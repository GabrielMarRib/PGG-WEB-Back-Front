const { MailerSend, EmailParams, Sender, Recipient } = require("mailersend");
const sendEmail = async (msg) => {

    const mailerSend = new MailerSend({
        apiKey: "mlsn.650ebd62a782cc156bf73a4a22f4113a12b02f5c721068adefd4aaafdaee6285",
    });

    const sentFrom = new Sender("MS_9bL20A@trial-z86org8vq51lew13.mlsender.net", "smtp.mailersend.net");

    const recipients = [
        new Recipient("acessofull92@gmail.com", "Your Client")
    ];

    const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo(sentFrom)
        .setSubject("This is a Subject")
        .setHtml(`<strong>${msg}</strong>`)
        .setText("This is the text content");

    try {
        await mailerSend.email.send(emailParams);
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

module.exports = {sendEmail};

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

export const sendEmail = async ({ to, subject, text, html }) => {
    await transporter.sendMail({
        from: `"Robonity RoboShare" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });
};

export default transporter;

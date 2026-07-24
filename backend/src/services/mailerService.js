import nodemailer from 'nodemailer';

let transporter;

const getTransporter = () => {
    if (!transporter) {
        transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });
    }
    return transporter;
};

export const sendEmail = async ({ to, subject, text, html }) => {
    await getTransporter().sendMail({
        from: `"Robonity RoboShare" <${process.env.GMAIL_USER}>`,
        to,
        subject,
        text,
        html,
    });
};

export default getTransporter;

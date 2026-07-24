import sgMail from '@sendgrid/mail';

let initialized = false;

const getClient = () => {
    if (!initialized) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        initialized = true;
    }
    return sgMail;
};

export const sendEmail = async ({ to, subject, text, html }) => {
    await getClient().send({
        from: { email: process.env.GMAIL_USER, name: 'Robonity RoboShare' },
        to,
        subject,
        text,
        html,
    });
};

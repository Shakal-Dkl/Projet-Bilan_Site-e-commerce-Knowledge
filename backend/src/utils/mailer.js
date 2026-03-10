const nodemailer = require('nodemailer');

async function sendActivationEmail({ to, activationLink }) {
  // EN: Always print activation link for demo/testing visibility.
  // FR: Affiche toujours le lien d'activation pour la démo et les tests.
  console.log(`Activation link for ${to}: ${activationLink}`);

  // EN: Beginner-friendly fallback mailer that prints the activation link.
  // FR: Version débutant : si aucun SMTP n'est configuré, on affiche le lien dans la console.
  if (!process.env.SMTP_HOST) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@knowledge-learning.local',
    to,
    subject: 'Activate your account / Activez votre compte',
    text: `Click here / Cliquez ici: ${activationLink}`
  });
}

module.exports = { sendActivationEmail };

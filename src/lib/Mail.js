import 'dotenv/config';
import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { resolve } from 'path';

import mailConfig from '../config/mail';

const transporter = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
);

function configureTemplates() {
  const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

  transporter.use(
    'compile',
    nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs',
      }),
      viewPath,
      extName: '.hbs',
    })
  );
}

export default async function sendForgotPassword(name, email, tokenTemp) {
  await configureTemplates();

  transporter
    .sendMail({
      to: `${name} <${email}>`,
      from: mailConfig.default.from,
      subject: 'Esqueci minha senha',
      template: 'forgotPassword',
      context: {
        user: name,
        tokenTemp,
        email,
      },
    })
    .then(() => {
      console.log('E-mail enviado');
    })
    .catch(() => {
      console.log('E-mail não enviado');
    });
}

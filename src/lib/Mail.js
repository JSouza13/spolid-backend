import 'dotenv/config';
import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { resolve } from 'path';

import mailConfig from '../config/mail';

const transporte = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: mailConfig.auth.api_key,
  })
);

function configureTemplates() {
  const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

  transporte.use(
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

export async function sendForgotPassword(name, email, tokenTemp) {
  await configureTemplates();

  transporte
    .sendMail({
      from: mailConfig.default.from,
      to: `${name} <${email}>`,
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

export async function sendWelcome(name, email) {
  await configureTemplates();

  transporte
    .sendMail({
      from: mailConfig.default.from,
      to: `${name} <${email}>`,
      subject: 'Esqueci minha senha',
      template: 'welcome',
      context: {
        user: name,
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

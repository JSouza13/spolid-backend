import 'dotenv/config';
import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { resolve } from 'path';

import mailConfig from '../config/mail';

const transporte = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
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
    .then(([res]) => {
      console.log(
        'Message delivered with code %s %s',
        res.statusCode,
        res.statusMessage
      );
    })
    .catch((err) => {
      console.log('Errors occurred, failed to deliver message');

      if (err.response && err.response.body && err.response.body.errors) {
        err.response.body.errors.forEach((error) =>
          console.log('%s: %s', error.field, error.message)
        );
      } else {
        console.log(err);
      }
    });
}

export async function sendWelcome(name, email) {
  await configureTemplates();

  transporte
    .sendMail({
      from: mailConfig.default.from,
      to: `${name} <${email}>`,
      subject: 'Bem-vindo',
      template: 'welcome',
      context: {
        user: name,
        email,
      },
    })
    .then(([res]) => {
      console.log(
        'Message delivered with code %s %s',
        res.statusCode,
        res.statusMessage
      );
    })
    .catch((err) => {
      console.log('Errors occurred, failed to deliver message');

      if (err.response && err.response.body && err.response.body.errors) {
        err.response.body.errors.forEach((error) =>
          console.log('%s: %s', error.field, error.message)
        );
      } else {
        console.log(err);
      }
    });
}

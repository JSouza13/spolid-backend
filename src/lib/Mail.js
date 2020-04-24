import exphbs from 'express-handlebars';
import nodemailer from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';
import nodemailerSendgrid from 'nodemailer-sendgrid';
import { resolve } from 'path';
import 'dotenv/config';

import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { apiKey } = mailConfig;

    this.transporter = nodemailer.createTransport(
      nodemailerSendgrid({
        apiKey,
      })
    );

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');

    this.transporter.use(
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

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();

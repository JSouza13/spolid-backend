const xoauth2 = require('xoauth2');

export default {
  service: 'Gmail',
  auth: {
    xoauth2: xoauth2.createXOAuth2Generator({
      user: process.env.MAIL_USER,
      // pass: process.env.MAIL_PASS,
    }),
  },
  default: {
    from: 'Equipe Spolid Academy <noreply@spolid.academy.com>',
  },
};

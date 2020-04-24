export default {
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'Equipe Spolid Academy <noreply@spolid.academy.com>',
  },
};

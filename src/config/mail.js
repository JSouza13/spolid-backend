export default {
  service: 'Sendgrid',
  auth: {
    user: process.env.SENDGRID_USERNAME,
    pass: process.env.SENDGRID_PASSWORD,
  },
  default: {
    from: 'Equipe Spolid Academy <noreply@spolid.academy.com>',
  },
};

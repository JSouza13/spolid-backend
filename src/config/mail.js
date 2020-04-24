export default {
  auth: {
    api_user: process.env.SENDGRID_USERNAME,
    api_key: process.env.SENDGRID_PASSWORD,
  },
  default: {
    from: 'Equipe Spolid Academy <spolid.academy@gmail.com>',
  },
};

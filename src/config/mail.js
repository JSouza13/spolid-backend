export default {
  service: 'Gmail',
  auth: {
    api_key: process.env.SENDGRID_API_KEY,
  },
  default: {
    from: 'Equipe Spolid Academy <noreply@spolid.academy.com>',
  },
};

import mailConfig from '../../config/mail';
import Mail from '../../lib/Mail';

class ForgotPasswordMail {
  get key() {
    return 'ForgotPasswordMail';
  }

  async handle({ data }) {
    const { user, email, tokenTemp } = data;

    await Mail.sendMail({
      to: `${user.name} <${email}>`,
      from: mailConfig.default.from,
      subject: 'Esqueci minha senha',
      template: 'forgotPassword',
      context: {
        user: user.name,
        tokenTemp,
        email,
      },
    });
  }
}

export default new ForgotPasswordMail();

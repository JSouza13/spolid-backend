import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const { name, email } = data;

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Bem-vindo(a)',
      template: 'welcome',
      context: {
        name,
        email,
      },
    });
  }
}

export default new WelcomeMail();

import { format, parsetISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from 'nodemailer/lib/mailer';

class CancellationMain {
    get key() {
        return 'CancellationMail';
    }

    async handle({ data }) {
        const { appointment } = data;

        await Mail.sendMain({
            to: `${appointment.provider.name} <${appointment.provider.email}>`,
            subject: 'Agendamento cancelado',
            template: 'cancellation',
            context: {
                provider: appointment.provider.name,
                user: appointment.user.name,
                date: format(
                    parsetISO(appointment.date),
                    "'dia' dd 'de' MMM, às' H:mm'h'",
                    {
                        locale: pt,
                    }
                ),
            },
        });
    }
}

export default new CancellationMain();

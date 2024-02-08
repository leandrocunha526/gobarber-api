import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
                past: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(this.date, new Date());
                    },
                },
                cancelable: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return isBefore(new Date(), subHours(this.date, 2));
                    },
                },
            },
            {
                sequelize,
                tableName: 'Appointments',
                freezeTableName: true,
            }
        );
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Users, { foreignKey: 'user_id', as: 'users' });
        this.belongsTo(models.Users, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}

export default Appointment;

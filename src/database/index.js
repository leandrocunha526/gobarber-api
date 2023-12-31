import { Sequelize } from 'sequelize';

import mongoose from 'mongoose';
import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            );
    }

    mongo() {
        try {
            const URI = process.env.MONGO_URL;
            if (!URI) {
                console.log('No URI found');
                return;
            }

            mongoose.connect(URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            })
            .then(() => {
                console.log('MongoDB Connected');
            })
            .catch((err) => {
                console.error('MongoDB Connection Error:', err);
            });
        } catch (err) {
            console.error('Error:', err);
        }
    }
}

export default new Database();

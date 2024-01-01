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
            const MongoURI = process.env.MONGO_URL;
            if (!MongoURI) {
                console.log('No URI found');
                return;
            }
            mongoose.connect(MongoURI).then(() => {
                console.log('MongoDB connected');
            }
            ).catch((err) => {
                console.error(err);
            });
        }
    }

export default new Database();

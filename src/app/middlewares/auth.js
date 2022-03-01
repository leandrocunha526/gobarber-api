import jwt from 'jsonwebtoken';
import { promisity } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(401)
            .json({ error: 'Error 401: Unauthorized access' });
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = await promisity(jwt.verify)(token, authConfig.secret);
        req.userId = decoded.id;
        return next();
    } catch (err) {
        return res
            .status(401)
            .json({ error: 'Error 401: Unauthorized access' });
    }
};

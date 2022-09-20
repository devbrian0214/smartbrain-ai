import { responses } from '../Common/responseAPI.js';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (token) {
      // verify token with secret text
      const decodedData = jwt.verify(token, process.env.KEY_TOKEN);

      if (!decodedData) {
        responses._401(res, { message: 'Failed' });
        return;
      }
    }
    next();
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

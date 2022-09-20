import { responses } from '../Common/responseAPI.js';
import { db } from '../Common/connectDB.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check inputs
    if (!email || !password) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    await db.transaction(async trx => {
      // check if user existed
      const [existedUser] = await trx('login')
        .select('hash', 'email')
        .where({ email });

      // check existed user and compare password
      if (
        !existedUser.email ||
        !bcrypt.compareSync(password, existedUser.hash)
      ) {
        responses._404(res, { message: 'Failed' });
        return;
      }

      // get user from user table
      const [user] = await trx('users')
        .returning('*')
        .select('*')
        .where({ email: existedUser.email });

      //sign jwt token with expired time
      const token = jwt.sign(user, process.env.KEY_TOKEN, {
        expiresIn: process.env.EXPIRED_TIME,
      });

      // send response
      responses._200(res, {
        user,
        token,
        message: 'Sucessful',
      });
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check inputs
    if (!name || !email || !password) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    const hash = bcrypt.hashSync(password, 10);

    // register new user to db
    await db.transaction(async trx => {
      //insert to login table
      const [registerEmail] = await trx('login').returning('email').insert({
        hash,
        email,
      });

      // insert to users table
      const [newUser] = await trx('users').returning('*').insert({
        email: registerEmail.email,
        name,
        joined: new Date(),
      });

      //sign jwt token with expired time
      const token = jwt.sign({ user: newUser }, process.env.KEY_TOKEN, {
        expiresIn: process.env.EXPIRED_TIME,
      });
      // send response
      responses._201(res, { user: newUser, token, message: 'Sucessful' });
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

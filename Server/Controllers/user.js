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

    // check if user existed
    const [existedUser] = await db
      .select('hash', 'email')
      .from('login')
      .where({ email });

    // check existed user and compare password
    if (!existedUser || !bcrypt.compareSync(password, existedUser.hash)) {
      responses._404(res, { message: 'Failed' });
      return;
    }

    //sign jwt token with expired time
    const token = jwt.sign(
      { email: existedUser.email },
      process.env.KEY_TOKEN,
      {
        expiresIn: process.env.EXPIRED_TIME,
      }
    );

    // send response
    responses._200(res, {
      user: { email: existedUser.email },
      token,
      message: 'Sucessful',
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
      const token = jwt.sign({ email: newUser.email }, process.env.KEY_TOKEN, {
        expiresIn: process.env.EXPIRED_TIME,
      });

      //get the rest but id
      const { id, ...data } = newUser;

      // send response
      responses._201(res, { user: data, token, message: 'Sucessful' });
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

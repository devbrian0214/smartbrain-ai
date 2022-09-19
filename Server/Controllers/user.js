import { responses } from '../Common/responseAPI.js';
import { db } from '../Common/connectDB.js';
import bcrypt from 'bcrypt';

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user existed
    const [existedUser] = await db
      .select('email', 'hash')
      .from('login')
      .where({ email });

    // check existed user and compare password
    if (!existedUser && !bcrypt.compareSync(password, existedUser.hash))
      responses._404(res, { message: 'Failed' });

    // send response
    responses._200(res, {
      user: existedUser,
      message: 'Sucessful',
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

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
      // send response
      responses._201(res, { user: newUser, message: 'Sucessful' });
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

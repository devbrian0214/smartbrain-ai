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
      .where('email', '=', email);

    if (!existedUser && !bcrypt.compareSync(password, existedUser.hash))
      responses._404(res, { message: 'Sign-in failed' });

    responses._200(res, {
      user: existedUser,
      message: 'Sucessful signed in',
    });
    console.log('signed in ok');
  } catch (error) {
    responses._401(res, { message: 'Sign-in failed' });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hash = bcrypt.hashSync(password, 2);

    await db.transaction(async trx => {
      const [registerEmail] = await trx('login')
        .insert({
          hash,
          email,
        })
        .returning('email');

      const [newUser] = await trx('users')
        .insert({
          email: registerEmail.email,
          name,
          joined: new Date(),
        })
        .returning('*');

      responses._201(res, { user: newUser, message: 'Sucessful registered' });
    });
  } catch (error) {
    responses._401(res, { message: 'Register failed' });
  }
};

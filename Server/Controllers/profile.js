import { responses } from '../Common/responseAPI.js';
import { db } from '../Common/connectDB.js';

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // get profile with id
    const [existedUser] = await db.select('*').from('users').where({ id });

    if (!existedUser) responses._404(res, { message: 'Failed' });

    // send response
    responses._200(res, { user: existedUser, message: 'Sucessful' });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

export const updateProfileEntries = async (req, res) => {
  try {
    const { id } = req.body;

    // update profile entries point
    const [entries] = await db
      .returning('entries')
      .select('*')
      .from('users')
      .where({ id })
      .increment('entries', 1);

    if (!entries) responses._404(res, { message: 'Failed' });

    // send response
    responses._200(res, {
      userEntry: entries,
      message: 'Sucessful',
    });
  } catch (error) {
    responses._401(res, { message: 'Failed' });
  }
};

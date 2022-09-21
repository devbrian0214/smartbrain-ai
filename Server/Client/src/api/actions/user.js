import * as api from '../api.js';
import { SIGNIN, REGISTER } from '../../constants/constants.js';

export const authentication = async (formObj, type) => {
  try {
    const { data } =
      type === SIGNIN
        ? await api.signin(formObj)
        : type === REGISTER
        ? await api.register(formObj)
        : null;

    if (data === null) throw Error('Error Credentials');

    //store data on localStorage
    localStorage.setItem('userProfile', JSON.stringify({ ...data }));

    return data.user;
  } catch (error) {
    console.log(error);
  }
};

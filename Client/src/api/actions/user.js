import * as api from '../index.js';
import { SIGNIN, REGISTER } from '../../constants/index';

export const authentication = async (formObj, type) => {
  try {
    if (type === SIGNIN) {
      const data = await api.signin(formObj);

      if (!data) throw Error('Cannot sign in');

      //store data on localStorage
      localStorage.setItem('userProfile', JSON.stringify({ ...data }));

      return data;
    } else if (type === REGISTER) {
      const data = await api.register(formObj);

      if (!data) throw Error('Cannot register');

      return;
    }
  } catch (error) {
    console.log(error);
  }
};

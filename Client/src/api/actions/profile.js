import * as api from '../api.js';

export const getProfile = async id => {
  try {
    const data = await api.getProfile(id);

    if (!data) throw Error('Cannot get profile user');

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileEntries = async formData => {
  try {
    const data = await api.updateProfileEntries(formData);

    if (!data) throw Error('Cannot update profile entries');

    return data;
  } catch (error) {
    console.log(error);
  }
};

import * as api from '../api.js';

export const handleImageURL = async imageURLObj => {
  try {
    const data = await api.handleImageURL(imageURLObj);

    if (!data) throw Error('Cannot get profile user');

    return data;
  } catch (error) {
    console.log(error);
  }
};

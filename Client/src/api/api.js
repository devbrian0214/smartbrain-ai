import axios from 'axios';

const API = axios.create({
  baseURL:
    process.env.REACT_APP_CONNECTION_URL || process.env.REACT_APP_LOCAL_HOST,
});

// send token back to server to verify authentication
API.interceptors.request.use(req => {
  if (localStorage.getItem('userProfile'))
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem('userProfile')).data.token
    }`;

  return req;
});

// SIGNIN & REGISTER
export const signin = formObj => API.post('/user/signin', formObj);
export const register = formObj => API.post('/user/register', formObj);

// GET PROFILE AND UPDATE ENTRIES
export const getProfile = id => API.get(`/profile/${id}`);
export const updateProfileEntries = formObj => API.post('/profile', formObj);

// DETECT FACIAL IMAGE
export const handleImageURL = imageURLObj => API.post('/imageURL', imageURLObj);

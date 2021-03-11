import axios from './axios';

const postUserLogin = (data) => axios.post('/userLogin', data);

export { postUserLogin };

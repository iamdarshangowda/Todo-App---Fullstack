import axios from 'axios';
const URL = process.env.TODO_BACKED_PORT;

interface IUserData {
  username: string;
  email: string;
  password: string;
}

export const post = (apiURL: string, data: IUserData) => {
  const token = localStorage.getItem('jwttoken');

  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer' + token,
    },
  });
};

export const noAuthPost = (apiURL: string, data: IUserData) => {
  console.log(process.env.TODO_BACKED_PORT);
  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
};

export const postLogin = (apiURL: string, data: IUserData) => {
  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
  });
};

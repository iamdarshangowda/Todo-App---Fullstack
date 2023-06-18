import axios from 'axios';
const URL = process.env.TODO_BACKED_PORT;

interface IUserData {
  username?: string;
  email: string;
  password: string;
}

export const post = (apiURL: string, data: any) => {
  const token = JSON.parse(localStorage.getItem('todoAuthToken') || '');

  return axios.post(`${URL}/${apiURL}`, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const get = (apiURL: string) => {
  const token = JSON.parse(localStorage.getItem('todoAuthToken') || '');

  return axios.get(`${URL}/${apiURL}`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const deleteTask = (apiURL: string) => {
  const token = JSON.parse(localStorage.getItem('todoAuthToken') || '');

  return axios.delete(`${URL}/${apiURL}`, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
    },
  });
};

export const put = (apiURL: string, data: any) => {
  const token = JSON.parse(localStorage.getItem('todoAuthToken') || '');

  return axios.put(`${URL}/${apiURL}`, data, {
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: 'Bearer ' + token,
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

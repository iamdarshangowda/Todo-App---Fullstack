import { get } from '../config/axiosClient';

const verifyToken = async () => {
  let tokenValid = false;
  try {
    await get('user/verify').then((data) => {
      tokenValid = data.data.tokenValid;
    });
  } catch (err: any) {
    console.log(err.message);
  } finally {
    return tokenValid;
  }
};

export default verifyToken;

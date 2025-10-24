import { clientCredentials } from '../client';

const getUserInfo = async (uid) => {
  const response = await fetch(`${clientCredentials.databaseURL}/user-info/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.json();
};

export default getUserInfo;

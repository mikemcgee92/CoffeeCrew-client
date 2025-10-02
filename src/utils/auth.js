import firebase from 'firebase/app';
import 'firebase/auth';
import { clientCredentials } from './client';

const postUserInfo = async (uid, userInfo) => {
  await fetch(`${clientCredentials.databaseURL}/user-info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: uid,
    },
    body: JSON.stringify(userInfo),
  });
};

const signIn = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });

  try {
    const result = await firebase.auth().signInWithPopup(provider);
    const { user } = result;
    const info = {
      display_name: user.displayName,
    };
    await postUserInfo(user.uid, info);
  } catch (error) {
    console.error('Error during sign in:', error);
  }
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };

'use client';

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import RecipeForm from '../../../components/forms/RecipeForm';
import getUserInfo from '../../../utils/data/userinfo_data';

export default function NewRecipePage() {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(user.uid).then(setUserInfo);
  }, [user.uid]);

  return (
    <div>
      <title>New Recipe</title>
      {userInfo.is_manager ? (
        <>
          <h1>New Recipe</h1>
          <RecipeForm />
        </>
      ) : (
        <h1>Not authorized</h1>
      )}
    </div>
  );
}

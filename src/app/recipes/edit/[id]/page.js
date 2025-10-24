'use client';

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import { useParams } from 'next/navigation';
import RecipeForm from '../../../../components/forms/RecipeForm';
import getUserInfo from '../../../../utils/data/userinfo_data';

export default function EditRecipePage() {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    getUserInfo(user.uid).then(setUserInfo);
  }, [user.uid]);

  const { id } = useParams();

  return (
    <div>
      <title>Edit Recipe</title>
      {userInfo.is_manager ? (
        <>
          <h1>Edit Recipe</h1>
          <RecipeForm recipeId={id} />
        </>
      ) : (
        <h1>Not authorized</h1>
      )}
    </div>
  );
}

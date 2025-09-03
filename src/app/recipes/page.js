'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Form } from 'react-bootstrap';
import firebase from 'firebase/app';
import 'firebase/auth';
import { getRecipes, deleteRecipe } from '../../utils/data/recipe_data';

export default function RecipesPage() {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const [recipesArray, setRecipesArray] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.toString() ? `?${searchParams.toString()}` : '';

  useEffect(() => {
    if (searchTerm === '') {
      getRecipes(query).then(setRecipesArray);
    } else {
      getRecipes(query).then(setFilteredRecipes);
      const filteredData = filteredRecipes.filter((recipe) => recipe.label.toLowerCase().includes(searchTerm.toLowerCase()));
      setRecipesArray(filteredData);
    }
  }, [query, searchTerm, filteredRecipes]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div
      key={query}
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <title>{query ? recipesArray[0]?.category_id.label : 'All recipes'}</title>
      <h1>{query ? recipesArray[0]?.category_id.label : 'All recipes'}</h1>
      {query ? (
        ''
      ) : (
        <Form>
          <Form.Group className="mb-3" controlId="recipes.search">
            <Form.Control value={searchTerm} type="search" placeholder="Search..." onChange={handleSearch} />
          </Form.Group>
        </Form>
      )}
      <div className="recipes-container">
        {recipesArray.map((recipe) => (
          <div key={recipe.id} className="button-row">
            <Button className="btn btn-primary" onClick={() => router.push(`/recipes/${recipe.id}`)}>
              {recipe.label}
            </Button>
            {user.uid === recipe.creator_id ? (
              <>
                <Button className="btn btn-info" onClick={() => router.push(`/recipes/edit/${recipe.id}`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                    <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                  </svg>
                </Button>
                <Button
                  className="btn btn-danger cat"
                  onClick={async () => {
                    await deleteRecipe(recipe.id, user.uid);
                    getRecipes(query).then(setRecipesArray);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </Button>
              </>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
      <div>
        <Button className="btn btn-success" onClick={() => router.push('/recipes/new')}>
          + New Recipe
        </Button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, InputGroup, Button } from 'react-bootstrap';

import firebase from 'firebase';
import 'firebase/auth';

import PropTypes from 'prop-types';

import { getSingleRecipe, createRecipe, updateRecipe } from '../../utils/data/recipe_data';
import { addIngredientToRecipe, removeAllIngredients } from '../../utils/data/ingredient_data';
import CategorySelector from '../CategorySelector';
import DynamicIngredientFields from '../DynamicIngredientFields';

function RecipeForm({ recipeId }) {
  const auth = firebase.auth();
  const user = auth.currentUser;

  const router = useRouter();

  const [recipe, setRecipe] = useState({
    label: '',
    category_id: '',
    ingredient_amounts: [],
    steps: '',
    notes: '',
    image_url: '',
    creator_id: '',
  });
  const [received, setReceived] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({
      ...prev,
      [name]: name === 'category_id' ? Number(value) : value,
    }));
  };
  const handleIngredientChange = (newIngredients) => {
    const updatedData = { ...recipe, ingredient_amounts: newIngredients };
    console.warn('RecipeForm: handleIngredientChange: newIngredients=', newIngredients);
    setRecipe(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const recipeData = {
        ...recipe,
        creator_id: user.uid, // FIXME: get user firebaseKey here
      };

      if (!recipeId) {
        const newRecipe = await createRecipe(recipeData);
        recipeData.ingredient_amounts.map((ingredientAmount) => {
          const JSONpayload = {
            size: ingredientAmount.size,
            ingredient: ingredientAmount.ingredient.id,
            amount: ingredientAmount.amount,
          };
          const response = addIngredientToRecipe(newRecipe.id, JSONpayload);
          return response;
        });
        router.push(`/recipes?category_id=${recipeData.category_id}`);
      } else {
        await updateRecipe(recipeId, recipeData);
        await removeAllIngredients(recipeId);
        recipeData.ingredient_amounts.map((ingredientAmount) => {
          const JSONpayload = {
            size: ingredientAmount.size,
            ingredient: ingredientAmount.ingredient.id,
            amount: ingredientAmount.amount,
          };
          const response = addIngredientToRecipe(recipeId, JSONpayload);
          return response;
        });
        router.push(`/recipes?category_id=${recipeData.category_id}`);
      }
    } catch (err) {
      console.error(err, 'recipe= ', recipe, ' recipeId= ', recipeId);
    }
  };

  if (recipeId && !received) {
    getSingleRecipe(recipeId).then((data) => {
      setRecipe({
        ...data,
        category_id: typeof data.category_id === 'object' ? data.category_id.id : Number(data.category_id),
      });
    });
    if (recipeId !== 'undefined') {
      setReceived(true); // prevent infinite rerender
    }
  }

  return (
    <div>
      <Form className="recipe-form">
        <CategorySelector name="category_id" value={recipe.category_id} onChange={handleChange} />

        <InputGroup className="mb-3">
          <InputGroup.Text id="recipe-label">Name</InputGroup.Text>
          <Form.Control name="label" aria-label="Recipe name" value={recipe?.label} onChange={handleChange} placeholder="Enter a name for this recipe" required />
        </InputGroup>

        <DynamicIngredientFields name="ingredient_amounts" value={recipe?.ingredient_amounts} onChange={handleIngredientChange} />

        <InputGroup className="mb-3">
          <InputGroup.Text>Steps</InputGroup.Text>
          <Form.Control name="steps" as="textarea" aria-label="Recipe steps" value={recipe?.steps} onChange={handleChange} placeholder="Recipe steps..." required />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Notes</InputGroup.Text>
          <Form.Control name="notes" as="textarea" aria-label="Recipe Notes" value={recipe?.notes} onChange={handleChange} placeholder="Any notes" />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroup.Text>Image URL</InputGroup.Text>
          <Form.Control name="image_url" aria-label="Image URL" value={recipe?.image_url} onChange={handleChange} placeholder="http://www.example.com/image.jpg" />
        </InputGroup>

        <Button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Save
        </Button>
      </Form>
    </div>
  );
}

export default RecipeForm;

RecipeForm.propTypes = {
  recipeId: PropTypes.shape({}),
};

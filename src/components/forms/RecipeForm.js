import { useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleRecipe } from '../../utils/data/recipe_data';

function RecipeForm({ recipeId }) {
  const [recipe, setRecipe] = useState({});

  if (recipeId) {
    getSingleRecipe(recipeId).then(setRecipe);
  }
  return (
    <div>
      <Form className="recipe-form">
        <Form.Group className="mb-3" controlId="formRecipeLabel">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder={recipeId ? recipe.label : 'Enter new name'} />
        </Form.Group>
      </Form>
    </div>
  );
}

export default RecipeForm;

RecipeForm.propTypes = {
  recipeId: PropTypes.shape({}),
};

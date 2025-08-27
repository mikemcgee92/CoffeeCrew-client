/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getIngredients } from '../utils/data/ingredient_data';

function IngredientSelector({ value, onChange }) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getIngredients().then(setIngredients);
  }, []);

  return (
    <div>
      <Form.Select id="ingredient_id" name="ingredient_id" value={value} onChange={onChange} required>
        <option value="">Select ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default IngredientSelector;

IngredientSelector.propTypes = {
  value: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }),
  onChange: PropTypes.func,
};

import { useState, useEffect } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IngredientSelector from './IngredientSelector';

function DynamicIngredientFields({ value, onChange }) {
  const [ingredientAmounts, setIngredientAmounts] = useState([
    {
      size: '',
      amount: '',
      ingredient: { id: '', label: '' },
    },
  ]);
  const [counter, setCounter] = useState(0);

  const handleClickAdd = () => {
    onChange([...value, { size: '', amount: '', ingredient: { id: '' } }]);
    setCounter(counter + 1);
  };
  const handleClickRemove = () => {
    if (counter > 0) {
      onChange(value.slice(0, -1));
      setCounter(counter - 1);
    }
  };

  const handleLocalChange = (e, index, fieldName) => {
    console.warn(ingredientAmounts);
    const newAmounts = [...ingredientAmounts];
    newAmounts[index] = {
      ...newAmounts[index],
      [fieldName]: fieldName === 'ingredient' ? { id: e.target.value } : e.target.value,
    };
    onChange(newAmounts);
  };

  useEffect(() => {
    if (value) {
      setIngredientAmounts(value);
      setCounter(value.length);
    }
  }, [value]);

  return (
    <div>
      <Button onClick={handleClickAdd}>+</Button>
      {Array.from(Array(counter)).map((_, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="ingredient-amount-container" key={index}>
          <InputGroup>
            <InputGroup.Text id={`ingredient_amount_size-${index}`}>Size</InputGroup.Text>
            <Form.Control name={`ingredient_amount_size-${index}`} value={ingredientAmounts[index]?.size || ''} onChange={(e) => handleLocalChange(e, index, 'size')} placeholder="Enter size" />
          </InputGroup>
          <IngredientSelector value={ingredientAmounts[index]?.ingredient.id} onChange={(e) => handleLocalChange(e, index, 'ingredient')} />
          <InputGroup>
            <InputGroup.Text id={`ingredient_amount_amount-${index}`}>amount</InputGroup.Text>
            <Form.Control name={`ingredient_amount_amount-${index}`} value={ingredientAmounts[index]?.amount || ''} onChange={(e) => handleLocalChange(e, index, 'amount')} placeholder="Enter amount" />
          </InputGroup>
        </div>
      ))}
      <Button onClick={handleClickRemove}>-</Button>
    </div>
  );
}

export default DynamicIngredientFields;

DynamicIngredientFields.propTypes = {
  value: PropTypes.arrayOf,
  onChange: PropTypes.func,
};

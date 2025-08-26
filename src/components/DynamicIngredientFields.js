import { useState, useEffect } from 'react';
import { Button, InputGroup, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import IngredientSelector from './IngredientSelector';

function DynamicIngredientFields({ value }) {
  const [ingredientAmounts, setIngredientAmounts] = useState([]);
  const [counter, setCounter] = useState(0);

  const handleClickAdd = () => {
    setCounter(counter + 1);
  };
  const handleClickRemove = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };

  const handleLocalChange = (index, fieldName) => (e) => {
    const newAmounts = [...ingredientAmounts];
    newAmounts[index] = {
      ...newAmounts[index],
      [fieldName]: e.target.value,
    };
    setIngredientAmounts(newAmounts);
  };

  useEffect(() => {
    if (value) {
      setIngredientAmounts(value);
      setCounter(value.length);
    }
  }, [value]);

  return (
    <div key={value}>
      <Button onClick={handleClickAdd}>+</Button>
      {Array.from(Array(counter)).map((e, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div className="ingredient-amount-container" key={index}>
          <InputGroup>
            <InputGroup.Text id={`ingredient_amount_size-${index}`}>Size</InputGroup.Text>
            <Form.Control name={`ingredient_amount_size-${index}`} value={ingredientAmounts[index]?.size} onChange={handleLocalChange(index, 'size')} placeholder="Enter size" />
          </InputGroup>
          <IngredientSelector name={`ingredient_amount_ingredient-${index}`} value={ingredientAmounts[index]?.ingredient?.id} onChange={handleLocalChange(index, 'ingredient')} />
          <InputGroup>
            <InputGroup.Text id={`ingredient_amount_amount-${index}`}>amount</InputGroup.Text>
            <Form.Control name={`ingredient_amount_amount-${index}`} value={ingredientAmounts[index]?.amount} onChange={handleLocalChange(index, 'amount')} placeholder="Enter amount" />
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
};

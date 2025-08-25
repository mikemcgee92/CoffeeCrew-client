/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCategories } from '../utils/data/category_data';

function CategorySelector({ value, onChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div>
      <Form.Select id="category_id" name="category_id" value={value} onChange={onChange} required>
        <option value="">Select category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.label}
          </option>
        ))}
      </Form.Select>
    </div>
  );
}

export default CategorySelector;

CategorySelector.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

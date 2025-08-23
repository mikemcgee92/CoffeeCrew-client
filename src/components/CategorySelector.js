/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getCategories } from '../utils/data/category_data';

function CategorySelector({ category_id }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  return (
    <div>
      <Form.Select id="category_id" name="category_id" category-id={category_id ? { category_id } : ''}>
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
  category_id: PropTypes.string,
};

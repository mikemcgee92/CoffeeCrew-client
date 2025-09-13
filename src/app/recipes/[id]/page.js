'use client';

import { useEffect, useState, useCallback } from 'react';
import { Image } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import { getSingleRecipe } from '../../../utils/data/recipe_data';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedSize, setSelectedSize] = useState();

  const buildSizeArrays = useCallback((recipeObj) => {
    const newSizes = [];

    recipeObj.ingredient_amounts?.map((amount) => {
      if (!newSizes.includes(amount.size)) {
        newSizes.push(amount.size);
      }
      return setSizes(newSizes);
    });
  }, []);

  useEffect(() => {
    if (id && id !== 'undefined') {
      getSingleRecipe(id).then(setRecipe);
    }
  }, [id]);

  useEffect(() => {
    buildSizeArrays(recipe);
  }, [buildSizeArrays, recipe]);

  useEffect(() => {
    setSelectedSize(sizes[0]);
  }, [setSelectedSize, sizes]);

  return (
    <div className="container-styled">
      <title>{recipe.label}</title>
      <Image src={recipe.image_url} alt={recipe.label} />
      <h1>{recipe.label}</h1>
      <h5>{recipe.category_id?.label}</h5>
      <div style={{ textAlign: 'center', margin: '16px 0' }}>
        <span>Ingredients:</span>
      </div>
      <div className="radio-inputs" type="radio" name="sizes" value={selectedSize}>
        {sizes?.map((size) => (
          <label className="radio">
            <input checked={size === selectedSize} type="radio" key={`radio-${size}`} id={`radio-${size}`} value={size} onChange={(e) => setSelectedSize(e.currentTarget.value)} />
            <span className="name">{size}</span>
          </label>
        ))}
      </div>
      {recipe.ingredient_amounts?.map((ingredient) =>
        ingredient.size === selectedSize ? (
          <h5 key={ingredient.size + ingredient.amount + ingredient.label}>
            {ingredient.amount} of {ingredient.ingredient.label} <br />
          </h5>
        ) : (
          ''
        ),
      )}
      <h3>{recipe.steps}</h3>
      <h7>{recipe.notes}</h7>
    </div>
  );
}

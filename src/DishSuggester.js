import React, { useState } from 'react';

const DishSuggester = ({ allIngredients, suggestDishes }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleSelection = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  return (
    <div>
      <h3>Select Ingredients</h3>
      {allIngredients.map((ingredient) => (
        <button key={ingredient} onClick={() => handleSelection(ingredient)}>
          {ingredient}
        </button>
      ))}

      <h4>Possible Dishes</h4>
      <ul>
        {suggestDishes(selectedIngredients).map((dish) => (
          <li key={dish.name}>{dish.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DishSuggester;

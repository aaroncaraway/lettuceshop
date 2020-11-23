import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ImgMediaCard from './ImgMediaCard';
import RecipeReviewCard from './RecipeReviewCard';
import { RecipeContext } from '../context/RecipeContext';

const ListItems = () => {
  const recipes = useContext(RecipeContext);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ recipes: [] });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('https://lettuceshop-api.herokuapp.com/');
      console.log(result.data);
      setData({ recipes: result.data });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="listitems">ListItems</div>

      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="dashboard-container">
          {data.recipes &&
            data.recipes.map((item) => {
              return (
                <RecipeReviewCard
                  key={item.recipe_id}
                  recipe_id={item.recipe_id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  ingredients={item.recipeIngredient}
                  instructionsUrl={item.recipeInstructions_url}
                  author_name={item.author_name}
                  itemSelected={false}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default ListItems;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImgMediaCard from './ImgMediaCard';

const ListItems = () => {
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
        <div class="dashboard-container">
          {data.recipes &&
            data.recipes.map((item) => {
              return (
                <ImgMediaCard
                  key={item.recipe_id}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  ingredients={item.recipeIngredient}
                  instructionsUrl={item.recipeInstructions_url}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default ListItems;

import React, { useContext } from 'react';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { RecipeContext } from '../context/RecipeContext';

const SelectedItems = () => {
  const recipes = useContext(RecipeContext);
  const selectedRecipes = recipes.filter((recipe) => recipe.selected === true);
  console.log('SELECTED ITEMS--------------------', recipes, selectedRecipes);
  if (recipes.length)
    return (
      <Paper>
        <List>
          {selectedRecipes.map((recipe, id) => (
            <>{recipe.name}</>
          ))}
        </List>
      </Paper>
    );
  return null;
};

export default SelectedItems;

import React, { useContext } from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { RecipeContext } from '../context/RecipeContext';

const useStyles = makeStyles((theme) => ({
  selectedItem: {
    fontFamily: 'Sans-serif',
  },
}));

const SelectedItems = () => {
  const classes = useStyles();
  const recipes = useContext(RecipeContext);
  const selectedRecipes = recipes.filter((recipe) => recipe.selected === true);
  if (recipes.length)
    return (
      <Paper>
        <List>
          {selectedRecipes.map((recipe, id) => (
            <Box m={2} className={classes.selectedItem}>
              {recipe.name}
            </Box>
          ))}
        </List>
      </Paper>
    );
  return null;
};

export default SelectedItems;

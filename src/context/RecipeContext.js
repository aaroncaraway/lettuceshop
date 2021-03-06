import React, { createContext } from 'react';
import recipeReducer from '../reducers/recipeReducer';
import useLocalStorageReducer from '../hooks/useLocalStorageReducer';

export const RecipeContext = createContext();
export const DispatchContext = createContext();

const defaultRecipes = [
  { id: 1, name: 'Coconut Curry', selected: false },
  { id: 2, name: 'Short Ribs', selected: false },
  { id: 3, name: 'Biscuits', selected: true },
];

export const RecipeProvider = (props) => {
  const [recipes, dispatch] = useLocalStorageReducer(
    'recipes',
    defaultRecipes,
    recipeReducer
  );

  return (
    <RecipeContext.Provider value={recipes}>
      <DispatchContext.Provider value={dispatch}>
        {props.children}
      </DispatchContext.Provider>
    </RecipeContext.Provider>
  );
};

import uuid from 'uuid';

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: uuid(),
          recipe_id: action.recipe_id,
          name: action.name,
          recipe_object: action.recipe_object,
          selected: true,
        },
      ];
    case 'REMOVE':
      return state.filter((recipe) => recipe.id !== action.id);
    case 'TOGGLE':
      console.log('GETTING HERE TOGGLE!', state);
      return state.map((recipe) =>
        recipe.id === action.id
          ? { ...recipe, selected: !recipe.selected }
          : recipe
      );
    case 'UPDATE':
      return state.map((recipe) =>
        recipe.id === action.id ? { ...recipe, task: action.newTask } : recipe
      );
    default:
      return state;
  }
};

export default recipeReducer;

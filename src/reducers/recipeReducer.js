import uuid from 'uuid';

const recipeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [
        ...state,
        {
          id: uuid(),
          recipe_id: action.recipe_id,
          internal_id: action.internal_id,
          name: action.name,
          recipe_object: action.recipe_object,
          selected: true,
        },
      ];
    case 'REMOVE':
      return state.filter((recipe) => recipe.id !== action.id);
    case 'TOGGLE':
      // QUESTION: Test to see if in array here?
      // const existsInArray = state.some(
      //   (recipe) => recipe.internal_id === action.internal_id
      // );
      // if (existsInArray) {
      //   console.log('exists in array!');
      //   return state;
      // }
      return state.map((recipe) =>
        recipe.id === action.id
          ? { ...recipe, selected: !recipe.selected }
          : recipe
      );
    default:
      return state;
  }
};

export default recipeReducer;

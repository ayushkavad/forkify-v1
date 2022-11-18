import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

export const controleRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  // 1 Loding recipe

  recipeView.spinnerRender();

  try {
    await model.loadRecipe(id);

    // 2 Render recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErrorMessage();
  }
};

const init = function () {
  recipeView.addHandlerRender(controleRecipes);
};

init();

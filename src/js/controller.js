import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

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

const controleSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controleRecipes);
  searchView.addHandlerSearch(controleSearchResults);
};

init();

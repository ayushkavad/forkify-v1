import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

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
    resultView.spinnerRender();
    const query = searchView.getQuery();
    await model.loadSearchResult(query);
    resultView.render(model.getSearchResultsPage());
  } catch (err) {
    console.log(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controleRecipes);
  searchView.addHandlerSearch(controleSearchResults);
};

init();

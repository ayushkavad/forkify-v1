import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import resultView from './Views/resultView.js';
import paginationView from './Views/paginationView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

if (module.hot) {
  module.hot.accept();
}

export const controleRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  recipeView.spinnerRender();

  try {
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
    // controleUpdateServings();
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
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlePagination = function (goToPage) {
  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controleUpdateServings = function (updateTO) {
  model.updateServings(updateTO);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controleRecipes);
  recipeView.addHandlerUpdateServings(controleUpdateServings);
  searchView.addHandlerSearch(controleSearchResults);
  paginationView.addHandlerClick(controlePagination);
};

init();

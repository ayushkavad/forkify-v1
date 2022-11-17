import * as model from './model.js';
import recipeView from './Views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

const controleRecipes = async function () {
  const id = window.location.hash.slice(1);

  if (!id) return;
  // 1 Loding recipe

  recipeView.spinnerRender();

  try {
    await model.loadRecipe(id);

    // 2 Render recipe

    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};

['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controleRecipes)
);

// window.addEventListener('hashchange', controleRecipes);
// window.addEventListener('load', controleRecipes);
///////////////////////////////////////

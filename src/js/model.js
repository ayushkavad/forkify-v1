import { async } from 'regenerator-runtime';
import { API_URL, SEARCH_RESULT_PER_PAGE } from './config';
import { getJSON } from './helper';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPages: SEARCH_RESULT_PER_PAGE,
  },
  bookmark: [],
};

// console.log(state.search.resultsPages);

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmark = true;
    else state.recipe.bookmark = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
    state.search.page = 1;
    console.log(state);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPages;
  const end = page * state.search.resultsPerPages;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  // newQt =  oldQt + newServings / oldServings
  state.recipe.servings = newServings;
};

export const bookMarkRecipe = function (recipe) {
  state.bookmark.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmark = true;
};

export const deleteBookmark = function (id) {
  const index = state.bookmark.findIndex(recipe => recipe.id === id);

  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmark = false;
};

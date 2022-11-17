import { async } from 'regenerator-runtime';

export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const response = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await response.json();
<<<<<<< HEAD
=======
    console.log(response, data);
>>>>>>> 60954c327dfcd4033a86c76e67f1f053d5ee65bc

    if (!response.ok)
      throw new Error(`${data.message} status ${response.status}`);

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

    console.log(state.recipe);
  } catch (err) {
    alert(err);
  }
};

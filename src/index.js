import _ from "lodash";
import "./style.css";
import Search from "./models/Search";
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from "./view/base";
import Recipe from "./models/Recipe";

// Global state of the app
// --Search object
// --Recipe object
// --Shopping list object
// --Liked recipes
const state = {};

const controlSearch = async () => {
  // Get query from view
  const query = searchView.getInput(); // Placeholder

  if (query) {
    // New search object and add to state
    state.search = new Search(query);

    // Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // Search for recipes
      await state.search.getResults();

      // render results on the UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert("Something went wrong!");
      clearLoader();
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

// Recipe controller

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace("#", "");
  console.log(id);
  if (id) {
    // Prepare UI for Changes

    // Create new recipe object
    state.recipe = new Recipe(id);

    // Get recipe data and parse ingr
    await state.recipe.getRecipe();
    state.recipe.parseIngredients();

    try {
      // Call functions
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      console.log(state.recipe);
    } catch (err) {
      alert("Something went wrong!");
    }
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipe)
);

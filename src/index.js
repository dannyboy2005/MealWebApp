import _ from "lodash";
import "./style.css";
import Search from "./models/Search";
import * as searchView from "./view/searchView";
import { elements, renderLoader, clearLoader } from "./view/base";

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

    // Search for recipes
    await state.search.getResults();

    // render results on the UI
    clearLoader();
    searchView.renderResults(state.search.result);
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

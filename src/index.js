import _ from "lodash";
import "./style.css";
import Search from "./models/Search";

// Global state of the app
// --Search object
// --Recipe object
// --Shopping list object
// --Liked recipes
const state = {};

const controlSearch = async () => {
  // Get query from view
  const query = "pizza"; // Placeholder

  if (query) {
    // New search object and add to state
    state.search = new Search(query);

    // Prepare UI for results

    // Search for recipes
    await state.search.getResults();

    // render results on the UI
    console.log(state.search.result);
  }
};

document.querySelector(".search").addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

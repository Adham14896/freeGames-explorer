import { Home } from "./home.js";

export class Ui {
  constructor(dataContainer) {
    this.dataContainer = document.querySelector(dataContainer);
    this.home = new Home(dataContainer);
  }

  async getGamesData(category = "mmorpg") {
    try {
      const options = {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "113f641786msh9aa3abd97bfc507p1b541ajsn98729145280a",
          "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
        },
      };
      const response = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`,
        options
      );

      const data = await response.json();

      this.displayData(data);
    } catch (err) {
      this.displayError(err);
    }
  }

  displayData(data) {
    let box = ``;
    data.forEach((item) => {
      box += `<div id='data' class="col-lg-3">
           <div class="card bg-transparent w-100 game-card" data-id="${item.id}">
    <img src='${item.thumbnail}' class="card-img-top w-100 game-img" alt='${item.title}'>
    <div class="card-body">
      <div class="card-title d-flex justify-content-between">
      <h1 class=" h5 fw-bold text-white">${item.title}</h1>
      <p class="text-white free">Free</p>
      </div>
      <p class="card-text text-white">${item.short_description}</p>
    </div>
    <div class="card-footer d-flex justify-content-between align-items-center">
      <p class="text-white genre bg-body-tertiary">${item.genre}</p>
      <p class="text-white platform  bg-body-tertiary">${item.platform}</p>
    </div>
  </div>
 </div>`;
    });
    this.dataContainer.innerHTML = box;

    const gameCards = this.dataContainer.querySelectorAll(".game-card");
    gameCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        const gameId = e.currentTarget.getAttribute("data-id");
        console.log("Game card clicked, ID:", gameId);

        this.home.getGameDetails(gameId);
      });
    });
  }

  showGameDetails(gameId) {
    const home = new Home();
    home.getGameDetails(gameId);
  }

  displayError(error) {
    this.dataContainer.innerHTML = `<div class="alert alert-danger vh-100 d-flex align-items-center" role="alert">
  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
  <div class="d-flex justify-content-center align-items-center">
    <h1 class='text-alert text-center'>${error.message}</h1>
    
  </div>
</div>`;
  }
}

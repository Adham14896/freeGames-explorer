import { Ui } from "./ui.js";

export class Home {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  async getGameDetails(gameId) {
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
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`,
        options
      );

      const data = await response.json();

      this.displayGameDetails(data);
    } catch (err) {
      const error = new Ui(".row");
      error.displayError(err.message);
    }
  }

  displayGameDetails(data) {
    const ui = new Ui(".row");

    if (!data || !data.title) {
      console.error("Error", data);
    } else {
      this.container.innerHTML = `
      <div class="modal-header d-flex justify-content-between">
           <h1 class="text-white">Game Details</h1>
        <button type="button" class="close close-modal bg-transparent border-0 fs-1 text-secondary-emphasis"  aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="row">
      <div class="modal-body col-lg-4">
        <img src="${data.thumbnail}" alt="${data.title}" class="w-100">
        </div>
        <div class="col-lg-8">
        <h5 class="modal-title text-white my-2">${data.title}</h5>
        <p><strong class='text-black p-1 bg-primary border rounded-3 border-0'>Genre:</strong><span class='text-white'> ${data.genre}</span></p>
        <p><strong class='text-black p-1 bg-primary border rounded-3 border-0'>Platform:</strong><span class='text-white'> ${data.platform}</span></p>
        <p><strong class='text-black p-1 bg-primary border rounded-3 border-0'>Publisher:</strong><span class='text-white'> ${data.publisher}</span></p>
        <p><strong class='text-black p-1 bg-primary border rounded-3 border-0'>Developer:</strong><span class='text-white'> ${data.developer}</span></p>
        <p><strong class='text-black p-1 bg-primary border rounded-3 border-0'>Release Date:</strong><span class='text-white'> ${data.release_date}</span></p>
        <p class='text-white fs-5'>${data.description}</p>
        <a href="${data.game_url}" class='show-game' target="_blank">Show Game</a>
        </div>
      </div>
      </div>
    `;
      const closeBtn = this.container.querySelector(".close-modal");
      closeBtn.addEventListener("click", function () {
        const ui = new Ui("#rowData");
        const navs = document.querySelectorAll(".nav-link");
        navs.forEach((nav) =>
          nav.classList.contains("active") ? nav.classList.remove("active") : ""
        );
        ui.getGamesData("mmorpg");
      });
    }
  }
}

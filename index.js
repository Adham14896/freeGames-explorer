import { Ui } from "./ui.js";
import { Home } from "./home.js";
const navLinks = document.querySelectorAll(".nav-link");
export const spinner = document.querySelector(".loader");
const container = new Ui("#rowData");
const home = new Home();

container.getGamesData();

navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    // if (
    //   home.mainSection.classList.contains("d-none") &&
    //   !home.gameModal.classList.contains("d-none")
    // ) {
    //   home.mainSection.classList.remove("d-none");
    //   home.gameModal.classList.remove("d-none");
    // }
    e.preventDefault();
    e.stopPropagation();
    link.classList.add("active");
    const nav = new Ui("#rowData");
    navLinks.forEach((link) => link.classList.remove("active"));

    e.target.classList.add("active");

    const category = link.getAttribute("data-category");
    nav.getGamesData(category);
  });
});

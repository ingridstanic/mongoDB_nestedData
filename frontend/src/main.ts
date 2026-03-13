import "./style.css";

import { getGames } from "./services/gameService";
import "./style.css";
import { createHtml } from "./utils/htmlUtils";

const games = await getGames();
createHtml(games);

document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  let userEmail = (document.getElementById("emailInput") as HTMLInputElement)
    .value;

  let userPassword = (
    document.getElementById("passwordInput") as HTMLInputElement
  ).value;

  await login(userEmail, userPassword);

  userEmail = "";
  userPassword = "";

  const userGames = await getUserGames();
  createHtml(userGame);
});

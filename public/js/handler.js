const Btn_username = document.querySelector("#USER_NAME");
const MENU_BOX = document.querySelector("#MENU_BOX");
Btn_username.addEventListener("click", (e) => {
  e.preventDefault();
  handle();
});
const handle = () => {
  MENU_BOX.classList.toggle("show");
};

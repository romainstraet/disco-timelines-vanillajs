let modal = document.getElementById("modal-info");
let openBtn = document.getElementById("button-open-modal-info");
let closeBtn = document.getElementById("button-close-modal-info");

openBtn.onclick = function () {
  modal.style.display = "flex";
};

closeBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

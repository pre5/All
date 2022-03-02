const header = document.querySelector("header");
const MenuA = document.querySelector("header a");
let mainContainer = document.querySelector(".sContainer .main");

window.addEventListener("hashchange", hash);
function hash() {
  if (location.hash == "#menu") {
    MenuA.children[0].classList = "fa-solid fa-xmark";
    header.classList.add("act");
    MenuA.href = "#";
  } else {
    MenuA.children[0].classList = "fa-solid fa-bars";
    header.classList.remove("act");
    MenuA.href = "#menu";
  }
}
hash();

let ScrollTop = document.querySelector(".Scroll-Top");
window.onscroll = () => {
  window.scrollY > window.innerHeight
    ? (ScrollTop.style.display = "block")
    : (ScrollTop.style.display = "none");
  scroll();
};

function scroll() {
  document.querySelectorAll(".sections > div").forEach((e) => {
    if (e.offsetTop < window.scrollY +300) {
      e.classList.add("anim");
    }
  });
}

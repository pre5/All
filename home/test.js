const carousel = document.querySelector(".carousel");
const slider = document.querySelector(".slider");
const section = document.querySelectorAll("section");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const header = document.querySelector("header");
const MenuA = document.querySelector("header a");
let stat = document.querySelectorAll("span.num");
let direction;
let lastTime = 0;
let scrollD = false;
next.addEventListener("click", function () {
  lastTime = new Date().getTime();
  slider.style.transform = "translate(-20%)";
  direction = true;
});
prev.addEventListener("click", function () {
  lastTime = new Date().getTime();
  slider.style.transform = "translate(20%)";
  direction = false;
});

slider.addEventListener(
  "transitionend",
  () => {
    section.forEach((e) => {
      e.classList.remove("actS");
    });
    slider.style.transition = "none";
    if (direction) {
      slider.prepend(slider.lastElementChild);
    } else {
      slider.appendChild(slider.firstElementChild);
    }
    slider.style.transform = "translate(0)";
    setTimeout(() => {
      slider.style.transition = "all 0.7s";
    });
    slider.children[2].classList.add("actS");
  },
  false
);

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

function start() {
  hash();
  setInterval(() => {
    if (new Date().getTime() - lastTime > 7000) {
      next.click();
    }
  }, 8700);
}
start();

let ScrollTop = document.querySelector(".Scroll-Top");
window.onscroll = () => {
  if (window.scrollY + 450 > stat[0].offsetTop && scrollD == false) {
    stat.forEach((e) => {
      let lim = +e.dataset.n;
      let rise = setInterval(() => {
        +e.textContent >= lim ? clearInterval(rise) : ++e.textContent;
      }, 3000 / lim);
    });
    scrollD = true;
  }
  if (window.scrollY > window.innerHeight) {
    ScrollTop.style.display = "block";
  } else {
    ScrollTop.style.display = "none";
  }
};

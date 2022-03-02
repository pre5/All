const header = document.querySelector("header");
const MenuA = document.querySelector("header a");
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
window.onscroll = () =>
  window.scrollY > window.innerHeight
    ? (ScrollTop.style.display = "block")
    : (ScrollTop.style.display = "none");

function ableToOpen() 
{  document.querySelectorAll(".level1 > h4 , .level2 > h4 , .level3 > h4 , .docotora > h4").forEach(e =>e.onclick = () => e.nextElementSibling.classList.toggle("hidden"));
}
ableToOpen();

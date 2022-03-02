const header = document.querySelector("header");
const MenuA = document.querySelector("header a");
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
window.addEventListener("hashchange", hash);
hash();

let ScrollTop = document.querySelector(".Scroll-Top");
window.onscroll = () => {
  window.scrollY > window.innerHeight
    ? (ScrollTop.style.display = "block")
    : (ScrollTop.style.display = "none");
};

// every adding
let branches = document.querySelectorAll(".diagram h4");
branches.forEach(
  (e) => (e.onclick = () => e.nextElementSibling.classList.toggle("hidden"))
);

let contentContainer = document.querySelector(".content ol");
// every editing on content [it have right place]
fillContent();
function fillContent() {
  let sectionsTitle = document.querySelectorAll(".main section h3");
  contentContainer.innerHTML = "";
  sectionsTitle.forEach((e, i) => {
    contentContainer.innerHTML += `<li><a href="#s${i}">${e.textContent}</a></li> `;
  });
}

// Every Adding
// make pen icon and trash icon work
// and update content of "content" section
icons();
function icons() {
  let all = document.querySelectorAll(".fa-pen-to-square , .fa-floppy-disk");
  all.forEach((e) => {
    e.onclick = () => {
      e.classList.toggle("fa-pen-to-square");
      e.classList.toggle("fa-floppy-disk");
      e.nextElementSibling.toggleAttribute("contenteditable");
      e.nextElementSibling.focus();
      // right place
      let sectionsTitle = document.querySelectorAll(".main section h3 span");
      contentContainer.innerHTML = "";
      sectionsTitle.forEach(
        (e, i) =>
          (contentContainer.innerHTML += `<li><a href="#s${i}">${e.textContent}</a></li> `)
      );
    };
  });
  document.querySelectorAll(".fa-trash-can").forEach(
    (e) =>
      (e.onclick = () => {
        console.log(e);
        if (
          e.parentElement.tagName == "H4" ||
          e.parentElement.tagName == "H3"
        ) {
          deleteThis = e.parentElement.parentElement;
        } else deleteThis = e.parentElement;
        if (deleteThis.querySelector("span").textContent.trim().length > 20) {
          confirmE.style.display = "block";
          deleteThis.scrollIntoView({ block: "center" });
        } else deleteThis.remove();
      })
  );
}

let deleteThis;
let confirmE = document.querySelector("#confirm");
let deleteConfirm = document.querySelector("#confirm #d");
let cancelConfirm = document.querySelector("#confirm #c");
// let trashE = document.querySelectorAll(".fa-trash-can");

deleteConfirm.onclick = () => {
  deleteThis.remove();
  confirmE.style.display = "none";
};
cancelConfirm.onclick = () => (confirmE.style.display = "none");

let addSection = document.querySelector(".sContainer > .add i");
let mainC = document.querySelector(".sContainer .main");

addSection.onclick = () => {
  let Num = mainC.querySelectorAll("section").length;
  mainC.innerHTML += `
<section>
  <h3 id="s${Num}">
    <i class="fa-solid fa-trash-can"></i>
    <i class="fa-solid fa-pen-to-square"></i>
    <span></span>
  </h3>
  <p>
    <i class="fa-solid fa-trash-can"></i>
    <i class="fa-solid fa-pen-to-square"></i>
    <span></span>
  </p>
</section>`;
  icons();
};

let mainMajors = document.querySelector(".labels");
let addDiagrams1 = document.querySelector(".labels > .addS");
// let addDiagrams2 = document.querySelectorAll(".label > ul > .addS");
// let addDiagrams3 = document.querySelectorAll("ul ul > .addS");

addDiagrams1.onclick = () => {
  let newMajor = document.createElement("div");
  newMajor.classList = "second";
  let secondN =
    1 +
    Number(
      addDiagrams1.previousElementSibling.firstElementChild.dataset.show.slice(
        2
      )
    );
  newMajor.innerHTML = `
<h4 data-show="l-${secondN}">
  <i class="fa-solid fa-trash-can"></i>
  <i class="fa-solid fa-pen-to-square"></i>
  <span>
  تخصص
  </span>
</h4>
<div class="label hideIt" id="l-${secondN}">
                <p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i>
                <span>
                شرح عام حول التخصص
                </span>
                 </p>
                <ul>
                  <li data-show="l-${secondN}-1"><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i>
                  <span>
                  تخصص في ليسانس
                  </span>
                  </li>
                  <ul id="l-${secondN}-1" class="hideIt">
                    <p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i>
                    <span>
                    شرح عام حول التخصص 
                    </span> 
                     </p>
                    <li data-show="l-${secondN}-1-1"><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i>
                    <span>
                    تخصص في الماستر
                    </span>
                    </li>
                    <p class="redP hideIt" id="l-${secondN}-1-1"><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i> 
                    <span>
                    شرح عام حول التخصص
                    </span>
                     </p>
                    <li class="addS"><i class="fa-solid fa-plus"></i></li>
                  </ul>
                  <li class="addS"><i class="fa-solid fa-plus"></i></li>
                </ul>
              </div>
`;
  mainMajors.insertBefore(newMajor, addDiagrams1);
  addDiagram2();
};

addDiagram2();
function addDiagram3() {
  document.querySelectorAll("ul ul > .addS").forEach(
    (e) =>
      (e.onclick = () => {
        let n1 = e.parentElement.id;
        let n2 = e.parentElement.childElementCount / 2;
        let newMajor = document.createElement("li");
        let content = document.createElement("p");
        content.classList = "hideIt";
        content.id = `${n1}-${n2}`;
        content.classList = "redP hideIt";
        content.innerHTML = `
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-solid fa-pen-to-square"></i>
      <span>
      شرح عام حول التخصص 
      </span>`;

        newMajor.dataset.show = `${n1}-${n2}`;
        newMajor.innerHTML = `
      <i class="fa-solid fa-trash-can"></i>
  <i class="fa-solid fa-pen-to-square"></i>
  <span>
  تخصص
  </span>
      `;

        e.parentElement.insertBefore(newMajor, e);
        e.parentElement.insertBefore(content, e);
        showContent();
        icons();
      })
  );
  icons();
  showContent();
}
function addDiagram2() {
  document.querySelectorAll(".label > ul > .addS").forEach(
    (e) =>
      (e.onclick = () => {
        let n1 = e.parentElement.parentElement.id;
        let n2 = (e.parentElement.childElementCount + 1) / 2;
        let newMajor = document.createElement("li");
        let content = document.createElement("ul");
        content.classList = "hideIt";
        content.id = `${n1}-${n2}`;
        content.innerHTML = `
      <p>
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-pen-to-square"></i> 
        <span>
        شرح عام حول التخصص 
        </span>
      </p>
      <li data-show="${n1}-${n2}-1">
        <i class="fa-solid fa-trash-can"></i>
        <i class="fa-solid fa-pen-to-square"></i>
        <span>
        تخصص في الماستر
        </span>
      </li>
      <p class="redP hideIt" id="${n1}-${n2}-1">
      <i class="fa-solid fa-trash-can"></i>
      <i class="fa-solid fa-pen-to-square"></i>
      <span>
      شرح عام حول التخصص 
      </span>
       </p>
      <li class="addS"><i class="fa-solid fa-plus"></i></li>
      `;

        newMajor.dataset.show = `${n1}-${n2}`;
        newMajor.innerHTML = `
      <i class="fa-solid fa-trash-can"></i>
  <i class="fa-solid fa-pen-to-square"></i>
  <span>
  تخصص
  </span>
      `;

        e.parentElement.insertBefore(newMajor, e);
        e.parentElement.insertBefore(content, e);
        addDiagram3();
      })
  );
  addDiagram3();
}
let allContent = [];
function getContent() {
  let section = document.querySelectorAll("section");
  section.forEach((e) => {
    let sectionObj = {};
    sectionObj.Title = e.querySelector("h3 span").textContent.trim();
    sectionObj.para = e.querySelector("p span").textContent.trim();
    if (document.querySelector(".labels")) {
      sectionObj.diagram = getDiagramContent();
    }
    allContent.push(sectionObj);
  });
}

let textQ = document.querySelector("form textarea");
function getDiagramContent() {
  let dObj = {
    first: document.querySelector(".labels .first span").textContent.trim(),
    l1: [],
  };
  if (document.querySelector(".labels .third h4")) {
    dObj.dr = {
      title: document
        .querySelector(".labels .third h4 span")
        .textContent.trim(),
      p: document.querySelector(".labels .third p span").textContent.trim(),
    };
  }
  document.querySelectorAll(".labels .second h4").forEach((e) => {
    let l1Data = {
      title: e.querySelector("span").textContent.trim(),
      p: e.nextElementSibling.querySelector("p span").textContent.trim(),
      l2: [],
    };
    e.nextElementSibling
      .querySelectorAll("div >ul>[data-show]")
      .forEach((a) => {
        let l2Data = {
          title: a.querySelector("span").textContent.trim(),
          p: a.nextElementSibling.querySelector("p span").textContent.trim(),
          l3: [],
        };
        a.nextElementSibling.querySelectorAll("[data-show]").forEach((b) => {
          let l3Data = {
            title: b.querySelector("span").textContent.trim(),
            p: b.nextElementSibling.querySelector("p span").textContent.trim(),
          };
          l2Data.l3.push(l3Data);
        });
        see = a.nextElementSibling.querySelectorAll("[data-show]");
        l1Data.l2.push(l2Data);
      });
    dObj.l1.push(l1Data);
  });
  return dObj;
}

let confirmE = document.querySelector("#confirm");
function ableToEdit() {
  document.querySelectorAll(".fa-pen-to-square").forEach(
    (e) =>
      (e.onclick = () => {
        e.classList.toggle("fa-pen-to-square");
        e.classList.toggle("fa-floppy-disk");
        e.nextElementSibling.toggleAttribute("contenteditable");
        e.nextElementSibling.focus();
        fillContent();
      })
  );
  document.querySelectorAll(".fa-trash-can").forEach(
    (e) =>
      (e.onclick = () => {
        deleteThis = e.parentElement;
        confirmE.style.display = "block";
        deleteThis.scrollIntoView({ block: "center" });
      })
  );
}
ableToEdit();
document.getElementById("delete").onclick = () => {
  deleteThis.remove();
  confirmE.style.display = "none";
};
document
  .querySelectorAll(".cancel")
  .forEach(
    (e) =>
      (e.onclick = () => (e.parentElement.parentElement.style.display = "none"))
  );
let diagram = document.querySelector(".diagram");
let addlevel1 = document.querySelector(".addlevel1");
addlevel1.onclick = (e) => {
  let newMajor = document.createElement("div");
  newMajor.classList = "level1";
  newMajor.innerHTML = `<i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i><span> branch 1 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 1 </span></p><div class="level2"><i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i><span> branch 2 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 2 </span></p><div class="level3"><i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i><span> branch 3 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 3 </span></p></div></div><div class="addlevel3 add"><h4><i class="fa-solid fa-plus"></i></h4></div></div></div><div class="addlevel2 add"><h4><i class="fa-solid fa-plus"></i></h4></div></div>`;
  diagram.insertBefore(newMajor, addlevel1);
  ableToEdit();
  ableToOpen();
  addLevel2F();
};
addLevel2F();
function addLevel2F(params) {
  let addlevel2 = document.querySelectorAll(".addlevel2");
  addlevel2.forEach((e) => {
    e.onclick = () => {
      let newMajor = document.createElement("div");
      newMajor.classList = "level2";
      newMajor.innerHTML = `<i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i>  <span> branch 2 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 2 </span></p><div class="level3"><i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i><span> branch 3 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 3 </span></p></div></div><div class="addlevel3 add"><h4><i class="fa-solid fa-plus"></i></h4></div></div>`;
      e.parentElement.insertBefore(newMajor, e);
      ableToEdit();
      ableToOpen();
      addLevel3F();
    };
  });
  addLevel3F();
}
function addLevel3F() {
  let addlevel3 = document.querySelectorAll(".addlevel3");
  addlevel3.forEach((e) => {
    e.onclick = () => {
      let newMajor = document.createElement("div");
      newMajor.classList = "level3";
      newMajor.innerHTML = `<i class="fa-solid fa-trash-can"></i><h4><i class="fa-solid fa-pen-to-square"></i><span> branch 3 </span></h4><div class="hidden"><p><i class="fa-solid fa-trash-can"></i><i class="fa-solid fa-pen-to-square"></i><span> explain branch 3 </span></p></div>`;
      e.parentElement.insertBefore(newMajor, e);
      ableToEdit();
      ableToOpen();
    };
  });
}
let contentContainer = document.querySelector(".content ol");
fillContent();
function fillContent() {
  let sectionsTitle = document.querySelectorAll(".main section h3");
  contentContainer.innerHTML = "";
  sectionsTitle.forEach((e, i) => {
    contentContainer.innerHTML += `<li><a href="#s${i + 1}">${
      e.textContent
    }</a></li> `;
  });
}
let form = document.querySelector("form");
let allContent = [];
function getContent() {
  let section = document.querySelectorAll("section");
  section.forEach((e) => {
    let sectionObj = {};
    sectionObj.Title = e.querySelector("h3 span").textContent.trim();
    sectionObj.para = e.querySelector("p span").textContent.trim();
    if (e.querySelector(".diagram")) {
      sectionObj.diagram = getDiagramContent();
    }
    allContent.push(sectionObj);
  });
  form.firstElementChild.value = JSON.stringify(allContent);
}
function getDiagramContent() {
  let dObj = {
    first: document.querySelector(".diagram >p span").textContent.trim(),
    l1: [],
  };
  if (document.querySelector(".diagram .docotora h4")) {
    dObj.dr = {
      title: document.querySelector(" .docotora h4 span").textContent.trim(),
      p: document.querySelector(".docotora p span").textContent.trim(),
    };
  }
  document.querySelectorAll(".diagram .level1 > h4").forEach((e) => {
    let l1Data = {
      title: e.querySelector("span").textContent.trim(),
      p: e.nextElementSibling.querySelector("p span").textContent.trim(),
      l2: [],
    };
    e.nextElementSibling.querySelectorAll(".level2 > h4").forEach((a) => {
      let l2Data = {
        title: a.querySelector("span").textContent.trim(),
        p: a.nextElementSibling.querySelector("p span").textContent.trim(),
        l3: [],
      };
      a.nextElementSibling.querySelectorAll(".level3 > h4").forEach((b) => {
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
function verify() {
  let z = true;
  document
    .querySelectorAll(".diagram span , section p span , section h3 span")
    .forEach((a) => {
      if (a.textContent.length < 5) {
        document.getElementById("wrong").style.display = "block";
        a.scrollIntoView({ block: "center" });
        z = false;
        return;
      }
    });
    if (select==0 || document.querySelector('.title input').value.length<6) {
      z=false;
    }
  return z;
}
form.onsubmit = (e) => {
  let check = verify();
  if (!check) {
    e.preventDefault();
    return;
  }
  getContent();
};
let mainContainer = document.querySelector(".sContainer .main");
document.getElementById("addSection").onclick = () => {
  mainContainer.innerHTML += `<section><i class="fa-solid fa-trash-can"></i><h3 id="s10"><i class="fa-solid fa-pen-to-square"></i><span></span> </h3><p><i class="fa-solid fa-pen-to-square"></i><span></span></p></section>`;
  ableToEdit();
};
async function ExtractData() {
  let res = await fetch("../newFolder/Article.json");
  res = await res.json();
  mainContainer.innerHTML = "";
  res.forEach((s) => {
    let finalDiagram = "";
    if (s.diagram) {
      let l1Elements = "";
      let diagram = s.diagram;
      diagram.l1.forEach((l) => {
        let l2Elements = "";
        l.l2.forEach((L2) => {
          let l3Elements = "";
          L2.l3.forEach(
            (L3) =>
              (l3Elements = `<div class="level3"><h4>${L3.title}</h4><div class="hidden"><p>${L3.p}</p></div></div>`)
          );
          l2Elements = `<div class="level2"><h4>${L2.title}</h4><div class="hidden"><p>${L2.p}</p>${l3Elements}</div></div>`;
        });
        l1Elements += `<div class="level1"><h4>${l.title}</h4><div class="hidden"><p>${l.p}</p>${l2Elements}</div></div>`;
      });
      finalDiagram = `<div class="diagram"><p>${diagram.first}</p>${l1Elements}</div>`;
    }
    mainContainer.innerHTML += `<section><h3 id="s10">${s.Title}</h3><p>${s.para}</p>${finalDiagram}</section>`;
  });
  ableToOpen();
  fillContent();
}


let select = document.querySelector('.title select') 


fetch(`${location.href}/MetaData`).then((res)=>
  res.json()
).then(res=>{
  select.innerHTML=""
  res.forEach((o,i)=>{
    select.innerHTML+=`<option value="${i}">${o}</option>`
  })
})

select.onchange=async (e)=>{
  console.log(select.value)
  let res = await fetch(`${location.href}/Articles/${select.value}`)
 res= res.json()
 console.log(res)
}
// fetch(`${location.href}/testm`).then(r=>console.log(r))
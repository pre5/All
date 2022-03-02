const { readFile, writeFile } = require("fs").promises;













async function getd() {
  let res = await readFile("./bacJson/bac2021.json", "utf8");
  let bac = JSON.parse(res);
  let fNames = [];
  let filieres = [];
  bac.forEach((p) => {
    p.data.forEach((r, i) => {
      if (i == 0) return;
      let j = r[3].text;
      j.includes("--") ? (j = j.slice(0, j.indexOf("--") - 1)) : "";
      fNames.push(j);
    });
  });
  fNames = new Set(fNames);
  fNames = [...fNames];
  fNames.forEach((f) => {
    let etbsL = [];
    bac.forEach((p) => {
      p.data.forEach((r, i) => {
        let filiereName=r[3].text
        filiereName.includes("--") ? (filiereName = filiereName.slice(0, filiereName.indexOf("--") - 1)) : filiereName;
        if (filiereName == f){
          etbsL.push({
          ETB: r[1].text,
          moy: [r[4].text, r[5].text, r[6].text],
        });

      }
      });
    });

    filieres.push({
      filiere: f,
      ETBs: etbsL,
    });
  });
  writeFile("./BacMoy/Final.json", JSON.stringify(filieres));
}
getd();

















async function getFilieres() {
  let res = await readFile("./BacMoy/BAC2019", "utf8");
  let bac = JSON.parse(res);
  let fNames = [];
  bac.filter((r) => fNames.push(r.Filiere));
  fNames = new Set(fNames);
  fNames.forEach((f) => {
    async function idk(f) {
      let filieres = [];

      let a = bac.filter((row) => row.Filiere == f);
      let ETBs = [];
      a.forEach((r) => {
        ETBs.push({
          name: r.Etb,
          moy: r.Moy,
        });
      });
      filieres.push({
        name: f,
        ETBs: ETBs,
      });
      await writeFile(
        `./BacMoy/Filieres/"${f}.json"`,
        JSON.stringify(filieres)
      );
    }
    idk(f);
  });

  //   console.log(filieres);
}
// getFilieres();

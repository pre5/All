const express = require("express");
const app = express();
const { readFile, writeFile } = require("fs").promises;
const routes = require("./routes/route");
app.use(express.urlencoded({ extended: false }));

app.use(express.static('../../Jami3atiy'))

app.post("/addArticle", (req, res) => {
  const { name } = req.body;
  //  writeFile('../newFolder/Article.json',name)
  return res.status(200).send(` ${name}`);
});

app.get("/jArticleform2/index.html/MetaData", (req, res) => {
  readFile("./BacMoy/Final.json", "utf8").then((r) => {
    let Obj = JSON.parse(r);
    let fnames = [];
    Obj.forEach((e) => {
      fnames.push(e.filiere);
    });
    res.json(fnames);
  });
});

app.get("/jArticleform2/index.html/Articles/:s", async (req, res) => {
  let n = req.params.s;
  let Obj = await readFile("./BacMoy/Final.json", "utf8");
  let target = JSON.parse(Obj)[n];
  console.log(n);
  console.log(target);
  if (target.Article) {
    res.json(target.Article);
  } else {
    // res.status(404)
    res.status(404).end();
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port} 3000....`);
});

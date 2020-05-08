const dirTree = require("directory-tree");
const fs = require('fs');
const PATH = require('path');

// ENKEL BASEURL VERVANGEN!
const baseUrl = 'https://pgmgent-1920-students.github.io/case1-pgm-website-baas-pgm-lenndery/';

let content = '', lastPath = '';
dirTree("./src", {
    extensions: /[^\.]./
  }, (item, PATH, stats) => {
    content += `
      ${PATH.dirname(item.path) == lastPath ? '' : `<h4><ion-icon name="folder-outline"></ion-icon>${PATH.dirname(item.path)}</h4>`}
      <p class="mb-0">${item.name}</p>
      <a class="d-inline-block mb-3" href="${baseUrl + item.path}" target="_blank">${baseUrl + item.path}</a>
    `;
    lastPath = PATH.dirname(item.path);
  }
)

const indexPage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>oplijsting files | Graduaat Programmeren Arteveldehogeschool</title>
      <link rel="shortcut icon" type='image/png' href="./src/images/favicon_2.png"/>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body class="py-5">
  <header class="container mb-5">
    <h2 class="mb-0">Index</h2>
    <p class="mb-0">Overzicht van alle bestanden in deze repo</p>
  </header>
    <section class="container">
      ${content}
    </section>
    <style>
      h4 {
        margin-left: calc((24px + 10px) * -1);
      }
      ion-icon {
        transform: translateY(5px);
        margin-right: 10px;
      }
    </style>
    <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
  </body>
  </html>
`;

const errorPage = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>pgm.gent | Graduaat Programmeren Arteveldehogeschool</title>
      <meta http-equiv="refresh" content="5; URL="${baseUrl}">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  </head>
  <body>
      <div class="container py-5">
          <h2 class="mb-0">404</h2>
          <p>
              Bestand niet gevonden, je wordt binnen 5 seconden terug naar de index geleidt
          </p>
      </div>
  </body>
  </html>
`;

fs.writeFile('index.html', indexPage, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.writeFile('404.html', errorPage, function (err) {
  if (err) throw err;
  console.log('Saved!');
});

const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/dist/web-liferay'));

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/dist/web-liferay/index.html');
});

app.listen(PORT, () => {
  console.log('servidor iniciado na porta ' + PORT)
})

// const express = require('express');
// const path = require('path');
// const nomeApp = process.env.npm_package_name;
// const app = express();

// app.use(express.static(`${__dirname}/dist/${nomeApp}`));

// app.get('/*', (req, res) => {
// res.sendFile(path.join(`${__dirname}/dist/${nomeApp}/index.html`));
// });

// app.listen(process.env.PORT || 6200);


// const express = require('express');

// const app = express();
// app.use(express.static('./dist/web-liferay'));

// app.get('/*', (req, res) =>
//     res.sendFile('index.html', {root: 'dist/web-liferay/'}),
// );


// app.listen(process.env.PORT || 5000);

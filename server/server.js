const path = require('path');
const express = require('express');
const hbs = require('hbs');

const publicPath = path.join(__dirname , '..', '/public');

let app = express();
let port = process.env.PORT || 5000;

app.set('view engine', 'hbs');
// app.set('view engine', 'html');
// app.engine('html', require('hbs').__express);

app.use(express.static(publicPath));

// app.get('/', (req, res) => {
//   res.render('index')
// });

app.listen(port, () => {
  console.log('Server started on port', port);
});

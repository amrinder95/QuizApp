// server.js
// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// check for testing before using database and seperate routes
// bash usage: $env:NODE_ENV = "testing" & echo $env:NODE_ENV
if (process.env.NODE_ENV !== 'testing') {

  const userApiRoutes = require('./routes/users-api');
  const widgetApiRoutes = require('./routes/widgets-api');
  const usersRoutes = require('./routes/users');

  app.use('/api/users', userApiRoutes);
  app.use('/api/widgets', widgetApiRoutes);
  app.use('/users', usersRoutes);
}

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/users', (req, res) => {
  res.render('users');
});


app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/create-quiz', (req, res) => {
  res.render('create-quiz');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

console.log('\x1b[32mFor testing without database: $env:NODE_ENV = "testing" & echo $env:NODE_ENV\x1b[0m');

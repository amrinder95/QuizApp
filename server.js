// server.js
// load .env data into process.env
require("dotenv").config();

// Web server config
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const morgan = require("morgan");
const answers = require("./db/queries/answers");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const { getQuizzes } = require('./db/queries/quizzes');


const PORT = process.env.PORT || 8080;
const app = express();

// parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use(
  session({
    secret: "quizzy",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static("public"));
app.use(bodyParser.json());
// check for testing before using database and seperate routes
// bash usage: $env:NODE_ENV = "testing" & echo $env:NODE_ENV
if (process.env.NODE_ENV !== "testing") {
  const userApiRoutes = require("./routes/users-api");
  const widgetApiRoutes = require("./routes/widgets-api");
  const usersRoutes = require("./routes/users");
  const registerRoutes = require("./routes/register.js");
  const loginRoutes = require("./routes/login.js");
  const createQuizRoutes = require("./routes/create-quiz");
  const quizzesApiRoutes = require("./routes/quizzes-api");
<<<<<<< HEAD
  const quizRoutes = require('./routes/quiz');
=======
  const myquizzesApiRoutes = require("./routes/myquizzes-api")
>>>>>>> origin/amrinder/wip

  app.use("/api/users", userApiRoutes);
  app.use("/api/widgets", widgetApiRoutes);
  app.use("/users", usersRoutes);
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/create-quiz", createQuizRoutes);
  app.use("/api/quizzes", quizzesApiRoutes);
<<<<<<< HEAD
  app.use('/', quizRoutes);
=======
  app.use("/api/myquizzes", myquizzesApiRoutes);
>>>>>>> origin/amrinder/wip
}

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", async (req, res) => {
  try {
    const quizzes = await getQuizzes();
    
    res.render("index", { quizzes });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get("/users", (req, res) => {
  res.render("users");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

console.log(
  '\x1b[32mFor testing without database: $env:NODE_ENV = "testing" & echo $env:NODE_ENV\x1b[0m'
);

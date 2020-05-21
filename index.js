const express = require("express");
const path = require("path");
const http = require("http");
const exphbs = require("express-handlebars");
const sass = require("node-sass-middleware");
const reload = require("reload");

const app = express();

// call router
//const login = require('./router/login');

const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// set view engine
app.engine(
  "hbs",
  exphbs({
    layoutsDir: "views/_layouts",
    defaultLayout: "layout",
    partialsDir: "views/_partials",
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");

// use dependencies library
app.use(
  "/bootstrap",
  express.static(`${__dirname}/node_modules/bootstrap/dist`)
);
app.use("/jquery", express.static(`${__dirname}/node_modules/jquery/dist`));
app.use(
  "/popper",
  express.static(`${__dirname}/node_modules/popper.js/dist/umd`)
);
//app.use('/reload', express.static(`${__dirname}/node_modules/reload/lib`))

// use sass-midleware
app.use(
  sass({
    src: __dirname + "/public", //where the sass files are
    dest: __dirname + "/public", //where css should go
    debug: true, // obvious
    outputStyle: "compressed",
  })
);

// use static file
app.use("/", express.static(path.join(__dirname, "public")));

// use router
// app.use('/login', login);

app.get("/", (req, res) => {
  res.render("index");
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

reload(app).then(() => {
  console.log("Page reloaded!");
});

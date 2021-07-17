const express = require("express");
const members = require("./Members");
const exphbs = require("express-handlebars");
const path = require("path");
const logger = require("./middleware/logger");

const app = express();

// Init middleware
// app.use(logger);

app.engine(
	"handlebars",
	exphbs({
		defaultLayout: "main",
	})
);
app.set("view engine", "handlebars");

// Body Parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) =>
	res.render("index", {
		title: "Member App",
		members,
	})
);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Members api routes
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const port = 3000

// Connection to database
require("./mongo")

// Controllers
const {createUser, logUser} = require("./controllers/users")
const {getSauces, createSauces} = require("./controllers/sauces")

// Middleware
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
const {authenticateUser} = require("./middleware/auth")

// Routes
app.post("/api/auth/signup", createUser)
app.post("/api/auth/login", logUser)
app.get("/api/sauces", authenticateUser, getSauces)
app.post("/api/sauces", authenticateUser, createSauces)
app.get("/", (req, res) => res.send("Hello World!"))

// Listen
app.listen(port, () => console.log("Listening on port " + port))


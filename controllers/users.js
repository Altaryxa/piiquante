const {User} = require("../mongo")
const bcrypt = require("bcrypt")

async function createUser(req, res) {
  const {email, password} = req.body

  const hashedPassword = await hashPassword(password)

  const user = new User({email, password: hashedPassword})

  user
    .save()
    .then(() => res.status(201).send({message: "Signup successful !"}))
    .catch((err) => res.status(409).send({message: "User not saved :" + err}))
}

function hashPassword(password) {
  const saltRounds = 10
  return bcrypt.hash(password, saltRounds)
}

function logUser(req, res) {
  
}

module.exports = {createUser, logUser}
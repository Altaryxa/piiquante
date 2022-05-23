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

async function logUser(req, res) {
  const email = req.body.email
  const password = req.body.password
  const user = await User.findOne({email: email, password: password})

  const isPasswordOk = await bcrypt.compare(password, user.password)
  if (!isPasswordOk) {
    res.status(403).send ({message: "Incorrect Password"})
  }
    res.status(200).send({message: "Connected"})
}

module.exports = {createUser, logUser}
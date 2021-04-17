const User = require('../models/user');

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch {
    res.status(500).send();
  }
}

const registerNewUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const authToken = await user.generateAuthToken();
    res.status(201).send({ user, authToken });
  } catch (error) {
    res.status(400).send(error);
  }
}

const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const authToken = await user.generateAuthToken();
    res.send({ user, authToken });
  } catch (error) {
    res.status(400).send({message: 'Incorrect email or password!'});
  }
}

module.exports = {
  logoutUser,
  registerNewUser,
  signinUser,
}

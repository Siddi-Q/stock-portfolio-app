const User = require('../models/user');

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

module.exports = {
  registerNewUser,
}

const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const authRouter = new express.Router();

authRouter.post('/register', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const authToken = await user.generateAuthToken();
        res.status(201).send({ user, authToken });
    } catch (error) {
        res.status(400).send(error);
    }
});

authRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const authToken = await user.generateAuthToken();
        res.send({ user, authToken });
    } catch (error) {
        res.status(400).send({message: "Incorrect email or password!"});
    }
});

authRouter.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch {
        res.status(500).send();
    }
});

authRouter.post('/verify', auth, (req, res) => {
    try {
        res.send(true);
    } catch (error) {
        res.status(500).send({message: "Server error!"});
    }
});

module.exports = authRouter;
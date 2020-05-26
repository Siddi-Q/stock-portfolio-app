const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// Todo: Add additional validation. Separate into two collections.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    balance: {
        type: Number,
        default: 5000,
        required: true
    },
    transactions: { // Todo: update later
        type: Array,
        default: [],
        required: true
    },
    portfolio: { // Todo: update later
        type: Array,
        defaul: [],
        required: true
    },
    tokens: [{
        token: {
            type: String
        }
    }]
});

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();

    delete userObject.password;
    delete userObject.tokens;

    return userObject;
};

userSchema.methods.generateAuthToken = async function () {
    const authToken = jwt.sign({ _id: this._id.toString() }, process.env.privateKey);
    this.tokens = this.tokens.concat({ token: authToken });
    await this.save();
    return authToken;
};

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
};

userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
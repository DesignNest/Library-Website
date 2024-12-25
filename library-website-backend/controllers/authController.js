const User = require('../models/authSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mustansir@2010';  // Use a strong, unique secret key

module.exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (user) {
            const userPassword = await bcrypt.compare(password, user.password);

            if (!userPassword) {
                res.status(400).json({ message: 'Your Password Is Invalid' });
            } else {
                const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '15d' });
                res.status(200).json({ message: 'You Successfully Logged In', token });
            }
        } else {
            res.status(400).json({ message: 'Username Not Found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.status(400).json({ message: 'Username already exists' });
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ username, email, password: hashedPassword });
            await newUser.save();

            const token = jwt.sign({ username: newUser.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(201).json({ message: 'User registered successfully', token });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Chemin vers le fichier JSON
const usersFilePath = path.join(__dirname, '../users.json');

// Fonction pour lire les utilisateurs depuis le fichier JSON
const readUsersFromFile = () => {
    const usersData = fs.readFileSync(usersFilePath);
    return JSON.parse(usersData);
};

// Fonction pour écrire les utilisateurs dans le fichier JSON
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Register a new user
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    console.log(username, email, password)

    try {
        let users = readUsersFromFile();
        let user = users.find((user) => user.email === email);
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = { username, email, password: hashedPassword };
        users.push(user);
        writeUsersToFile(users);

        const payload = {
            user: {
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Authenticate user and get token
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let users = readUsersFromFile();
        let user = users.find((user) => user.email === email);
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = {
            user: {
                email: user.email,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
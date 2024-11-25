const express = require('express');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const db = require('./database');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body Parser middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (for profile picture)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Setup multer for file uploads
const upload = multer({
    dest: 'uploads/', // Directory to store uploaded files
    limits: { fileSize: 2 * 1024 * 1024 }, // Max file size 2MB
}).single('profile-picture');

// Signup route
app.post('/signup', upload, (req, res) => {
    const { email, password, isGuide, name, lastname, phone, address } = req.body;
    
    // Check if email already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error checking email');
        }
        
        if (row) {
            return res.status(400).send('Email already in use');
        }

        // Hash password
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error hashing password');
            }

            const profilePicture = req.file ? req.file.filename : null;

            // Insert the user into the database
            db.run(
                `INSERT INTO users (email, password, is_guide, name, lastname, phone, address, profile_picture)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [email, hashedPassword, isGuide ? 1 : 0, name, lastname, phone, address, profilePicture],
                function (err) {
                    if (err) {
                        console.error(err);
                        return res.status(500).send('Error inserting user');
                    }
                    res.status(200).send('User registered successfully');
                }
            );
        });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error logging in');
        }

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Compare hashed password
        bcrypt.compare(password, user.password, (err, match) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error comparing passwords');
            }

            if (match) {
                res.status(200).send('Login successful');
            } else {
                res.status(400).send('Invalid email or password');
            }
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

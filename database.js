const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error("Could not connect to database", err);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Create Users table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    is_guide BOOLEAN DEFAULT 0,
    name TEXT,
    lastname TEXT,
    phone TEXT,
    address TEXT,
    profile_picture TEXT
);`);

module.exports = db;

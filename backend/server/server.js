const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); // Allow React to connect from a different origin

const db = new sqlite3.Database('database.db');

// Create sample table and data if not exists
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL
    )
  `);

  // Insert some sample data if table is empty
  db.all('SELECT COUNT(*) AS count FROM users', (err, rows) => {
    if (rows[0].count === 0) {
      const stmt = db.prepare('INSERT INTO users (name, age) VALUES (?, ?)');
      stmt.run('Alice', 25);
      stmt.run('Bob', 30);
      stmt.run('Charlie', 22);
      stmt.finalize();
    }
  });
});

// GET endpoint for data.json
app.get('/data.json', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Transform into shape React expects (simplified here)
    const result = {
      users: {
        name: rows.map(row => row.name),
        age: rows.map(row => row.age),
      }
    };

    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

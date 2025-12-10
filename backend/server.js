const express = require('express');
const cors = require('cors');
const { getPool } = require('./db');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',   // allow frontend
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// health endpoint for Kubernetes readiness/liveness probes
app.get('/health', (req, res) => res.sendStatus(200));

// sample submit route
app.post('/submit', async (req, res) => {
  try {
    const pool = await getPool();
    const { name, email } = req.body;

    await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);

    res.json({ message: "Data stored successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "DB Error" });
  }
});

app.get("/submissions", async (req, res) => {
  try {
    const pool = await getPool();
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows); // MUST return an array
  } catch (err) {
    console.error("DB ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mysql = require('mysql2/promise');
const { dbConfig } = require('./config');
const { dbQueryWithData } = require('./helper');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Sukuriame tris route'us: GET "/items" ir POST "/items", DELETE "/items/:id".

// GET /api/items - paims visus irasus
app.get('/api/items', async (req, res) => {
  let limit = req.query.limit || 10;
  limit = Math.min(Math.max(parseInt(limit), 1), 100);
  const sql = 'SELECT * FROM `items`LIMIT ?';
  const [rows, error] = await dbQueryWithData(sql, [limit]);
  console.log('error ===', error);
  res.json(rows);
});

// POST /api/items - įrašys vieną naują darba į duomenų bazę.
app.post('/api/items', async (req, res) => {
  const { item_title, item_timestamp } = req.body;
  const sql = `INSERT INTO items 
    (item_title, item_timestamp ) 
    VALUES (?, ?)`;
  const [rezObj, error] = await dbQueryWithData(sql, [
    item_title,
    item_timestamp,
  ]);

  console.log('error ===', error);
  res.json(rezObj);
});

// DELETE /api/items/: id -ištrins pagal ID vieną prekę
app.delete('/api/items/:id', async (req, res) => {
  let conn;
  const id = +req.params.id;
  try {
    conn = await mysql.createConnection(dbConfig);
    const delSQL = `
      DELETE FROM items 
      WHERE item_id=?
      LIMIT 1
      `;
    // vykdyti uzklausa
    const [rezObj] = await conn.execute(delSQL, [id]);
    if (rezObj.affectedRows !== 0) {
      res.sendStatus(202);
      return;
    }
    res.json({ msg: 'no affected rows' });
  } catch (error) {
    // jei yra klaida tai klaidos blokas
    console.log(error);
    console.log('klaida sukurti posta');
    res.status(500).json({
      msg: 'Something went wrong',
    });
  } finally {
    // atsijungti nuo DB jei prisijungimas buvo
    if (conn) conn.end();
  }
});

// connect
async function testConnection() {
  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    await conn.query('SELECT * FROM posts LIMIT 1');
    console.log('Succesfuly connected to mysql ');
  } catch (error) {
    console.log('testConnection failed, did you start XAMPP mate???');
    console.log('error ===', error);
  } finally {
    if (conn) conn.end();
  }
}
// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});

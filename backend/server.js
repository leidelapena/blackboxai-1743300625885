const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const Database = require('better-sqlite3');

const app = express();
const upload = multer({ dest: 'uploads/' });
const db = new Database('erp.db');

// Create tables if they don't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS erp_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch_name TEXT,
    department TEXT,
    custom_field1 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS warehouse_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_code TEXT,
    quantity INTEGER,
    ${/* Add other warehouse fields here */''}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    employee_id TEXT,
    full_name TEXT,
    ${/* Add other HR fields here */''}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS crm_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT,
    contact_email TEXT,
    ${/* Add other CRM fields here */''}
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`).run();

app.use(cors());
app.use(express.json());

// Bulk Import Endpoint with Validation
app.post('/api/import/:module', upload.single('file'), async (req, res) => {
  const { module } = req.params;
  const filePath = req.file.path;
  const results = [];
  const requiredFields = {
    erp: ['branch_name', 'department'],
    warehouse: ['item_code', 'quantity'],
    crm: ['customer_name', 'contact_email'],
    hr: ['employee_id', 'full_name']
  };

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        // Validate CSV structure
        if (requiredFields[module]) {
          const missingFields = requiredFields[module].filter(
            field => !results[0] || !results[0][field]
          );
          if (missingFields.length > 0) {
            throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
          }
        }

        const tableName = module === 'hr' ? 'employees' : `${module}_data`;
        const columns = Object.keys(results[0]);
        const placeholders = columns.map(() => '?').join(', ');
        const insert = db.prepare(
          `INSERT INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`
        );

        const transaction = db.transaction(() => {
          results.forEach(row => {
            insert.run(columns.map(col => row[col]));
          });
        });

        transaction();
        res.status(200).json({ success: true, imported: results.length });
      } catch (err) {
        // SQLite automatically rolls back on error
        res.status(500).json({ error: err.message });
      } finally {
        fs.unlinkSync(filePath); // Cleanup
      }
    });
});

// Data viewing endpoint
app.get('/api/data/:table', async (req, res) => {
    try {
        const table = req.params.table;
        const data = db.prepare(`SELECT * FROM ${table}`).all();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve static files
app.use(express.static('public'));

app.listen(3000, () => console.log('Server running on port 3000'));

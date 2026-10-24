const { readFile } = require('node:fs/promises')
const path = require('node:path')
const { Pool } = require('pg')

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

async function setupDatabase() {
  try {
    // Read schema.sql from the same folder as this script.
    const sql = await readFile(
      path.join(__dirname, 'schema.sql'),
      'utf8'
    )

    // Send the SQL instructions to PostgreSQL.
    await pool.query(sql)
    console.log('Photos table setup completed.')
  } catch (error) {
    console.error('Table setup failed:', error.message)
    process.exitCode = 1
  } finally {
    // Release database connections when the script finishes.
    await pool.end()
  }
}

setupDatabase()
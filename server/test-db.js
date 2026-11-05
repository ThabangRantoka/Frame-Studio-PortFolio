const { Pool } = require('pg')

// Read the connection URL from the environment.
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

// A pool manages reusable database connections.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

async function testConnection() {
  try {
    // Ask PostgreSQL to calculate a value without changing any data.
    const result = await pool.query('SELECT 1 AS connected')
    console.log('Database connected:', result.rows[0].connected === 1)
  } catch (error) {
    console.error('Database connection failed:', error.code || 'Unknown error')
    process.exitCode = 1
  } finally {
    // Close connections so this test script can finish.
    await pool.end()
  }
}

testConnection()
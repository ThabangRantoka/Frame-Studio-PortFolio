const express = require('express')
const { Pool } = require('pg')

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

const app = express()
const PORT = process.env.PORT || 3000

// Reuse this pool for incoming database requests.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

// Handle unexpected errors from idle database connections.
pool.on('error', (error) => {
  console.error('Database pool error:', error.code || 'Unknown error')
})

// Check whether the API server responds.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Frame Studio API is running',
  })
})

// Read the gallery records from PostgreSQL.
app.get('/api/photos', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, category, file, alt FROM photos ORDER BY id'
    )

    res.json(result.rows)
  } catch (error) {
    console.error('Loading photos failed:', error.code || 'Unknown error')

    // Return a useful message without exposing database details.
    res.status(500).json({
      message: 'Unable to load photos. Please try again later.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Frame Studio API: http://localhost:${PORT}`)
})
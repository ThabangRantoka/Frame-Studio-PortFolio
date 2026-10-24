// Load Express using the CommonJS format in our package.json.
const express = require('express')

// Create the backend application.
const app = express()
const PORT = process.env.PORT || 3000

// A health route lets us check whether the server responds.
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Frame Studio API is running',
  })
})

// Start listening for incoming HTTP requests.
app.listen(PORT, () => {
  console.log(`Frame Studio API: http://localhost:${PORT}`)
})
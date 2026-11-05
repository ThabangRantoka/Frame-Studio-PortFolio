const { Pool } = require('pg')

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 15000,
})

// Initial gallery data, copied from our Week 2 collection.
const photos = [
  {
    title: 'Red umbrella',
    category: 'Street',
    file: 'street-umbrella.jpg',
    alt: 'A person with a red umbrella crosses a rain-soaked city street.',
  },
  {
    title: 'By the window',
    category: 'Portrait',
    file: 'portrait-window.jpg',
    alt: 'An elderly woman smiles beside a window.',
  },
  {
    title: 'Morning valley',
    category: 'Landscape',
    file: 'landscape-valley.jpg',
    alt: 'Mist fills a mountain valley at sunrise.',
  },
  {
    title: 'Terracotta',
    category: 'Portrait',
    file: 'portrait-wall.jpg',
    alt: 'A young man in a denim jacket stands against a terracotta wall.',
  },
  {
    title: 'Morning paper',
    category: 'Street',
    file: 'street-cafe.jpg',
    alt: 'An older man reads a newspaper in a café.',
  },
  {
    title: 'Dune lines',
    category: 'Landscape',
    file: 'landscape-dunes.jpg',
    alt: 'Sand dunes cast long shadows at sunset.',
  },
  {
    title: 'Alley match',
    category: 'Street',
    file: 'street-alley.jpg',
    alt: 'Children play football in a sunlit alley.',
  },
  {
    title: 'Golden hour laugh',
    category: 'Portrait',
    file: 'portrait-laugh.jpg',
    alt: 'A woman with long braids laughs outdoors.',
  },
  {
    title: 'Still water',
    category: 'Landscape',
    file: 'landscape-lake.jpg',
    alt: 'Mountains and pine trees reflect in a still lake.',
  },
]

async function seedDatabase() {
  let client

  try {
    client = await pool.connect()

    // A transaction saves all nine records together.
    await client.query('BEGIN')

    for (const photo of photos) {
      // Placeholders keep the values separate from SQL instructions.
      // Matching filenames are updated instead of duplicated.
      await client.query(
        `INSERT INTO photos (title, category, file, alt)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (file) DO UPDATE SET
           title = EXCLUDED.title,
           category = EXCLUDED.category,
           alt = EXCLUDED.alt`,
        [photo.title, photo.category, photo.file, photo.alt]
      )
    }

    await client.query('COMMIT')
    console.log(`Seed completed: ${photos.length} photos saved.`)
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK')
    }

    console.error('Seed failed:', error.message)
    process.exitCode = 1
  } finally {
    if (client) {
      client.release()
    }

    await pool.end()
  }
}

seedDatabase()
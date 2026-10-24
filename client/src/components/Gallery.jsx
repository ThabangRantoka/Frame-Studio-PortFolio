import { useState } from 'react'
import { photos } from '../data/photos'
import FavouriteToggle from './FavouriteToggle'

// Derive categories from the data instead of maintaining a second list.
const categories = ['All', ...new Set(photos.map((photo) => photo.category))]

export default function Gallery() {
  const [category, setCategory] = useState('All')

  // Store favourite values by photo ID, independently of the current filter.
  const [favourites, setFavourites] = useState({})

  const visiblePhotos = photos.filter(
    (photo) => category === 'All' || photo.category === category,
  )

  const savedCount = photos.filter(
    (photo) => favourites[photo.id],
  ).length

  function updateFavourite(id, selected) {
    // Create a new object; never modify React state directly.
    setFavourites((previous) => ({
      ...previous,
      [id]: selected,
    }))
  }

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="mx-auto max-w-7xl border-t border-[#d9cfbd] px-6 py-12 md:py-20"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-[#a94f32]">
        01 — Selected work
      </p>

      <h2 id="gallery-title" className="mt-4 font-serif text-4xl md:text-5xl">
        Gallery
      </h2>

      <p className="mt-4 max-w-2xl leading-relaxed text-[#5e5a54]">
        All images are AI-generated examples for this student project.
        Select a photograph to open it full size in a new tab.
      </p>

      <div
        role="group"
        aria-label="Filter photographs by category"
        className="mt-8 flex flex-wrap gap-3"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={`rounded-full border px-5 py-2 text-sm
              focus-visible:outline-2 focus-visible:outline-offset-4
              ${
                category === item
                  ? 'border-[#2b2a28] bg-[#2b2a28] text-white'
                  : 'border-[#d9cfbd] hover:border-[#a94f32]'
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      <p
        role="status"
        className="mt-5 text-sm text-[#5e5a54]"
      >
        Showing {visiblePhotos.length} of {photos.length} photographs
        {' · '}
        {savedCount} saved. Favourites reset when you reload.
      </p>

      {/* Mobile first: 1 column, then 2 on tablets and 3 on desktops. */}
      <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePhotos.map((photo) => {
          const imageUrl =
            `${import.meta.env.BASE_URL}images/${photo.file}`

          return (
            <figure key={photo.id} className="min-w-0">
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener"
                aria-label={`View ${photo.title} full size in a new tab`}
                className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4"
              >
                <img
                  src={imageUrl}
                  alt={photo.alt}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              </a>

              <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{photo.title}</p>
                  <p className="text-sm text-[#5e5a54]">
                    {photo.category}
                  </p>
                </div>

                <FavouriteToggle
                  title={photo.title}
                  selected={Boolean(favourites[photo.id])}
                  onChange={(selected) =>
                    updateFavourite(photo.id, selected)
                  }
                />
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}
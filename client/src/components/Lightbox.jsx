import { useEffect, useRef } from 'react'

export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const photo = photos[index]

  useEffect(() => {
    const dialog = dialogRef.current
    const opener = document.activeElement   // remember what was clicked
    if (!dialog.open) dialog.showModal()    // browser handles backdrop + focus
    return () => opener?.focus()            // give focus back on close
  }, [])

  function go(i) {
    onNavigate((i + photos.length) % photos.length) // wraps round
  }

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') go(index - 1)
    if (e.key === 'ArrowRight') go(index + 1)
  }

  const btn =
    'h-10 w-10 shrink-0 rounded-full border border-[#f6f1e7]/40 text-xl ' +
    'hover:bg-[#f6f1e7] hover:text-[#2b2a28] focus-visible:outline-2 focus-visible:outline-offset-2'

  return (
    <dialog
      ref={dialogRef}
      aria-label="Photograph viewer"
      onClose={onClose}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        if (!e.target.closest('img, button, figcaption')) onClose()
      }}
      className="m-0 h-full max-h-none w-full max-w-none items-center gap-3 border-0 bg-transparent p-4 text-[#f6f1e7] open:grid open:grid-cols-[auto_minmax(0,1fr)_auto] backdrop:bg-[#181614]/95"
    >
      <button type="button" aria-label="Close viewer" onClick={onClose}
        className={`${btn} absolute right-4 top-4`}>&times;</button>

      <button type="button" aria-label="Previous photograph"
        onClick={() => go(index - 1)} className={btn}>&larr;</button>

      <figure className="grid min-w-0 justify-items-center gap-3">
        <img
          src={`${import.meta.env.BASE_URL}images/${photo.file}`}
          alt={photo.alt}
          className="max-h-[80vh] w-auto max-w-full object-contain"
        />
        <figcaption className="text-center text-sm text-[#e9e1d1]">
          {photo.title} — {photo.category} ({index + 1} of {photos.length})
        </figcaption>
      </figure>

      <button type="button" aria-label="Next photograph"
        onClick={() => go(index + 1)} className={btn}>&rarr;</button>
    </dialog>
  )
}
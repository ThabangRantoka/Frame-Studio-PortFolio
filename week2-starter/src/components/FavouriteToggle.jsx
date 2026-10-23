// Controlled component: the parent supplies its value and updates it.
// This component does not keep a separate copy of the favourite state.
export default function FavouriteToggle({ selected, onChange, title }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`Favourite: ${title}`}
      onClick={() => onChange(!selected)}
      className={`shrink-0 rounded-full border px-3 py-2 text-sm
        focus-visible:outline-2 focus-visible:outline-offset-4
        ${
          selected
            ? 'border-[#a94f32] bg-[#a94f32] text-white'
            : 'border-[#d9cfbd] text-[#5e5a54] hover:border-[#a94f32]'
        }`}
    >
      <span aria-hidden="true">{selected ? '♥' : '♡'}</span>
      <span className="ml-1">{selected ? 'Saved' : 'Save'}</span>
    </button>
  )
}
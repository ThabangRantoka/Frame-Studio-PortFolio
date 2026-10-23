export default function Header() {
  return (
    <header
      id="top"
      className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-b border-[#d9cfbd] px-6 py-6 md:flex-row md:justify-between"
    >
      <a href="#top" className="text-center font-serif text-3xl">
        Thabang Frame Studio
      </a>

      <nav aria-label="Main navigation">
        <ul className="flex flex-wrap justify-center gap-6 text-sm">
          <li>
            <a
              href="#gallery"
              className="hover:text-[#a94f32] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Gallery
            </a>
          </li>

          <li>
            <a
              href="#about"
              className="hover:text-[#a94f32] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-[#a94f32] focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col items-center gap-4 border-t border-[#d9cfbd] px-6 py-8 text-center text-sm text-[#5e5a54] md:flex-row md:justify-between">
      <p className="font-serif text-2xl text-[#2b2a28]">
        Thabang Frame Studio
      </p>

      <p>
        &copy; {new Date().getFullYear()} Thabang Rantoka · Student portfolio
      </p>

      <a
        href="#top"
        className="underline underline-offset-4 hover:text-[#a94f32] focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Back to top &uarr;
      </a>
    </footer>
  )
}
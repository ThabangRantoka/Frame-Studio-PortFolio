export default function About() {
  const imageUrl =
    `${import.meta.env.BASE_URL}images/photographer.jpg`

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto grid max-w-7xl gap-8 border-t border-[#d9cfbd] px-6 py-12 md:grid-cols-2 md:items-center md:gap-16 md:py-20"
    >
      <img
        src={imageUrl}
        width="768"
        height="1024"
        loading="lazy"
        alt="AI-generated illustration of a photographer holding a camera."
        className="aspect-[4/5] w-full max-w-sm object-cover"
      />

      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-widest text-[#a94f32]">
          02 — About the project
        </p>

        <h2
          id="about-title"
          className="mt-4 font-serif text-4xl md:text-5xl"
        >
          A different way of seeing.
        </h2>

        <p className="mt-6 max-w-lg leading-relaxed text-[#5e5a54]">
          Thabang Frame Studio is a concept photography portfolio
          developed by Thabang Rantoka in Pretoria, South Africa,
          for the BrewHaus practicum.
        </p>

        <p className="mt-4 max-w-lg leading-relaxed text-[#5e5a54]">
          The collection explores natural light, human expression
          and everyday places through AI-generated demo imagery.
        </p>
      </div>
    </section>
  )
}
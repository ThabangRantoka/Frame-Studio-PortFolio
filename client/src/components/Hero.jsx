export default function Hero() {
  // BASE_URL keeps image paths compatible with a future GitHub Pages deployment.
  const heroImage = `${import.meta.env.BASE_URL}images/hero.jpg`

  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-12 md:grid-cols-2 md:gap-12 md:py-20"
    >
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a94f32]">
          Portraits · Street · Landscape
        </p>

        {/* Keep exactly one main heading on the page. */}
        <h1
          id="hero-title"
          className="mt-6 max-w-[10ch] font-serif text-5xl leading-tight md:text-7xl"
        >
          Stories told through light.
        </h1>

        <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-[#5e5a54]">
          An exploration of people, places and everyday moments—
          presented through a carefully curated collection of visual stories.
        </p>

        <a
          href="#gallery"
          className="mt-6 inline-block py-2 font-bold text-[#a94f32] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          Explore the gallery &rarr;
        </a>
      </div>

      <figure className="min-w-0">
        {/* object-cover fills the frame without stretching the image. */}
        <img
          src={heroImage}
          width="1600"
          height="1072"
          alt="A lone figure stands on a rocky coastal cliff overlooking the sea at golden hour."
          className="aspect-[3/2] w-full object-cover md:aspect-square"
        />
      </figure>
    </section>
  )
}
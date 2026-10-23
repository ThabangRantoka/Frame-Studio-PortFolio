export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto max-w-7xl border-t border-[#d9cfbd] px-6 py-12 text-center md:py-20"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-[#a94f32]">
        03 — Get in touch
      </p>

      <h2
        id="contact-title"
        className="mx-auto mt-4 max-w-lg font-serif text-4xl md:text-5xl"
      >
        Let’s start a conversation.
      </h2>

      <p className="mx-auto mt-6 max-w-lg leading-relaxed text-[#5e5a54]">
        Have a question about this portfolio or an idea for a website?
        Send me an email.
      </p>

      {/* Opens an email draft; the visitor sends it from their email app. */}
      <a
        href="mailto:thabangrantoka@gmail.com?subject=Frame%20Studio%20Enquiry"
        className="mt-8 inline-block border border-[#a94f32] bg-[#a94f32] px-8 py-4 font-bold text-white hover:bg-transparent hover:text-[#a94f32] focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        Email Thabang &rarr;
      </a>

      <p className="mt-6 text-sm text-[#5e5a54]">
        <a
          href="mailto:thabangrantoka@gmail.com"
          className="break-all underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          thabangrantoka@gmail.com
        </a>
      </p>

      <p className="mt-3 text-sm text-[#5e5a54]">
        The button opens your email app.
        You can also copy the address above.
      </p>
    </section>
  )
}
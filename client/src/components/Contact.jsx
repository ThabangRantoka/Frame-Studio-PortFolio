import { useEffect, useRef, useState } from 'react'

// Store the address once so all contact actions use the same value.
const EMAIL = 'thabangrantoka@gmail.com'

export default function Contact() {
  const [copyMessage, setCopyMessage] = useState('')

  // A ref remembers the timer without causing another render.
  const messageTimer = useRef(null)

  useEffect(() => {
    // Clear the timer if this component leaves the page.
    return () => {
      window.clearTimeout(messageTimer.current)
    }
  }, [])

  async function copyEmail() {
    window.clearTimeout(messageTimer.current)

    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopyMessage('Email address copied.')
    } catch {
      // The address stays visible if clipboard access is unavailable.
      setCopyMessage(
        'Could not copy automatically. Please select the email address below.',
      )
    }

    messageTimer.current = window.setTimeout(() => {
      setCopyMessage('')
    }, 4000)
  }

  const buttonClasses =
    'inline-flex min-h-12 items-center justify-center border ' +
    'border-[#a94f32] px-6 py-3 font-bold ' +
    'focus-visible:outline-2 focus-visible:outline-offset-4 ' +
    'focus-visible:outline-[#a94f32]'

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

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {/* Opens the visitor's configured email application. */}
        <a
          href={`mailto:${EMAIL}?subject=Frame%20Studio%20Enquiry`}
          className={`${buttonClasses} bg-[#a94f32] text-white hover:bg-transparent hover:text-[#a94f32]`}
        >
          Email Thabang &rarr;
        </a>

        <button
          type="button"
          onClick={copyEmail}
          className={`${buttonClasses} text-[#a94f32] hover:bg-[#a94f32] hover:text-white`}
        >
          Copy email
        </button>
      </div>

      {/* Screen readers announce changes to this message. */}
      <p
        role="status"
        className="mx-auto mt-4 min-h-12 max-w-lg text-sm text-[#a94f32]"
      >
        {copyMessage}
      </p>

      <p className="mt-2 text-sm text-[#5e5a54]">
        <a
          href={`mailto:${EMAIL}`}
          className="break-all underline underline-offset-4"
        >
          {EMAIL}
        </a>
      </p>
    </section>
  )
}
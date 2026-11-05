import { useState } from 'react'
import { authClient } from '../lib/auth'

export default function Account() {
  // The SDK checks the saved session, including after a page refresh.
  const { data: session, isPending, error: sessionError } =
    authClient.useSession()

  // Controlled inputs: React stores each field's current value.
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    // Submit through the SDK without reloading the page.
    event.preventDefault()
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const result =
        mode === 'signup'
          ? await authClient.signUp.email({
              name: name.trim(),
              email: email.trim(),
              password,
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password,
            })

      // The SDK can return an error without throwing an exception.
      if (result.error) {
        setError(result.error.message || 'Authentication failed.')
        return
      }

      setPassword('')

      if (mode === 'signup') {
        setMessage(
          'Account created. If email verification is required, check your inbox.',
        )
      } else {
        setMessage('Signed in successfully.')
      }
    } catch {
      setError('Unable to reach authentication. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSignOut() {
    setBusy(true)
    setError('')
    setMessage('')

    try {
      const result = await authClient.signOut()

      if (result.error) {
        setError(result.error.message || 'Unable to sign out.')
        return
      }

      setPassword('')
      setMessage('You have signed out.')
    } catch {
      setError('Unable to sign out. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const inputClasses =
    'mt-2 block w-full min-w-0 rounded border border-[#d9cfbd] ' +
    'bg-white px-4 py-3 text-[#2b2a28] ' +
    'focus-visible:outline-2 focus-visible:outline-offset-2 ' +
    'focus-visible:outline-[#a94f32]'

  const buttonClasses =
    'rounded bg-[#a94f32] px-6 py-3 font-bold text-white ' +
    'focus-visible:outline-2 focus-visible:outline-offset-4 ' +
    'focus-visible:outline-[#a94f32] ' +
    'disabled:cursor-wait disabled:opacity-60'

  return (
    <section
      id="account"
      aria-labelledby="account-title"
      className="mx-auto max-w-7xl border-t border-[#d9cfbd] px-6 py-12 md:py-20"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-[#a94f32]">
        Your account
      </p>

      <h2
        id="account-title"
        className="mt-4 font-serif text-4xl md:text-5xl"
      >
        {session?.user ? 'Welcome back.' : 'Join Frame Studio.'}
      </h2>

      {isPending ? (
        <p role="status" className="mt-6 text-[#5e5a54]">
          Checking your session…
        </p>
      ) : sessionError ? (
        <p role="alert" className="mt-6 text-[#a94f32]">
          Unable to check your session. Please refresh to try again.
        </p>
      ) : session?.user ? (
        <div className="mt-6 max-w-md">
          {/* Display identity returned by the authentication service. */}
          <p className="break-words text-[#5e5a54]">
            Signed in as {session.user.name || session.user.email}.
          </p>

          <button
            type="button"
            disabled={busy}
            onClick={handleSignOut}
            className={`mt-6 ${buttonClasses}`}
          >
            {busy ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      ) : (
        <div className="mt-8 max-w-md">
          <div
            role="group"
            aria-label="Choose sign in or create account"
            className="flex flex-wrap gap-3"
          >
            {[
              ['signin', 'Sign in'],
              ['signup', 'Create account'],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={mode === value}
                disabled={busy}
                onClick={() => {
                  setMode(value)
                  setPassword('')
                  setError('')
                  setMessage('')
                }}
                className={`rounded border px-4 py-2
                  focus-visible:outline-2 focus-visible:outline-offset-4
                  ${
                    mode === value
                      ? 'border-[#2b2a28] bg-[#2b2a28] text-white'
                      : 'border-[#d9cfbd]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <fieldset disabled={busy} className="m-0 min-w-0 border-0 p-0">
              <legend className="sr-only">
                {mode === 'signup' ? 'Create your account' : 'Sign in'}
              </legend>

              {mode === 'signup' && (
                <label className="mb-5 block">
                  Name
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className={inputClasses}
                  />
                </label>
              )}

              <label className="mb-5 block">
                Email
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClasses}
                />
              </label>

              <label className="mb-5 block">
                Password
                <input
                  type="password"
                  name="password"
                  autoComplete={
                    mode === 'signup' ? 'new-password' : 'current-password'
                  }
                  required
                  minLength={8}
                  maxLength={128}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={inputClasses}
                />
              </label>

              <button type="submit" className={buttonClasses}>
                {busy
                  ? 'Please wait…'
                  : mode === 'signup'
                    ? 'Create account'
                    : 'Sign in'}
              </button>
            </fieldset>
          </form>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-5 max-w-md text-[#a94f32]">
          {error}
        </p>
      )}

      {message && (
        <p role="status" className="mt-5 max-w-md text-[#5e5a54]">
          {message}
        </p>
      )}
    </section>
  )
}
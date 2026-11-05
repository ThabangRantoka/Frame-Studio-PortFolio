import { useRef, useState } from 'react'
import { authClient } from '../lib/auth'

// Small reusable icon. No additional icon library is required.
function AccountIcon({ signup = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      {signup ? (
        <>
          <circle cx="12" cy="7" r="4" />
          <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
        </>
      ) : (
        <>
          <rect x="5" y="10" width="14" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          <path d="M12 14v3" />
        </>
      )}
    </svg>
  )
}

// Both forms reuse this controlled password field.
function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  onToggle,
  autoComplete,
}) {
  return (
    <div className="frame-auth-field">
      <label htmlFor={id}>{label}</label>

      <div className="frame-auth-password">
        <input
          id={id}
          name={id}
          type={visible ? 'text' : 'password'}
          placeholder={label}
          autoComplete={autoComplete}
          required
          minLength={8}
          maxLength={128}
          value={value}
          onChange={onChange}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          aria-pressed={visible}
          className="frame-auth-eye"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="m3 3 18 18" />}
          </svg>
        </button>
      </div>
    </div>
  )
}

export default function Account() {
  // Neon checks the session, including after a page refresh.
  const { data: session, isPending, error: sessionError } =
    authClient.useSession()

  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPasswords, setShowPasswords] = useState(false)

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  const signinHeadingRef = useRef(null)
  const signupHeadingRef = useRef(null)

  function switchMode(nextMode) {
    if (busy) return

    setMode(nextMode)
    setPassword('')
    setConfirmPassword('')
    setShowPasswords(false)
    setError('')
    setMessage('')

    // Move keyboard focus onto the newly active side.
    window.requestAnimationFrame(() => {
      const heading =
        nextMode === 'signup'
          ? signupHeadingRef.current
          : signinHeadingRef.current

      heading?.focus()
    })
  }

  async function handleSubmit(event, formMode) {
    event.preventDefault()

    // Ignore submissions from the inactive side or while processing.
    if (busy || formMode !== mode) return

    setError('')
    setMessage('')

    if (formMode === 'signup' && !name.trim()) {
      setError('Please enter your name.')
      return
    }

    if (formMode === 'signup' && password !== confirmPassword) {
      setError('Your passwords do not match.')
      return
    }

    setBusy(true)

    try {
      // These are the same Neon operations used by your existing form.
      const result =
        formMode === 'signup'
          ? await authClient.signUp.email({
              name: name.trim(),
              email: email.trim(),
              password,
            })
          : await authClient.signIn.email({
              email: email.trim(),
              password,
            })

      if (result.error) {
        setError(result.error.message || 'Authentication failed.')
        return
      }

      setPassword('')
      setConfirmPassword('')
      setShowPasswords(false)

      setMessage(
        formMode === 'signup'
          ? 'Account created. If email verification is required, check your inbox.'
          : 'Signed in successfully.',
      )
    } catch {
      setError('Unable to reach authentication. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  async function handleSignOut() {
    if (busy) return

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
      setConfirmPassword('')
      setShowPasswords(false)
      setMode('signin')
      setMessage('You have signed out.')
    } catch {
      setError('Unable to sign out. Please try again.')
    } finally {
      setBusy(false)
    }
  }

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

      <p className="mt-4 max-w-xl leading-relaxed text-[#5e5a54]">
        {session?.user
          ? 'You are signed in to Frame Studio.'
          : 'Sign in to your account or create one to get started.'}
      </p>

      {/* All decorative styling stays inside this account area. */}
      <div className="frame-auth-stage">
        <div
          className="frame-auth-orb frame-auth-orb-one"
          aria-hidden="true"
        />
        <div
          className="frame-auth-orb frame-auth-orb-two"
          aria-hidden="true"
        />
        <div
          className="frame-auth-orb frame-auth-orb-three"
          aria-hidden="true"
        />

        <div className="frame-auth-wrapper">
          {isPending ? (
            <div className="frame-auth-status-card">
              <div className="frame-auth-logo">
                <AccountIcon />
              </div>

              <p role="status">Checking your session…</p>
            </div>
          ) : sessionError ? (
            <div className="frame-auth-status-card">
              <p role="alert">
                Unable to check your session. Please refresh to try again.
              </p>
            </div>
          ) : session?.user ? (
            <div className="frame-auth-status-card">
              <div className="frame-auth-logo">
                <AccountIcon signup />
              </div>

              <h3 className="frame-auth-title">You’re signed in</h3>

              <p className="frame-auth-identity">
                {session.user.name || session.user.email}
              </p>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={busy}
                className="frame-auth-main-button"
              >
                {busy ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          ) : (
            <div className="frame-auth-perspective">
              <div
                className={`frame-auth-card ${
                  mode === 'signup' ? 'is-flipped' : ''
                }`}
              >
                {/* Both faces share the same structure and state.
                    Only the active face can receive keyboard input. */}
                {['signin', 'signup'].map((formMode) => {
                  const isSignup = formMode === 'signup'
                  const active = mode === formMode

                  return (
                    <div
                      key={formMode}
                      className={`frame-auth-face ${
                        isSignup ? 'frame-auth-back' : ''
                      }`}
                      inert={!active}
                      aria-hidden={!active}
                    >
                      <div className="frame-auth-logo">
                        <AccountIcon signup={isSignup} />
                      </div>

                      <h3
                        ref={
                          isSignup
                            ? signupHeadingRef
                            : signinHeadingRef
                        }
                        id={`frame-${formMode}-title`}
                        tabIndex={-1}
                        className="frame-auth-title"
                      >
                        {isSignup ? 'Create account' : 'Welcome'}
                      </h3>

                      <p className="frame-auth-subtitle">
                        {isSignup
                          ? 'Make yourself at home at Frame Studio.'
                          : 'Sign in to your Frame Studio account.'}
                      </p>

                      <form
                        onSubmit={(event) =>
                          handleSubmit(event, formMode)
                        }
                        aria-labelledby={`frame-${formMode}-title`}
                        aria-busy={active && busy}
                      >
                        <fieldset disabled={busy || !active}>
                          <legend className="sr-only">
                            {isSignup ? 'Create account' : 'Sign in'}
                          </legend>

                          {isSignup && (
                            <div className="frame-auth-field">
                              <label htmlFor="frame-signup-name">
                                Full name
                              </label>

                              <input
                                id="frame-signup-name"
                                name="name"
                                type="text"
                                placeholder="Full name"
                                autoComplete="name"
                                required
                                maxLength={100}
                                value={name}
                                onChange={(event) =>
                                  setName(event.target.value)
                                }
                              />
                            </div>
                          )}

                          <div className="frame-auth-field">
                            <label htmlFor={`frame-${formMode}-email`}>
                              Email address
                            </label>

                            <input
                              id={`frame-${formMode}-email`}
                              name="email"
                              type="email"
                              placeholder="Email address"
                              autoComplete="email"
                              required
                              value={email}
                              onChange={(event) =>
                                setEmail(event.target.value)
                              }
                            />
                          </div>

                          <PasswordField
                            id={`frame-${formMode}-password`}
                            label="Password"
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            visible={showPasswords}
                            onToggle={() =>
                              setShowPasswords((previous) => !previous)
                            }
                            autoComplete={
                              isSignup
                                ? 'new-password'
                                : 'current-password'
                            }
                          />

                          {isSignup && (
                            <PasswordField
                              id="frame-signup-confirm"
                              label="Confirm password"
                              value={confirmPassword}
                              onChange={(event) =>
                                setConfirmPassword(event.target.value)
                              }
                              visible={showPasswords}
                              onToggle={() =>
                                setShowPasswords((previous) => !previous)
                              }
                              autoComplete="new-password"
                            />
                          )}

                          <p className="frame-auth-help">
                            {isSignup
                              ? 'Use a password with at least 8 characters.'
                              : 'Your session stays available after a page refresh.'}
                          </p>

                          <button
                            type="submit"
                            className="frame-auth-main-button"
                          >
                            {busy
                              ? 'Please wait…'
                              : isSignup
                                ? 'Create account'
                                : 'Sign in'}
                          </button>
                        </fieldset>
                      </form>

                      <div className="frame-auth-switch">
                        <p>
                          {isSignup
                            ? 'Already have an account?'
                            : 'Don’t have an account?'}
                        </p>

                        <button
                          type="button"
                          disabled={busy}
                          onClick={() =>
                            switchMode(isSignup ? 'signin' : 'signup')
                          }
                          className="frame-auth-switch-button"
                          aria-label={
                            isSignup
                              ? 'Switch to sign in'
                              : 'Switch to create account'
                          }
                        >
                          <span aria-hidden="true">
                            {isSignup ? '↩' : '+'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Messages remain outside the rotating faces. */}
          {error && (
            <p role="alert" className="frame-auth-message is-error">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="frame-auth-message">
              {message}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
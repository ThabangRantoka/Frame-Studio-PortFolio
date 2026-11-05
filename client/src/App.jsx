import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Account from './components/Account'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#2b2a28]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-[#2b2a28] focus:p-4 focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />
        <Gallery />
        <Account />
        <About />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}
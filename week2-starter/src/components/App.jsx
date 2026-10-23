import Header from './components/Header'
import Hero from './components/Hero'
import Gallery from './components/Gallery'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f6f1e7] text-[#2b2a28]">
      <Header />

      <main id="main">
        <Hero />
        <Gallery />
      </main>
    </div>
  )
}
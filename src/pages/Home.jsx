import Navbar from '@/layout/Navbar'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import BeyondProjects from '../components/BeyondProjects'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <div style={{ background: '#ffffff' }}>
      <Navbar />
      <Hero />
      <Experience />

      <Contact />
    </div>
  )
}

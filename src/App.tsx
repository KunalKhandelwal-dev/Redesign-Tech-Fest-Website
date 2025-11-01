import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Team from './components/Team';
import Register from './components/Register';
import Footer from './components/Footer';
import BackgroundCircuit from './components/BackgroundCircuit';
import './styles/globals.css';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden relative">
      {/* Animated Circuit Background - Global */}
      <BackgroundCircuit />

      {/* Content Layer - Positioned above background */}
      <div className="relative z-20">
        {/* Sticky Header */}
        <Header />

        {/* Main Content */}
        <main>
          <Hero />
          <About />
          <Events />
          <Team />
          <Register />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

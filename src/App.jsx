import { useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatIsAscent from './components/WhatIsAscent';
import ForWho from './components/ForWho';
import Experience from './components/Experience';
import FAQ from './components/FAQ';
import Ecosystem from './components/Ecosystem';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 600);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIsAscent />
        <Ecosystem />
        <ForWho />
        <Experience />
        <FAQ />
        <ApplicationForm />
      </main>
      <Footer />
    </>
  );
}

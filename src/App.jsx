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

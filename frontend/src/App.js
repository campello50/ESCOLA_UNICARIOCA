import React from 'react';
import SchoolDashboard from './components/SchoolDashboard';
import Header from './components/Header';
import Hero from './components/Hero';
import Announcements from './components/Announcements';
import Events from './components/Events';
import Footer from './components/Footer';

function App() {
  return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <div className="container mx-auto px-4 py-8 md:py-12">
            <div className="grid gap-8 md:grid-cols-2">
              <Announcements />
              <Events />cd
            </div>
            <div className="mt-12">
              <SchoolDashboard />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

export default App;
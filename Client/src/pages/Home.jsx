import React from 'react';
import Navbar from '../components/Navbar';
import Header from '../components/Header';

const Home = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen 
                    bg-gradient-to-br 
                    from-[#d0f0ff] 
                    via-[#ffe0ec] 
                    to-[#fff0e6] 
                    overflow-x-hidden">
      <Navbar />
      <Header />
    </main>
  );
};

export default Home;

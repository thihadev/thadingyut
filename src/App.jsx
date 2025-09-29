import { motion } from 'framer-motion';
import { useState } from 'react';
import WishForm from './components/WishForm';
import LanternSky from './components/LanternSky';
import LanternDisplay from './components/LanternDisplay';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [newWish, setNewWish] = useState(null);

  const handleWishSubmitted = (wishData) => {
    setNewWish(wishData);
    setCurrentPage('display');
  };

  if (currentPage === 'display') {
    return (
      <div className="relative">
        <button
          onClick={() => {
            setCurrentPage('main');
            setNewWish(null);
          }}
          className="absolute top-4 left-4 z-20 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          ← Back
        </button>
        <LanternDisplay newWish={newWish} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-black relative overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setCurrentPage('display')}
          className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          View Lanterns
        </button>
      </div>

      {/* Header */}
      <motion.header
        className="relative z-10 text-center py-12 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 215, 0, 0.5)',
              '0 0 40px rgba(255, 215, 0, 0.8)',
              '0 0 20px rgba(255, 215, 0, 0.5)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🏮 Thadingyut Festival 🏮
        </motion.h1>
        
        <motion.p
          className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to the Festival of Lights! Make a wish and watch it float among the stars as a beautiful Myanmar lantern. 
          During Thadingyut, we honor our ancestors and celebrate the return of Buddha from heaven.
        </motion.p>
      </motion.header>

      {/* Wish Form */}
      <div className="relative z-10 px-4 mb-12">
        <WishForm onWishSubmitted={handleWishSubmitted} />
      </div>

      {/* Lantern Sky */}
      <div className="absolute inset-0">
        <LanternSky />
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 text-center py-8 text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>May your wishes light up the sky like the beautiful lanterns of Thadingyut</p>
      </motion.footer>
    </div>
  );
}

export default App;

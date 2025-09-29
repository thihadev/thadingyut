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
        <motion.button
          onClick={() => {
            setCurrentPage('main');
            setNewWish(null);
          }}
          className="absolute top-4 left-4 z-20 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/30 transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">←</span>
          <span className="hidden sm:inline">Back</span>
        </motion.button>
        <LanternDisplay newWish={newWish} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-black relative overflow-hidden">
      {/* Header */}
      <motion.header
        className="relative z-10 text-center py-8 md:py-12 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-orange-500 to-red-500 bg-clip-text text-transparent"
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
          className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Welcome to the Festival of Lights! Make a wish and watch it float among the stars as a beautiful Myanmar lantern. 
          During Thadingyut, we honor our ancestors and celebrate the return of Buddha from heaven.
        </motion.p>
      </motion.header>

      {/* Wish Form */}
      <div className="relative z-10 px-4 mb-8">
        <WishForm onWishSubmitted={handleWishSubmitted} />
      </div>

      {/* View Lanterns Button */}
      <div className="relative z-10 text-center px-4 mb-12">
        <motion.button
          onClick={() => setCurrentPage('display')}
          className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-yellow-500 hover:via-orange-600 hover:to-pink-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ View All Lanterns ✨
        </motion.button>
      </div>

      {/* Lantern Sky */}
      <div className="absolute inset-0">
        <LanternSky />
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 text-center py-8 text-white/70 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-sm md:text-base">May your wishes light up the sky like the beautiful lanterns of Thadingyut</p>
      </motion.footer>
    </div>
  );
}

export default App;

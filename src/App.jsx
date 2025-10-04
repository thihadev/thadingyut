import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import WishForm from './components/WishForm';
import LanternSky from './components/LanternSky';
import LanternDisplay from './components/LanternDisplay';

function App() {
  const [currentPage, setCurrentPage] = useState('main');
  const [newWish, setNewWish] = useState(null);
  const { totalCount } = useSelector((state) => state.wishes);

  const handleWishSubmitted = (wishData) => {
    setNewWish(wishData);
    setCurrentPage('display');
  };

  if (currentPage === 'display') {
    return (
      <div className="relative">
        <LanternDisplay newWish={newWish} onBack={() => setCurrentPage('main')} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b bg-black relative overflow-hidden">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2 }}
      >
        <img
          src="/thadin.png"
          alt="Thadingyut Background"
          className="w-full h-full object-cover object-center opacity-15"
        />
      </motion.div>

      {/* Header */}
      <motion.header
        className="relative z-10 text-center pt-0 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img 
          src="/thadin.png" 
          alt="Thadingyut Lantern" 
          className="w-[728px] h-190px] mx-auto"
        />
      </motion.header>

      {/* Festival Message */}
      <motion.div
        className="relative z-10 px-2 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="rounded-3xl max-w-md mx-auto">
          <p className="text-white text-center leading-relaxed">
            <span className="text-lg md:text-xl block mb-2">🎇 သီတင်းကျွတ်ဆုတောင်း 🎇</span>
            <span className="text-sm md:text-base">
              မြန်မာသက္ကရာဇ် ၁၃၈၆ ခုနှစ်တွင် ကျရောက်သော <br />
              မြန်မာလူမျိုးတို့ရဲ့ ချစ်စရာသီတင်းကျွတ်အခါသမယလေးမှာ <br />
              <span className='tex-sm font-semibold'> HEY Playနဲ့အတူ </span> တောင်းဆုပြုပြီး လိုရာဆန္ဒပြည့်ဝပါစေ🙏🙏🙏
            </span>
          </p>
        </div>
      </motion.div>

      {/* Total Wishes */}
      <motion.div
        className="relative z-10 text-center px-4 mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <button
          onClick={() => setCurrentPage('display')}
          className="rounded-full px-2 py-1 border-white/20 shadow-lg max-w-xs mx-aut transition-all hover:scale-105 cursor-pointer"
        >
          <p className="text-white text-sm md:text-base font-semibold">
            Total Wishes : <span className="text-[#32c1f0]">{totalCount.toLocaleString()}</span>
          </p>
        </button>
      </motion.div>

      {/* Wish Form */}
      <div className="relative z-10 px-2 mb-8">
        <WishForm onWishSubmitted={handleWishSubmitted} />
      </div>

      {/* View Lanterns Button */}
      {/* <div className="relative z-10 text-center px-4 mb-12">
        <motion.button
          onClick={() => setCurrentPage('display')}
          className="bg-gradient-to-r from-blue-400 to-pink-500 hover:from-blue-500 hover:to-pink-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-base shadow-lg transition-all duration-300 transform hover:scale-105"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✨ View All Lanterns ✨
        </motion.button>
      </div> */}

      {/* Lantern Sky */}
      <div className="absolute inset-0">
        <LanternSky />
      </div>

    </div>
  );
}

export default App;

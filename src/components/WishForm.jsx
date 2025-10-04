import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import { addWish } from '../store/wishesSlice';

const WishForm = ({ onWishSubmitted }) => {
  const [wish, setWish] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const lastWishTime = localStorage.getItem('lastWishTime');
    if (lastWishTime) {
      const timeDiff = Date.now() - parseInt(lastWishTime);
      const cooldownDuration = 60000; // 1 minute cooldown
      if (timeDiff < cooldownDuration) {
        setCooldownTime(Math.ceil((cooldownDuration - timeDiff) / 1000));
      }
    }
  }, []);

  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => setCooldownTime(cooldownTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldownTime]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wish.trim() || cooldownTime > 0) return;

    setIsSubmitting(true);
    
    try {
      const wishData = {
        wish: wish.trim(),
        name: name.trim() || 'Anonymous',
        timestamp: Date.now(),
        id: Date.now() + Math.random()
      };

      // Add to Firebase
      await push(ref(database, 'wishes'), wishData);
      
      // Add to Redux store for immediate UI update
      dispatch(addWish(wishData));
      
      // Set cooldown
      localStorage.setItem('lastWishTime', Date.now().toString());
      setCooldownTime(60);
      
      // Reset form
      setWish('');
      setName('');
      
      // Redirect to view page with new wish
      if (onWishSubmitted) {
        onWishSubmitted(wishData);
      }
      
    } catch (error) {
      console.error('Error submitting wish:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white font-semibold mb-2">
            Your Name (Optional)
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name (optional)"
            className="w-full bg-white/90 text-black border-0 focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">
            Your Thadingyut Wish
          </label>
          <Textarea
            value={wish}
            onChange={(e) => setWish(e.target.value)}
            placeholder="Make your wish for the Festival of Lights..."
            rows={7}
            className="bg-white/90 text-black border-0 focus:ring-2 focus:ring-pink-400 resize-none"
            required
          />
        </div>
        
        {cooldownTime > 0 && (
          <div className="text-pink-300 text-sm text-center">
            နောက်ထပ် ဆုတောင်းမီးပုံးလွှတ်တင်ရန် {cooldownTime} စက္ကန့်စောင့်ဆိုင်းပါ
            {/* Please wait {cooldownTime} seconds before making another wish */}
          </div>
        )}
        
        <Button
          type="submit"
          disabled={isSubmitting || cooldownTime > 0}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 rounded-full transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'လွှတ်တင်နေသည်...' : cooldownTime > 0 ? `${cooldownTime}s စောင့်ဆိုင်းပါ` : 'မီးပုံးလွှတ်တင်မည်'}
        </Button>
      </form>
    </motion.div>
  );
};

export default WishForm;

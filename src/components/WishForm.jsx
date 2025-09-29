import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ref, push } from 'firebase/database';
import { database } from '../firebase';
import { addWish } from '../store/wishesSlice';

const WishForm = ({ onWishSubmitted }) => {
  const [name, setName] = useState('');
  const [wish, setWish] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !wish.trim()) return;

    setIsSubmitting(true);
    
    try {
      const wishData = {
        name: name.trim(),
        wish: wish.trim(),
        timestamp: Date.now(),
        id: Date.now() + Math.random()
      };

      // Add to Firebase
      await push(ref(database, 'wishes'), wishData);
      
      // Add to Redux store for immediate UI update
      dispatch(addWish(wishData));
      
      // Reset form
      setName('');
      setWish('');
      
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
            Your Name
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="bg-white/90 text-black border-0 focus:ring-2 focus:ring-yellow-400"
            required
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
            rows={3}
            className="bg-white/90 text-black border-0 focus:ring-2 focus:ring-yellow-400 resize-none"
            required
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          {isSubmitting ? '🏮 Sending...' : '🏮 Send My Wish to the Sky'}
        </Button>
      </form>
    </motion.div>
  );
};

export default WishForm;

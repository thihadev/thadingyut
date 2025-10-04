import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../firebase';
import { setWishes, setTotalCount } from '../store/wishesSlice';

const LanternSky = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Listen for latest wishes to keep store updated
    const wishesQuery = query(
      ref(database, 'wishes'),
      orderByChild('timestamp'),
      limitToLast(40)
    );

    const unsubscribe = onValue(wishesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const wishesArray = Object.values(data).reverse();
        dispatch(setWishes(wishesArray));
      }
    });

    // Get total count for display
    const countRef = ref(database, 'wishes');
    const countUnsubscribe = onValue(countRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(setTotalCount(Object.keys(data).length));
      }
    });

    return () => {
      unsubscribe();
      countUnsubscribe();
    };
  }, [dispatch]);

  // Create stars background
  const stars = Array.from({ length: 100 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute bg-white rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3 + 1}px`,
        height: `${Math.random() * 3 + 1}px`,
      }}
      animate={{
        opacity: [0.3, 1, 0.3]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay: Math.random() * 2
      }}
    />
  ));

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none">
        {stars}
      </div>

      {/* Floating particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LanternSky;

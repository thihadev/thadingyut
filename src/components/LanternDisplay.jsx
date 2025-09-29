import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ref, onValue, query, orderByChild, limitToLast } from 'firebase/database';
import { database } from '../firebase';
import { setWishes, setTotalCount } from '../store/wishesSlice';

const LanternDisplay = ({ newWish }) => {
  const [selectedWish, setSelectedWish] = useState(null);
  const [lanternPositions, setLanternPositions] = useState([]);
  const [showOtherLanterns, setShowOtherLanterns] = useState(false);
  const { wishes, totalCount } = useSelector((state) => state.wishes);
  const dispatch = useDispatch();

  // Color palettes for lanterns
  const colorPalettes = [
    { primary: '#FFD700', secondary: '#FF8C00', accent: '#FF4500' }, // Gold/Orange
    { primary: '#FF69B4', secondary: '#FF1493', accent: '#DC143C' }, // Pink/Red
    { primary: '#00CED1', secondary: '#20B2AA', accent: '#008B8B' }, // Cyan/Teal
    { primary: '#9370DB', secondary: '#8A2BE2', accent: '#4B0082' }, // Purple
    { primary: '#32CD32', secondary: '#228B22', accent: '#006400' }, // Green
    { primary: '#FF6347', secondary: '#FF4500', accent: '#B22222' }, // Tomato/Red
    { primary: '#87CEEB', secondary: '#4682B4', accent: '#191970' }, // Sky Blue
    { primary: '#DDA0DD', secondary: '#DA70D6', accent: '#8B008B' }, // Plum
  ];

  useEffect(() => {
    if (newWish) {
      // Show other lanterns after 1 second when there's a new wish
      const timer = setTimeout(() => {
        setShowOtherLanterns(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Show all lanterns immediately if no new wish
      setShowOtherLanterns(true);
    }
  }, [newWish]);

  useEffect(() => {
    const wishesQuery = query(
      ref(database, 'wishes'),
      orderByChild('timestamp'),
      limitToLast(50)
    );

    const unsubscribe = onValue(wishesQuery, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const wishesArray = Object.values(data).reverse();
        dispatch(setWishes(wishesArray));
      }
    });

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

  useEffect(() => {
    if (wishes.length > 0 && lanternPositions.length === 0) {
      const positions = [];
      const minDistance = 8; // Minimum distance between lanterns (percentage)
      
      for (let i = 0; i < wishes.length; i++) {
        let attempts = 0;
        let position;
        
        do {
          position = {
            x: Math.random() * 85 + 5, // 5-90% to avoid edges
            y: Math.random() * 75 + 10, // 10-85% to avoid edges
            size: Math.random() * 45 + 55, // 35-60px
            rotation: Math.random() * 20 - 10,
            colorIndex: Math.floor(Math.random() * colorPalettes.length)
          };
          attempts++;
        } while (
          attempts < 50 && 
          positions.some(existing => {
            const dx = position.x - existing.x;
            const dy = position.y - existing.y;
            return Math.sqrt(dx * dx + dy * dy) < minDistance;
          })
        );
        
        positions.push(position);
      }
      
      setLanternPositions(positions);
    }
  }, [wishes, lanternPositions.length]);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Stats Display */}
      <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white z-10">
        <div className="text-sm">
          <div>Total Wishes: <span className="font-bold text-yellow-400">{totalCount.toLocaleString()}</span></div>
          {/* <div>Showing: <span className="font-bold text-blue-400">{wishes.length}</span></div> */}
        </div>
      </div>

      {/* Sparkling Stars */}
      {Array.from({ length: 100 }).map((_, i) => (
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
            opacity: [0.2, 1, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* New Wish Lantern (appears first) */}
      {newWish && (
        <motion.div
          className="absolute cursor-pointer"
          style={{
            left: '50%',
            top: '40%',
            transform: 'translateX(-50%)',
          }}
          initial={{ y: window.innerHeight + 100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            duration: 5,
            ease: "easeOut"
          }}
          whileHover={{ scale: 1.2 }}
          onClick={() => {
            const colors = colorPalettes[0];
            setSelectedWish({...newWish, colors, hueRotate: 0});
          }}
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 3, -3, 0],
              x: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.img
              src="/lantern1.svg"
              alt="Your Wish Lantern"
              style={{
                width: '80px',
                height: '96px',
                filter: `drop-shadow(0 0 15px #FFD70070) drop-shadow(0 0 30px #FFD70040)`
              }}
              animate={{
                filter: [
                  `drop-shadow(0 0 15px #FFD70070) drop-shadow(0 0 30px #FFD70040)`,
                  `drop-shadow(0 0 20px #FFD70080) drop-shadow(0 0 40px #FFD70050)`,
                  `drop-shadow(0 0 15px #FFD70070) drop-shadow(0 0 30px #FFD70040)`
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            
            <svg
              width="80"
              height="96"
              viewBox="0 0 100 120"
              style={{ display: 'none' }}
              className="drop-shadow-lg"
            >
              <line x1="50" y1="5" x2="50" y2="15" stroke="#8B4513" strokeWidth="2"/>
              <ellipse cx="50" cy="15" rx="25" ry="8" fill="#FFD700" stroke="#FF8C00" strokeWidth="2"/>
              <ellipse cx="50" cy="12" rx="20" ry="5" fill="#FF8C00" opacity="0.8"/>
              <path
                d="M25 20 Q25 15 30 15 L70 15 Q75 15 75 20 L75 75 Q75 85 65 90 L35 90 Q25 85 25 75 Z"
                fill="url(#newWishGradient)"
                stroke="#FF4500"
                strokeWidth="2"
              />
              <rect x="32" y="25" width="36" height="45" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.7" rx="8"/>
              <line x1="38" y1="30" x2="38" y2="65" stroke="#FF4500" strokeWidth="1" opacity="0.9"/>
              <line x1="50" y1="30" x2="50" y2="65" stroke="#FF4500" strokeWidth="1" opacity="0.9"/>
              <line x1="62" y1="30" x2="62" y2="65" stroke="#FF4500" strokeWidth="1" opacity="0.9"/>
              <line x1="32" y1="40" x2="68" y2="40" stroke="#FF4500" strokeWidth="1" opacity="0.7"/>
              <line x1="32" y1="55" x2="68" y2="55" stroke="#FF4500" strokeWidth="1" opacity="0.7"/>
              <rect x="48" y="90" width="4" height="8" fill="#8B0000" rx="2"/>
              <circle cx="50" cy="102" r="6" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
              <circle cx="50" cy="102" r="4" fill="#FF6347" opacity="0.8"/>
              <g opacity="0.9">
                <line x1="45" y1="108" x2="44" y2="115" stroke="#8B0000" strokeWidth="1"/>
                <line x1="47" y1="108" x2="46" y2="116" stroke="#8B0000" strokeWidth="1"/>
                <line x1="50" y1="108" x2="50" y2="117" stroke="#8B0000" strokeWidth="1.5"/>
                <line x1="53" y1="108" x2="54" y2="116" stroke="#8B0000" strokeWidth="1"/>
                <line x1="55" y1="108" x2="56" y2="115" stroke="#8B0000" strokeWidth="1"/>
              </g>
              <circle cx="44" cy="113" r="1" fill="#DC143C"/>
              <circle cx="46" cy="114" r="1" fill="#DC143C"/>
              <circle cx="50" cy="115" r="1.5" fill="#DC143C"/>
              <circle cx="54" cy="114" r="1" fill="#DC143C"/>
              <circle cx="56" cy="113" r="1" fill="#DC143C"/>
              <defs>
                <linearGradient id="newWishGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700"/>
                  <stop offset="50%" stopColor="#FF8C00"/>
                  <stop offset="100%" stopColor="#FF4500"/>
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* Other Lanterns (appear after delay) */}
      {showOtherLanterns && wishes.map((wish, index) => {
        const position = lanternPositions[index];
        if (!position) return null;

        const colors = colorPalettes[position.colorIndex];

        return (
          <motion.div
            key={wish.id || index}
            className="absolute cursor-pointer"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
            }}
            initial={{ y: window.innerHeight + 100, opacity: 0, scale: 0.5 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              duration: 11,
              delay: 1 + (index * 0.3), // Start after 1 second + staggered delay
              ease: "easeOut"
            }}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              const hueRotatedColors = {
                primary: colors.primary,
                secondary: colors.secondary,
                accent: colors.accent
              };
              setSelectedWish({...wish, colors: hueRotatedColors, hueRotate: position.colorIndex * 45});
            }}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [position.rotation, position.rotation + 2, position.rotation - 2, position.rotation]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Custom SVG Lantern */}
              <motion.img
                src="/lantern1.svg"
                alt="Myanmar Lantern"
                style={{
                  width: `${position.size}px`,
                  height: `${position.size * 1.2}px`,
                  filter: `drop-shadow(0 0 10px ${colors.primary}70) drop-shadow(0 0 20px ${colors.primary}40) hue-rotate(${position.colorIndex * 45}deg)`
                }}
                animate={{
                  filter: [
                    `drop-shadow(0 0 10px ${colors.primary}70) drop-shadow(0 0 20px ${colors.primary}40) hue-rotate(${position.colorIndex * 45}deg)`,
                    `drop-shadow(0 0 14px ${colors.primary}80) drop-shadow(0 0 28px ${colors.primary}50) hue-rotate(${position.colorIndex * 45}deg)`,
                    `drop-shadow(0 0 10px ${colors.primary}70) drop-shadow(0 0 20px ${colors.primary}40) hue-rotate(${position.colorIndex * 45}deg)`
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              
              {/* Enhanced SVG Lantern with Myanmar-style Tassel */}
              <svg
                width={position.size}
                height={position.size * 1.2}
                viewBox="0 0 100 120"
                style={{ display: 'none' }}
                className="drop-shadow-lg"
              >
                {/* Hanging String */}
                <line x1="50" y1="5" x2="50" y2="15" stroke="#8B4513" strokeWidth="2"/>
                
                {/* Lantern Top Cap */}
                <ellipse cx="50" cy="15" rx="25" ry="8" fill={colors.primary} stroke={colors.secondary} strokeWidth="2"/>
                <ellipse cx="50" cy="12" rx="20" ry="5" fill={colors.secondary} opacity="0.8"/>
                
                {/* Main Lantern Body */}
                <path
                  d="M25 20 Q25 15 30 15 L70 15 Q75 15 75 20 L75 75 Q75 85 65 90 L35 90 Q25 85 25 75 Z"
                  fill={`url(#lanternGradient${index})`}
                  stroke={colors.accent}
                  strokeWidth="2"
                />
                
                {/* Lantern Decorative Patterns */}
                <rect x="32" y="25" width="36" height="45" fill="none" stroke="#FFF" strokeWidth="1" opacity="0.7" rx="8"/>
                <line x1="38" y1="30" x2="38" y2="65" stroke={colors.accent} strokeWidth="1" opacity="0.9"/>
                <line x1="50" y1="30" x2="50" y2="65" stroke={colors.accent} strokeWidth="1" opacity="0.9"/>
                <line x1="62" y1="30" x2="62" y2="65" stroke={colors.accent} strokeWidth="1" opacity="0.9"/>
                
                {/* Horizontal Bands */}
                <line x1="32" y1="40" x2="68" y2="40" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
                <line x1="32" y1="55" x2="68" y2="55" stroke={colors.accent} strokeWidth="1" opacity="0.7"/>
                
                {/* Myanmar-style Tassel Assembly */}
                {/* Main Tassel Cord */}
                <rect x="48" y="90" width="4" height="8" fill="#8B0000" rx="2"/>
                
                {/* Tassel Ornament */}
                <circle cx="50" cy="102" r="6" fill="#DC143C" stroke="#8B0000" strokeWidth="1"/>
                <circle cx="50" cy="102" r="4" fill="#FF6347" opacity="0.8"/>
                
                {/* Hanging Threads (Myanmar style) */}
                <g opacity="0.9">
                  <line x1="45" y1="108" x2="44" y2="115" stroke="#8B0000" strokeWidth="1"/>
                  <line x1="47" y1="108" x2="46" y2="116" stroke="#8B0000" strokeWidth="1"/>
                  <line x1="50" y1="108" x2="50" y2="117" stroke="#8B0000" strokeWidth="1.5"/>
                  <line x1="53" y1="108" x2="54" y2="116" stroke="#8B0000" strokeWidth="1"/>
                  <line x1="55" y1="108" x2="56" y2="115" stroke="#8B0000" strokeWidth="1"/>
                </g>
                
                {/* Small decorative beads on threads */}
                <circle cx="44" cy="113" r="1" fill="#DC143C"/>
                <circle cx="46" cy="114" r="1" fill="#DC143C"/>
                <circle cx="50" cy="115" r="1.5" fill="#DC143C"/>
                <circle cx="54" cy="114" r="1" fill="#DC143C"/>
                <circle cx="56" cy="113" r="1" fill="#DC143C"/>
                
                {/* Gradient Definition */}
                <defs>
                  <linearGradient id={`lanternGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colors.primary}/>
                    <stop offset="50%" stopColor={colors.secondary}/>
                    <stop offset="100%" stopColor={colors.accent}/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Wish Modal */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              className="rounded-2xl p-6 max-w-md w-full shadow-2xl"
              style={{
                background: `linear-gradient(135deg, ${selectedWish.colors.primary}, ${selectedWish.colors.secondary})`,
                color: '#000'
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-2">🏮 Wish 🏮</h3>
                <p className="text-lg font-semibold">~ {selectedWish.name} ~</p>
              </div> */}
              
              <div className="bg-white/30 rounded-lg p-4 mb-4">
                <p className="text-lg italic">"{selectedWish.wish}"</p>
              </div>
              
              <button
                onClick={() => setSelectedWish(null)}
                className="w-full bg-black/20 hover:bg-black/30 text-white font-bold py-2 rounded-lg transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanternDisplay;

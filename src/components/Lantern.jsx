import { motion } from 'framer-motion';
import { useState } from 'react';

const Lantern = ({ wish, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const gradients = [
    'lantern-gradient-1',
    'lantern-gradient-2', 
    'lantern-gradient-3',
    'lantern-gradient-4',
    'lantern-gradient-5'
  ];
  
  const gradient = gradients[index % gradients.length];
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${Math.random() * 90}%`,
        top: `${Math.random() * 70 + 10}%`,
      }}
      initial={{ y: '100vh', scale: 0, opacity: 0 }}
      animate={{ y: 0, scale: 1, opacity: 1 }}
      transition={{ 
        duration: 3,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{ scale: 1.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        className="relative"
        animate={{
          y: [0, -10, -5, -15, 0],
          rotate: [0, 1, 0, -1, 0]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Lantern Top */}
        <div className="w-5 h-2 bg-amber-800 mx-auto mb-1 rounded"></div>
        
        {/* Lantern Body */}
        <motion.div 
          className={`w-12 h-16 ${gradient} rounded-2xl relative shadow-lg`}
          animate={{
            boxShadow: [
              '0 0 20px rgba(255, 107, 107, 0.6)',
              '0 0 30px rgba(255, 215, 0, 0.8)',
              '0 0 20px rgba(255, 107, 107, 0.6)'
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Lantern Pattern */}
          <div className="absolute inset-2 border border-white/30 rounded-xl"></div>
        </motion.div>
        
        {/* Lantern Bottom */}
        <div className="w-8 h-4 bg-amber-800 mx-auto mt-1 rounded-b-full"></div>
        
        {/* Wish Text Tooltip */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs whitespace-nowrap max-w-48 overflow-hidden text-ellipsis pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {wish.wish}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Lantern;

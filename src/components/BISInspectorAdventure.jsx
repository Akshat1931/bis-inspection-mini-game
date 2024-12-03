import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Check, 
  X, 
  Star, 
  Trophy, 
  AlertTriangle, 
  Clock, 
  BookOpen,
  Zap,
  Layers,
  Compass,
  Battery,
  Target
} from 'lucide-react';
import { motion, AnimatePresence, useAnimate } from 'framer-motion';

const BISInspectorAdvanced = () => {
  // Enhanced game state with more complex mechanics
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameStarted, setGameStarted] = useState(false);
  const [streak, setStreak] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [specialPowerActive, setSpecialPowerActive] = useState(false);
  const [powerCharge, setPowerCharge] = useState(0);

  // More comprehensive and diverse product database
  const products = [
    { 
      id: 1, 
      name: 'Smart Electric Kettle', 
      hasBISCertification: true,
      description: 'IoT-enabled kitchen appliance with temperature control',
      certificationDetails: 'BIS Standard IS 302-1/IEC 60335-1',
      category: 'Home Appliance',
      riskLevel: 'Medium',
      icon: <Zap className="text-blue-500" />
    },
    { 
      id: 2, 
      name: 'Quick Charge Adapter', 
      hasBISCertification: false,
      description: 'High-speed mobile phone charging solution',
      certificationDetails: 'Missing mandatory BIS certification',
      category: 'Electronics',
      riskLevel: 'High',
      icon: <Battery className="text-yellow-500" />
    },
    { 
      id: 3, 
      name: 'Smart LED Bulb', 
      hasBISCertification: true,
      description: 'Color-changing, Wi-Fi enabled lighting',
      certificationDetails: 'BIS Standard IS 16104',
      category: 'Lighting',
      riskLevel: 'Low',
      icon: <Layers className="text-green-500" />
    },
    { 
      id: 4, 
      name: 'Advanced Safety Helmet', 
      hasBISCertification: false,
      description: 'Intelligent cycling helmet with impact sensors',
      certificationDetails: 'No BIS safety standards applied',
      category: 'Safety Equipment',
      riskLevel: 'Critical',
      icon: <Shield className="text-red-500" />
    },
    { 
      id: 5, 
      name: 'Smart Power Strip', 
      hasBISCertification: true,
      description: 'Energy monitoring electrical distribution unit',
      certificationDetails: 'BIS Standard IS 694',
      category: 'Electrical Accessories',
      riskLevel: 'High',
      icon: <Compass className="text-purple-500" />
    }
  ];

  const [currentProducts, setCurrentProducts] = useState([]);
  const [scope, animate] = useAnimate();

  // Game timer and mechanics with enhanced time management
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !gameOver) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          // Increase power charge slowly
          setPowerCharge(charge => 
            charge < 100 ? charge + 0.5 : 100
          );
          return prev - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameOver]);

  // Track high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const startGame = () => {
    setScore(0);
    setCurrentLevel(1);
    setGameOver(false);
    setTimeLeft(90);
    setStreak(0);
    setMultiplier(1);
    setPowerCharge(0);
    setSpecialPowerActive(false);
    setGameStarted(true);
    setCurrentProducts(
      products.sort(() => 0.5 - Math.random()).slice(0, 3)
    );
  };

  // Enhanced special power mechanic
  const activateSpecialPower = () => {
    if (powerCharge >= 50) {
      setSpecialPowerActive(true);
      setPowerCharge(0);
      setTimeLeft(prev => prev + 15);  // Bonus time
      
      // Temporary visual indicator
      animate(scope.current, {
        scale: [1, 1.1, 1],
        rotate: [0, 10, -10, 0],
        borderColor: ['transparent', 'gold', 'transparent']
      }, { duration: 1 });
    }
  };

  // Enhanced product checking with more complex scoring
  const checkProduct = (product, isUserCertified) => {
    if (product.hasBISCertification === isUserCertified) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      
      // More dynamic multiplier mechanics
      const newMultiplier = 
        newStreak % 5 === 0 ? multiplier + 0.75 : 
        newStreak % 3 === 0 ? multiplier + 0.5 : 
        multiplier;
      
      setMultiplier(newMultiplier);

      // More nuanced scoring based on risk and multiplier
      const riskMultiplier = 
        product.riskLevel === 'Critical' ? 2 :
        product.riskLevel === 'High' ? 1.5 :
        1;
      
      const points = Math.round(15 * newMultiplier * riskMultiplier);
      setScore(prevScore => prevScore + points);
      
      // Level progression with complexity
      if (currentLevel < 7) {
        setCurrentLevel(prevLevel => 
          newStreak % 3 === 0 ? prevLevel + 1 : prevLevel
        );
      }

      // Refresh products with increasing difficulty
      setCurrentProducts(
        products
          .sort(() => 0.5 - Math.random())
          .slice(0, currentLevel > 3 ? 4 : 3)
      );
    } else {
      setGameOver(true);
    }
  };

  return (
    <motion.div 
      ref={scope}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="max-w-lg mx-auto p-6 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 rounded-3xl shadow-2xl relative overflow-hidden"
    >
      {/* Animated background particles */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity, 
          repeatType: "mirror" 
        }}
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-200 opacity-10 -z-10"
      />

      {/* Header with advanced styling */}
      <div className="flex items-center justify-between mb-6">
        <motion.h1 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-4xl font-extrabold flex items-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          <Shield className="mr-3 text-blue-600" size={44} />
          BIS Inspector
        </motion.h1>
        <div className="flex items-center space-x-4">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full"
          >
            <Star className="mr-1" />
            <span className="font-semibold">{highScore}</span>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center text-green-600 bg-green-100 px-3 py-1 rounded-full"
          >
            <Trophy className="mr-1" />
            <span className="font-semibold">{score}</span>
          </motion.div>
        </div>
      </div>

      {/* Game screens with enhanced animations */}
      {!gameStarted ? (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-blue-100"
        >
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Welcome, BIS Inspector!
          </h2>
          <p className="mb-6 text-gray-600">
            Identify products with valid BIS certifications before time runs out.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startGame}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center mx-auto"
          >
            <BookOpen className="mr-2" /> Start Inspection
          </motion.button>
        </motion.div>
      ) : !gameOver ? (
        <div>
          {/* Enhanced game status bar */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Clock className="mr-2 text-red-500" />
              <motion.span 
                key={timeLeft}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`font-semibold ${
                  timeLeft < 20 ? 'text-red-600 animate-pulse' : 'text-blue-600'
                }`}
              >
                {timeLeft}s
              </motion.span>
            </div>
            <div className="flex items-center">
              <Star className="mr-2 text-yellow-500" />
              <span>Streak: {streak} (x{multiplier})</span>
            </div>
            {/* Special Power Meter */}
            <motion.div 
              onClick={activateSpecialPower}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1"
            >
              <Target className="mr-2 text-white" size={16} />
              <span className="text-white font-bold">{Math.round(powerCharge)}%</span>
            </motion.div>
          </div>

          <AnimatePresence>
            {currentProducts.map((product) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl mb-4 shadow-xl border border-blue-100 relative overflow-hidden"
              >
                {/* Product icon */}
                <div className="absolute top-2 right-2 opacity-20">
                  {product.icon}
                </div>

                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                    {product.name}
                  </h3>
                  <div className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${product.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' : 
                      product.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' : 
                      'bg-green-100 text-green-700'}
                  `}>
                    {product.riskLevel} Risk
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => checkProduct(product, true)}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg flex items-center hover:from-green-600 hover:to-emerald-700 transition-all"
                  >
                    <Check className="mr-2" /> Certified
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => checkProduct(product, false)}
                    className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg flex items-center hover:from-red-600 hover:to-pink-700 transition-all"
                  >
                    <X className="mr-2" /> Not Certified
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border-2 border-red-100"
        >
          <AlertTriangle className="mx-auto mb-4 text-red-500" size={64} />
          <h2 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
            Inspection Concluded
          </h2>
          <div className="mb-6 space-y-3">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-blue-50 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Trophy className="mr-2 text-yellow-500" />
                  <span className="font-semibold">Final Score</span>
                </div>
                <span className="text-2xl font-bold text-blue-700">{score}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-green-50 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Star className="mr-2 text-green-500" />
                  <span className="font-semibold">Highest Streak</span>
                </div>
                <span className="text-2xl font-bold text-green-700">{streak}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-purple-50 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Layers className="mr-2 text-purple-500" />
                  <span className="font-semibold">Certification Level</span>
                </div>
                <span className="text-2xl font-bold text-purple-700">
                  Level {Math.min(currentLevel, 7)}
                </span>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex space-x-4 justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startGame}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all flex items-center"
            >
              <Shield className="mr-2" /> Retry Inspection
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 rounded-full hover:from-green-600 hover:to-emerald-700 transition-all flex items-center"
            >
              <Target className="mr-2" /> Share Score
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BISInspectorAdvanced;
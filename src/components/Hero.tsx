import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';

export function Hero() {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem('quiz_username') || '');

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem('quiz_username', name.trim());
      navigate('/subjects');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="relative min-h-[100dvh] bg-white overflow-hidden selection:bg-black selection:text-white flex flex-col">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(240,240,240,1)_0%,rgba(255,255,255,1)_100%)] opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-white to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-4 py-4 md:px-8 md:py-6 max-w-[1200px] mx-auto w-full">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-serif italic text-xl">Q</span>
          </div>
          <span className="font-medium text-lg tracking-tight">Quizly</span>
        </div>
        <Link to="/admin" className="text-sm font-medium text-gray-500 hover:text-black transition-colors">
          Admin
        </Link>
      </nav>

      {/* Hero Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-[1200px] mx-auto w-full text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-y-6 md:gap-y-8 w-full"
        >
          <motion.h1
            variants={itemVariants}
            className="text-[42px] sm:text-[50px] md:text-[80px] leading-[0.95] md:leading-[0.9] font-medium tracking-tight text-[#111827] max-w-4xl"
          >
            Master your subjects with <br />
            <span className="font-serif italic text-[52px] sm:text-[60px] md:text-[100px] font-normal text-black">precision</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-[16px] md:text-[18px] text-[#373a46]/80 max-w-[554px] leading-relaxed px-2"
          >
            An interactive, high-end quiz platform designed for BCom Honours students. Challenge yourself in Company Law, Corporate Accounting, and HRM.
          </motion.p>

          <motion.div variants={itemVariants} className="w-full max-w-sm mt-4">
            <form onSubmit={handleStart} className="flex flex-col gap-4 w-full">
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name to start"
                  required
                  className="w-full px-6 py-4 bg-[#fcfcfc] border border-gray-200 rounded-full focus:outline-none focus:border-black transition-colors input-shadow text-center text-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 px-8 bg-black text-white rounded-full text-lg font-medium hover:bg-gray-800 transition-all glossy-shadow flex items-center justify-center gap-2"
              >
                Start Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-8 flex flex-col items-center gap-3 text-sm text-gray-500 font-medium">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="avatar" />
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
                <Star className="w-4 h-4 fill-black text-black" />
              </div>
              <span>1k+ Reviews</span>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}

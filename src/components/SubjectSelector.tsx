import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { quizzes } from '../data/quizzes';
import { ArrowLeft, BookOpen, Calculator, Users } from 'lucide-react';
import { useEffect } from 'react';

const icons: Record<string, any> = {
  "company-law": BookOpen,
  "corporate-accounting": Calculator,
  "hrm": Users,
};

export function SubjectSelector() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('quiz_username');

  useEffect(() => {
    if (!userName) {
      navigate('/');
    }
  }, [userName, navigate]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (!userName) return null;

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] px-4 py-12 md:py-24">
      <div className="max-w-[1000px] mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black mb-8 md:mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mb-10 md:mb-16">
          <h1 className="text-[36px] md:text-[56px] font-medium tracking-tight text-black mb-4 leading-tight">
            Select a <span className="font-serif italic text-gray-500">Subject</span>
          </h1>
          <p className="text-base md:text-lg text-gray-500 max-w-2xl">
            Welcome, {userName}! Choose from our curated list of BCom Honours subjects to test your knowledge. Each quiz contains 10 carefully selected questions.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {Object.values(quizzes).map((quiz) => {
            const Icon = icons[quiz.id] || BookOpen;
            return (
              <motion.div key={quiz.id} variants={itemVariants}>
                <Link
                  to={`/quiz/${quiz.id}`}
                  className="group block h-full p-6 md:p-8 bg-white border border-gray-200 rounded-3xl hover:border-black transition-all duration-300 input-shadow hover:shadow-xl"
                >
                  <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-3">{quiz.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                    {quiz.description}
                  </p>
                  <div className="mt-6 md:mt-8 flex items-center text-sm font-medium text-black">
                    <span>10 Questions</span>
                    <span className="ml-auto opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all">
                      Start &rarr;
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

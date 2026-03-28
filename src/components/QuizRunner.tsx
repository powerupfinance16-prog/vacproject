import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { quizzes } from '../data/quizzes';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ArrowLeft } from 'lucide-react';

export function QuizRunner() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const quiz = quizzes[subjectId || ''];
  const userName = localStorage.getItem('quiz_username');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!quiz) {
      navigate('/subjects');
    }
    if (!userName) {
      navigate('/');
    }
  }, [quiz, userName, navigate]);

  if (!quiz || !userName) return null;

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) return;

    // Check answer silently
    const isCorrect = selectedOption === currentQuestion.correctAnswerIndex;
    const newScore = score + (isCorrect ? 1 : 0);
    
    if (isCorrect) {
      setScore(newScore);
    }

    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setIsFinished(true);
      await saveResult(newScore);
    }
  };

  const saveResult = async (finalScore: number) => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await addDoc(collection(db, 'results'), {
        userName: userName,
        subjectId: quiz.id,
        score: finalScore,
        total: quiz.questions.length,
        createdAt: serverTimestamp(),
      });
    } catch (error: any) {
      console.error('Error saving result:', error);
      setSaveError(error.message || 'Failed to save result');
    } finally {
      setIsSaving(false);
    }
  };

  if (isFinished) {
    return (
      <div className="min-h-[100dvh] bg-[#fcfcfc] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl text-center border border-gray-100"
        >
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl font-serif italic">{score}</span>
            <span className="text-xl">/{quiz.questions.length}</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-2">Quiz Completed</h2>
          <p className="text-gray-500 mb-8 text-sm md:text-base">
            Great job, {userName}! You have successfully completed the {quiz.title} quiz.
          </p>
          
          {saveError && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl text-left">
              <p className="font-semibold mb-1">Could not save your result:</p>
              <p>{saveError}</p>
            </div>
          )}

          <div className="flex flex-col gap-3 md:gap-4">
            <Link
              to="/subjects"
              className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors glossy-shadow text-sm md:text-base"
            >
              Take Another Quiz
            </Link>
            <Link
              to="/"
              className="w-full py-4 bg-gray-100 text-black rounded-full font-medium hover:bg-gray-200 transition-colors text-sm md:text-base"
            >
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] px-4 py-8 md:py-16 flex flex-col">
      <div className="max-w-[800px] mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link to="/subjects" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Exit Quiz</span>
          </Link>
          <div className="text-sm font-medium text-gray-400">
            {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        <div className="w-full bg-gray-200 h-1 rounded-full mb-8 md:mb-12 overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <h2 className="text-2xl md:text-4xl font-medium text-black mb-8 md:mb-10 leading-tight">
                {currentQuestion.text}
              </h2>

              <div className="flex flex-col gap-3 md:gap-4 flex-1">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedOption === index;

                  return (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      className={`w-full text-left p-4 md:p-6 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between
                        ${isSelected ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300 bg-white'}
                      `}
                    >
                      <span className="text-base md:text-lg font-medium">{option}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ml-4 transition-colors ${isSelected ? 'border-black bg-black' : 'border-gray-300'}`} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 md:mt-12 flex justify-end pb-8">
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedOption === null || isSaving}
                  className="w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 transition-colors glossy-shadow flex items-center justify-center gap-2"
                >
                  {isSaving ? 'Saving...' : currentQuestionIndex === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

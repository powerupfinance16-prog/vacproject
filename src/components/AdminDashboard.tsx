import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { ArrowLeft, Lock, Trophy } from 'lucide-react';
import { quizzes } from '../data/quizzes';

export function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aryan1') {
      setIsAuthenticated(true);
      fetchResults();
    } else {
      setError('Incorrect password');
    }
  };

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const q = query(collection(db, 'results'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setResults(data);
    } catch (err: any) {
      console.error('Error fetching results:', err);
      setError(err.message || 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[100dvh] bg-[#fcfcfc] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-[32px] md:rounded-[40px] shadow-2xl border border-gray-100">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Lock className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-medium text-center mb-2">Admin Access</h2>
          <p className="text-gray-500 text-center mb-8 text-sm md:text-base">Enter the admin password to view all quiz results.</p>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Admin Password"
              className="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-black transition-colors"
            />
            <button
              type="submit"
              className="w-full py-4 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors glossy-shadow"
            >
              Unlock Dashboard
            </button>
          </form>
          <Link to="/" className="block text-center mt-6 text-sm text-gray-500 hover:text-black">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-[#fcfcfc] px-4 py-8 md:py-16">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2 text-xs md:text-sm font-medium px-3 md:px-4 py-2 bg-black text-white rounded-full">
            <Trophy className="w-4 h-4" />
            Admin Dashboard
          </div>
        </div>

        <h1 className="text-[36px] md:text-[56px] font-medium tracking-tight text-black mb-8 md:mb-12 leading-tight">
          Quiz <span className="font-serif italic text-gray-500">Results</span>
        </h1>

        {error ? (
          <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-200 text-red-600">
            <p className="font-medium mb-2">Error loading results</p>
            <p className="text-sm">{error}</p>
          </div>
        ) : loading ? (
          <div className="text-center py-20 text-gray-500">Loading results...</div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 text-gray-500">
            No quiz results found yet.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-500">Student Name</th>
                    <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-500">Subject</th>
                    <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-500">Score</th>
                    <th className="px-4 md:px-6 py-4 text-xs md:text-sm font-medium text-gray-500">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {results.map((result) => (
                    <tr key={result.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 md:px-6 py-4 font-medium text-black text-sm md:text-base">
                        {result.userName}
                      </td>
                      <td className="px-4 md:px-6 py-4 text-gray-600 text-sm md:text-base">
                        {quizzes[result.subjectId]?.title || result.subjectId}
                      </td>
                      <td className="px-4 md:px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-black">
                          {result.score} / {result.total}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 text-xs md:text-sm text-gray-500">
                        {result.createdAt
                          ? result.createdAt.toDate
                            ? result.createdAt.toDate().toLocaleDateString()
                            : new Date(result.createdAt).toLocaleDateString()
                          : 'Unknown'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './firebase';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Hero } from './components/Hero';
import { SubjectSelector } from './components/SubjectSelector';
import { QuizRunner } from './components/QuizRunner';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. ");
        }
      }
    }
    testConnection();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/subjects" element={<SubjectSelector />} />
          <Route path="/quiz/:subjectId" element={<QuizRunner />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { Clock, Award, BarChart3 } from 'lucide-react';

export default function Quiz() {
  const { token } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch(`${config.apiUrl}${config.endpoints.quizzesAll}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setQuizzes(data);
      }
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const sampleQuizzes = [
    { id: 1, title: 'Biology Chapter 5', category: 'Biology', difficulty: 'Medium', questions: 10 },
    { id: 2, title: 'Physics Mechanics', category: 'Physics', difficulty: 'Hard', questions: 15 },
    { id: 3, title: 'Chemistry Basics', category: 'Chemistry', difficulty: 'Easy', questions: 8 },
    { id: 4, title: 'Math Calculus', category: 'Mathematics', difficulty: 'Hard', questions: 12 }
  ];

  const sampleQuestions = [
    { id: 1, text: 'What is the powerhouse of the cell?', options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'], correct: 1 },
    { id: 2, text: 'Who discovered DNA?', options: ['Watson & Crick', 'Pasteur', 'Darwin', 'Mendel'], correct: 0 }
  ];
  const visibleQuizzes = quizzes.length ? quizzes : sampleQuizzes;
  const questions = selectedQuiz?.questions?.length ? selectedQuiz.questions.map((question) => ({
    ...question,
    text: question.text || question.question,
    options: Array.isArray(question.options) ? question.options : [],
    correct: typeof question.correct === 'number'
      ? question.correct
      : (question.options || []).indexOf(question.correct_answer)
  })) : sampleQuestions;

  if (selectedQuiz) {
    if (showResults) {
      return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
          <Navbar />
          <div className="max-w-2xl mx-auto px-6 py-12 text-center">
            <Award className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h1>
            <p className="text-6xl font-bold text-cyan-400 mb-6">{score}/{questions.length}</p>
            <p className="text-xl text-gray-300 mb-8">{Math.round((score / questions.length) * 100)}% Correct</p>
            <button
              onClick={() => {
                setSelectedQuiz(null);
                setCurrentQuestion(0);
                setScore(0);
                setShowResults(false);
              }}
              className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-lg font-semibold transition"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      );
    }

    const question = questions[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
        <Navbar />
        <div className="max-w-2xl mx-auto px-6 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">{selectedQuiz.title}</h1>
            <span className="text-gray-400">Question {currentQuestion + 1}/{questions.length}</span>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-8 rounded-xl mb-8">
            <h2 className="text-2xl font-bold text-white mb-8">{question.text}</h2>

            <div className="space-y-4">
              {question.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const nextScore = score + (i === question.correct ? 1 : 0);
                    setScore(nextScore);
                    if (currentQuestion + 1 < questions.length) {
                      setCurrentQuestion(currentQuestion + 1);
                    } else {
                      setShowResults(true);
                    }
                  }}
                  className="w-full bg-slate-700/50 hover:bg-cyan-500/30 border border-cyan-500/20 hover:border-cyan-500/50 p-4 rounded-lg text-left text-white transition"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-10">Practice Quizzes</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl hover:border-cyan-500/50 transition cursor-pointer group"
              onClick={() => setSelectedQuiz(quiz)}
            >
              <h3 className="text-xl font-bold text-white mb-3">{quiz.title}</h3>
              
              <div className="space-y-2 mb-6">
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <BarChart3 size={16} /> {quiz.category}
                </p>
                <p className="text-gray-400 text-sm flex items-center gap-2">
                  <Clock size={16} /> {quiz.questions || quiz.questions_count || quiz.question_count || 2} Questions
                </p>
                <p className={`text-sm font-semibold ${
                  quiz.difficulty === 'Easy' ? 'text-green-400' :
                  quiz.difficulty === 'Medium' ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {quiz.difficulty} Difficulty
                </p>
              </div>

              <button className="w-full bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition font-semibold">
                Start Quiz
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
          404
        </div>

        <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-400 mb-10 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. Let's get you back on track with your learning.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/"
            className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <Home size={20} /> Go Home
          </Link>

          <Link
            to="/dashboard"
            className="border border-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition"
          >
            <ArrowLeft size={20} /> Back to Dashboard
          </Link>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm mb-4">Lost? Here are some helpful links:</p>
          <div className="flex gap-6 justify-center text-gray-400 text-sm flex-wrap">
            <Link to="/" className="hover:text-cyan-400">Home</Link>
            <Link to="/chat" className="hover:text-cyan-400">AI Chat</Link>
            <Link to="/notes" className="hover:text-cyan-400">Notes</Link>
            <Link to="/quiz" className="hover:text-cyan-400">Quiz</Link>
            <Link to="/pricing" className="hover:text-cyan-400">Pricing</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-cyan-500/20 text-gray-400 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">EduAI Hub</h3>
            <p className="text-sm">AI-powered learning platform for students</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/chat" className="hover:text-cyan-400">AI Tutor</Link></li>
              <li><Link to="/notes" className="hover:text-cyan-400">Notes</Link></li>
              <li><Link to="/quiz" className="hover:text-cyan-400">Quiz</Link></li>
              <li><Link to="/pricing" className="hover:text-cyan-400">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400">About</a></li>
              <li><a href="#" className="hover:text-cyan-400">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400">Contact</a></li>
              <li><a href="#" className="hover:text-cyan-400">Support</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-cyan-400">Privacy</a></li>
              <li><a href="#" className="hover:text-cyan-400">Terms</a></li>
              <li><a href="#" className="hover:text-cyan-400">Cookies</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex justify-between items-center">
          <p className="text-sm">&copy; 2024 EduAI Hub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-cyan-400">Twitter</a>
            <a href="#" className="hover:text-cyan-400">LinkedIn</a>
            <a href="#" className="hover:text-cyan-400">Discord</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
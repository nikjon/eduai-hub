import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = user
    ? [
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Chat', href: '/chat' },
        { name: 'Notes', href: '/notes' },
        { name: 'Quiz', href: '/quiz' },
        { name: 'Planner', href: '/planner' },
        ...(user.isAdmin ? [{ name: 'Admin', href: '/admin' }] : [])
      ]
    : [
        { name: 'Pricing', href: '/pricing' },
        { name: 'Login', href: '/login' }
      ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-cyan-400">
          EduAI Hub
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`transition ${
                location.pathname === link.href
                  ? 'text-cyan-400 font-semibold'
                  : 'text-gray-300 hover:text-cyan-400'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/profile" className="text-gray-300 hover:text-cyan-400">
                {user.fullName}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-800/50 border-t border-cyan-500/20 px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="block text-gray-300 hover:text-cyan-400 py-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {user && (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition justify-center"
            >
              <LogOut size={18} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
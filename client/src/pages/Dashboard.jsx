import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { BarChart3, Flame, BookOpen, Award } from 'lucide-react';

export default function Dashboard() {
  const { user, token } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${config.apiUrl}${config.endpoints.userStats}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { name: 'Ask AI', path: '/chat', icon: '🤖' },
    { name: 'Take Quiz', path: '/quiz', icon: '📝' },
    { name: 'View Notes', path: '/notes', icon: '📚' },
    { name: 'Study Plan', path: '/planner', icon: '📅' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-2">
            Welcome back, {user?.fullName}! 👋
          </h1>
          <p className="text-gray-400">Let's continue your learning journey</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Questions Asked</p>
                <p className="text-3xl font-bold text-white">{stats?.questions_asked ?? 0}</p>
              </div>
              <BarChart3 className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Study Streak</p>
                <p className="text-3xl font-bold text-white">{stats?.streak ?? stats?.study_streak ?? 0}</p>
              </div>
              <Flame className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Quizzes Taken</p>
                <p className="text-3xl font-bold text-white">{stats?.quizzes_taken ?? 0}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-400" />
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Badges Earned</p>
                <p className="text-3xl font-bold text-white">{stats?.badges_earned ?? 0}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Link
                key={action.path}
                href={action.path}
                className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl hover:border-cyan-500/50 transition text-center group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition">{action.icon}</div>
                <p className="text-white font-semibold">{action.name}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl">
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <div>
                  <p className="text-white font-semibold">Completed Quiz: Biology Chapter 5</p>
                  <p className="text-gray-400 text-sm">Scored 88%</p>
                </div>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <div>
                  <p className="text-white font-semibold">Downloaded Notes: Physics Optics</p>
                  <p className="text-gray-400 text-sm">2 hours ago</p>
                </div>
                <span className="text-cyan-400">📥</span>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Asked 5 questions in AI Chat</p>
                  <p className="text-gray-400 text-sm">1 hour ago</p>
                </div>
                <span className="text-blue-400">💬</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { User, Mail, Award, Flame, BookOpen } from 'lucide-react';

export default function Profile() {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState({});
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', bio: '', avatar: '' });
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${config.apiUrl}${config.endpoints.userProfile}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data);
        setForm({ fullName: data.full_name || user?.fullName || '', bio: data.bio || '', avatar: data.avatar || '' });
      }

      const badgesResponse = await fetch(`${config.apiUrl}${config.endpoints.userBadges}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (badgesResponse.ok) {
        const badgesData = await badgesResponse.json();
        setBadges(badgesData);
      }

      const statsResponse = await fetch(`${config.apiUrl}${config.endpoints.userStats}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (statsResponse.ok) setStats(await statsResponse.json());
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (event) => {
    event.preventDefault();
    const response = await fetch(`${config.apiUrl}${config.endpoints.userProfile}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    if (!response.ok) return setNotice(data.error || 'Could not update profile');
    setNotice('Profile updated successfully');
    setEditing(false);
    fetchProfile();
  };

  const sampleBadges = [
    { name: 'Quick Learner', icon: '⚡', desc: 'Complete 5 quizzes' },
    { name: 'Note Master', icon: '📚', desc: 'Download 10 notes' },
    { name: 'First Steps', icon: '🚀', desc: 'Complete first quiz' },
    { name: 'Chat Expert', icon: '💬', desc: 'Ask 50 AI questions' },
    { name: 'Consistency', icon: '🔥', desc: '7-day study streak' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-8 rounded-xl mb-12 flex items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-4xl">
            👤
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-white mb-2">{user?.fullName}</h1>
            <p className="text-gray-400 flex items-center gap-2 mb-4">
              <Mail size={16} /> {user?.email}
            </p>
            
            <button onClick={() => setEditing((value) => !value)} className="bg-cyan-500 hover:bg-cyan-600 px-6 py-2 rounded-lg transition font-semibold">{editing ? 'Close editor' : 'Edit Profile'}</button>
            {notice && <p className="mt-3 text-sm text-cyan-300">{notice}</p>}
          </div>
        </div>

        {editing && <form onSubmit={saveProfile} className="mb-12 grid gap-4 rounded-xl border border-cyan-500/20 bg-slate-800/50 p-6"><h2 className="text-xl font-semibold text-white">Edit your profile</h2><input required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="rounded-lg border border-cyan-500/30 bg-slate-900 px-4 py-3 text-white" placeholder="Full name" /><textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="min-h-28 rounded-lg border border-cyan-500/30 bg-slate-900 px-4 py-3 text-white" placeholder="Short bio" /><button className="w-fit rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white hover:bg-cyan-600">Save changes</button></form>}

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-2">Total XP</p>
            <p className="text-3xl font-bold text-cyan-400">{stats.xp ?? 0}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-2">Study Streak</p>
            <p className="text-3xl font-bold text-orange-400 flex items-center justify-center gap-2">
              <Flame size={24} /> {stats.streak ?? stats.study_streak ?? 0}
            </p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-2">Quizzes Taken</p>
            <p className="text-3xl font-bold text-green-400">{stats.quizzes_taken ?? 0}</p>
          </div>

          <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl text-center">
            <p className="text-gray-400 text-sm mb-2">Badges</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.badges_earned ?? badges.length}</p>
          </div>
        </div>

        {/* Badges Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(badges.length ? badges.map((entry) => entry.badges || entry) : sampleBadges).map((badge, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl text-center hover:border-cyan-500/50 transition"
              >
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="text-white font-semibold mb-2">{badge.name}</h3>
                <p className="text-gray-400 text-sm">{badge.desc || badge.description}</p>
              </div>
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
                  <p className="text-white font-semibold">Completed Quiz: Biology</p>
                  <p className="text-gray-400 text-sm">Scored 92%</p>
                </div>
                <span className="text-green-400">✓</span>
              </div>
              
              <div className="flex justify-between items-center pb-4 border-b border-slate-700">
                <div>
                  <p className="text-white font-semibold">Downloaded Notes: Physics</p>
                  <p className="text-gray-400 text-sm">5 hours ago</p>
                </div>
                <span className="text-cyan-400">📥</span>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="text-white font-semibold">Earned Badge: Quick Learner</p>
                  <p className="text-gray-400 text-sm">1 day ago</p>
                </div>
                <span className="text-yellow-400">⚡</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

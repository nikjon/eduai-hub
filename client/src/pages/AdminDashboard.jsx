import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { BarChart3, BookOpen, FileText, Users, Upload, Plus, Trophy } from 'lucide-react';

const initialQuiz = { title: '', category: 'Physics', difficulty: 'Easy', description: '' };

export default function AdminDashboard() {
  const { user, token } = useAuth();
  const [dashboard, setDashboard] = useState({});
  const [users, setUsers] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [quiz, setQuiz] = useState(initialQuiz);
  const [note, setNote] = useState({ title: '', subject: 'Physics', semester: 'Sem 1', content: '', url: '' });
  const [message, setMessage] = useState('');

  const request = async (path, options = {}) => {
    const response = await fetch(`${config.apiUrl}${path}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(options.headers || {}) }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Request failed');
    return data;
  };

  useEffect(() => {
    if (!user?.isAdmin) return;
    Promise.all([
      request(config.endpoints.adminDashboard),
      request(config.endpoints.adminUsers),
      request(config.endpoints.quizzesLeaderboard)
    ]).then(([stats, allUsers, scores]) => {
      setDashboard(stats);
      setUsers(allUsers);
      setLeaderboard(scores);
    }).catch((error) => setMessage(error.message));
  }, [user?.isAdmin]);

  const submitQuiz = async (event) => {
    event.preventDefault();
    try {
      await request(config.endpoints.adminQuizzes, { method: 'POST', body: JSON.stringify(quiz) });
      setQuiz(initialQuiz);
      setMessage('Quiz created successfully.');
    } catch (error) { setMessage(error.message); }
  };

  const submitNote = async (event) => {
    event.preventDefault();
    try {
      await request(config.endpoints.notesCreate, { method: 'POST', body: JSON.stringify(note) });
      setNote({ title: '', subject: 'Physics', semester: 'Sem 1', content: '', url: '' });
      setMessage('Note uploaded successfully.');
    } catch (error) { setMessage(error.message); }
  };

  if (!user?.isAdmin) {
    return <div className="min-h-screen bg-slate-950 text-white"><Navbar /><main className="mx-auto max-w-3xl px-6 py-24 text-center"><h1 className="text-4xl font-bold">Admin access required</h1><p className="mt-4 text-slate-400">Your account does not have administrator permissions.</p></main></div>;
  }

  const stats = [
    { label: 'Users', value: dashboard.totalUsers || 0, icon: Users },
    { label: 'Quizzes', value: dashboard.totalQuizzes || 0, icon: BookOpen },
    { label: 'Notes', value: dashboard.totalNotes || 0, icon: FileText },
    { label: 'Attempts', value: dashboard.totalAttempts || 0, icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div><p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Control room</p><h1 className="text-4xl font-bold">Admin Dashboard</h1><p className="mt-2 text-slate-400">Manage learning content and track platform activity.</p></div>
          {message && <p className="rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-200">{message}</p>}
        </div>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="admin-panel p-5"><Icon className="mb-5 text-cyan-400" size={22} /><p className="text-sm text-slate-400">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p></div>)}</div>
        <div className="grid gap-6 lg:grid-cols-2">
          <form onSubmit={submitNote} className="admin-panel space-y-4 p-6"><div className="flex items-center gap-3"><Upload className="text-cyan-400" /><h2 className="text-xl font-semibold">Upload study note</h2></div><input required placeholder="Note title" value={note.title} onChange={(e) => setNote({ ...note, title: e.target.value })} className="admin-input" /><div className="grid gap-4 sm:grid-cols-2"><select value={note.subject} onChange={(e) => setNote({ ...note, subject: e.target.value })} className="admin-input"><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Mathematics</option></select><select value={note.semester} onChange={(e) => setNote({ ...note, semester: e.target.value })} className="admin-input"><option>Sem 1</option><option>Sem 2</option><option>Sem 3</option><option>Sem 4</option></select></div><textarea required placeholder="Note content" value={note.content} onChange={(e) => setNote({ ...note, content: e.target.value })} className="admin-input min-h-32" /><input placeholder="Download URL (optional)" value={note.url} onChange={(e) => setNote({ ...note, url: e.target.value })} className="admin-input" /><button className="admin-button"><Upload size={18} /> Publish note</button></form>
          <form onSubmit={submitQuiz} className="admin-panel space-y-4 p-6"><div className="flex items-center gap-3"><Plus className="text-cyan-400" /><h2 className="text-xl font-semibold">Create quiz</h2></div><input required placeholder="Quiz title" value={quiz.title} onChange={(e) => setQuiz({ ...quiz, title: e.target.value })} className="admin-input" /><div className="grid gap-4 sm:grid-cols-2"><select value={quiz.category} onChange={(e) => setQuiz({ ...quiz, category: e.target.value })} className="admin-input"><option>Physics</option><option>Chemistry</option><option>Biology</option><option>Mathematics</option></select><select value={quiz.difficulty} onChange={(e) => setQuiz({ ...quiz, difficulty: e.target.value })} className="admin-input"><option>Easy</option><option>Medium</option><option>Hard</option></select></div><textarea placeholder="Quiz description" value={quiz.description} onChange={(e) => setQuiz({ ...quiz, description: e.target.value })} className="admin-input min-h-32" /><button className="admin-button"><Plus size={18} /> Create quiz</button></form>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2"><section className="admin-panel p-6"><h2 className="mb-5 flex items-center gap-3 text-xl font-semibold"><Trophy className="text-amber-300" />Leaderboard</h2>{leaderboard.slice(0, 8).map((entry, index) => <div key={`${entry.created_at}-${index}`} className="flex items-center justify-between border-b border-white/10 py-3 text-sm"><span>#{index + 1} {entry.users?.full_name || 'Student'}</span><strong className="text-cyan-300">{entry.score}%</strong></div>)}{!leaderboard.length && <p className="text-slate-400">No quiz results yet.</p>}</section><section className="admin-panel p-6"><h2 className="mb-5 text-xl font-semibold">Recent users</h2>{users.slice(0, 8).map((entry) => <div key={entry.id} className="flex items-center justify-between border-b border-white/10 py-3 text-sm"><span>{entry.full_name}</span><span className="text-slate-400">{entry.email}</span></div>)}{!users.length && <p className="text-slate-400">No users found.</p>}</section></div>
      </main>
    </div>
  );
}

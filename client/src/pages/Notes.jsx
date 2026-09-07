import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';
import { Download, Bookmark, Search } from 'lucide-react';

export default function Notes() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [subject, setSubject] = useState('');
  const [semester, setSemester] = useState('');
  const [bookmarked, setBookmarked] = useState(() => JSON.parse(localStorage.getItem('eduai_bookmarks') || '[]'));

  useEffect(() => {
    fetchNotes();
  }, [search, subject, semester]);

  const fetchNotes = async () => {
    try {
      let url = `${config.apiUrl}${config.endpoints.notesAll}?`;
      if (search) url += `search=${search}&`;
      if (subject) url += `subject=${subject}&`;
      if (semester) url += `semester=${semester}&`;

      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setNotes(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const sampleNotes = [
    { id: 1, title: 'Physics - Mechanics', subject: 'Physics', semester: 'Sem 1', url: 'data:text/plain;charset=utf-8,Physics Mechanics study notes' },
    { id: 2, title: 'Chemistry - Organic', subject: 'Chemistry', semester: 'Sem 2', url: 'data:text/plain;charset=utf-8,Organic Chemistry study notes' },
    { id: 3, title: 'Biology - Cell Biology', subject: 'Biology', semester: 'Sem 1', url: 'data:text/plain;charset=utf-8,Cell Biology study notes' },
    { id: 4, title: 'Mathematics - Calculus', subject: 'Mathematics', semester: 'Sem 2', url: 'data:text/plain;charset=utf-8,Calculus study notes' }
  ];
  const visibleNotes = (notes.length ? notes : sampleNotes).filter((note) => {
    const matchesSearch = !search || note.title.toLowerCase().includes(search.toLowerCase());
    return matchesSearch && (!subject || note.subject === subject) && (!semester || note.semester === semester);
  });
  const toggleBookmark = (id) => {
    const next = bookmarked.includes(id) ? bookmarked.filter((noteId) => noteId !== id) : [...bookmarked, id];
    setBookmarked(next);
    localStorage.setItem('eduai_bookmarks', JSON.stringify(next));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-10">Study Notes</h1>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-cyan-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-700/50 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition"
            />
          </div>

          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
          >
            <option value="">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Biology">Biology</option>
            <option value="Mathematics">Mathematics</option>
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition"
          >
            <option value="">All Semesters</option>
            <option value="Sem 1">Semester 1</option>
            <option value="Sem 2">Semester 2</option>
            <option value="Sem 3">Semester 3</option>
            <option value="Sem 4">Semester 4</option>
          </select>
        </div>

        {/* Notes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleNotes.map((note) => (
            <div
              key={note.id}
              className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl hover:border-cyan-500/50 transition group"
            >
              <h3 className="text-xl font-bold text-white mb-2">{note.title}</h3>
              <p className="text-gray-400 text-sm mb-4">
                {note.subject} • {note.semester}
              </p>
              
              <div className="flex gap-3">
                <a href={note.url || '#'} download={`${note.title}.txt`} className="flex-1 flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition">
                  <Download size={18} /> Download
                </a>
                <button onClick={() => toggleBookmark(note.id)} aria-label="Bookmark note" className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition ${bookmarked.includes(note.id) ? 'bg-cyan-500 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
                  <Bookmark size={18} fill={bookmarked.includes(note.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleNotes.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No notes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
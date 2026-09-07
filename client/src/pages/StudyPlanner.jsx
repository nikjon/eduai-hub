import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Calendar, Plus, Clock } from 'lucide-react';

export default function StudyPlanner() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('eduai_tasks') || '[]'));
  const [newTask, setNewTask] = useState('');
  const [seconds, setSeconds] = useState(25 * 60);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('eduai_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!timerRunning) return undefined;
    const timer = setInterval(() => setSeconds((value) => {
      if (value <= 1) {
        setTimerRunning(false);
        return 25 * 60;
      }
      return value - 1;
    }), 1000);
    return () => clearInterval(timer);
  }, [timerRunning]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        dueDate: new Date().toISOString().split('T')[0],
        priority: 'medium',
        completed: false
      }]);
      setNewTask('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-10">Study Planner</h1>

        {/* Add Task */}
        <div className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl mb-10">
          <div className="flex gap-3">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new study task..."
              className="flex-1 bg-slate-700/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg flex items-center gap-2 transition"
            >
              <Plus size={20} /> Add
            </button>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`bg-slate-800/50 backdrop-blur border ${
                task.completed ? 'border-green-500/20 opacity-75' : 'border-cyan-500/20'
              } p-6 rounded-xl transition`}
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    setTasks(tasks.map(t =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    ));
                  }}
                  className="w-5 h-5 rounded accent-cyan-500"
                />
                <div className="flex-1">
                  <h3 className={`text-lg font-semibold ${
                    task.completed ? 'text-gray-400 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-2">
                    <Calendar size={16} /> {task.dueDate}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  task.priority === 'high' ? 'bg-red-500/20 text-red-300' :
                  task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {task.priority}
                </span>
              </div>
            </div>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No tasks yet. Add one to get started!</p>
          </div>
        )}

        {/* Pomodoro Timer Section */}
        <div className="mt-12 bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold text-white mb-6">Pomodoro Timer</h2>
          <div className="text-6xl font-bold text-cyan-400 mb-6 font-mono">{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</div>
          <div className="flex gap-4 justify-center">
            <button onClick={() => setTimerRunning(true)} className="bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-lg font-semibold transition">Start</button>
            <button onClick={() => setTimerRunning(false)} className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-lg font-semibold transition">Pause</button>
            <button onClick={() => { setTimerRunning(false); setSeconds(25 * 60); }} className="bg-slate-700 hover:bg-slate-600 px-8 py-3 rounded-lg font-semibold transition">Reset</button>
          </div>
        </div>
      </div>
    </div>
  );
}

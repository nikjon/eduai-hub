import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Admin Authentication Middleware
const isAdmin = async (req, res, next) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', req.user.id)
      .single();

    if (!user?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Authorization failed' });
  }
};

// Get Dashboard Stats
router.get('/dashboard', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { data: userCount } = await supabase
      .from('users')
      .select('id', { count: 'exact' });

    const { data: quizCount } = await supabase
      .from('quizzes')
      .select('id', { count: 'exact' });

    const { data: noteCount } = await supabase
      .from('notes')
      .select('id', { count: 'exact' });

    res.json({
      totalUsers: userCount?.length || 0,
      totalQuizzes: quizCount?.length || 0,
      totalNotes: noteCount?.length || 0,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

// Get All Users
router.get('/users', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { data: users } = await supabase
      .from('users')
      .select('id, email, full_name, created_at')
      .order('created_at', { ascending: false });

    res.json(users || []);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get All Quizzes
router.get('/quizzes', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('*')
      .order('created_at', { ascending: false });

    res.json(quizzes || []);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Create Quiz
router.post('/quizzes', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { title, category, difficulty, description } = req.body;
    const quizId = uuidv4();

    const { error } = await supabase
      .from('quizzes')
      .insert({
        id: quizId,
        title,
        category,
        difficulty,
        description,
        created_by: req.user.id,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.status(201).json({ id: quizId, message: 'Quiz created successfully' });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// Get Analytics
router.get('/analytics', authenticateToken, isAdmin, async (req, res) => {
  try {
    const { data: quizResults } = await supabase
      .from('quiz_results')
      .select('score, created_at')
      .order('created_at', { ascending: false })
      .limit(100);

    const averageScore = quizResults?.reduce((sum, r) => sum + r.score, 0) / (quizResults?.length || 1) || 0;

    res.json({
      averageScore: Math.round(averageScore),
      totalAttempts: quizResults?.length || 0,
      recentActivity: quizResults || []
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

export default router;

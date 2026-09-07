import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get All Quizzes
router.get('/', async (req, res) => {
  try {
    const { category, difficulty } = req.query;
    let query = supabase.from('quizzes').select('*');

    if (category) query = query.eq('category', category);
    if (difficulty) query = query.eq('difficulty', difficulty);

    const { data: quizzes } = await query.order('created_at', { ascending: false });
    res.json(quizzes || []);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// Get Leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const { data: leaderboard } = await supabase
      .from('quiz_results')
      .select('users(full_name), score, created_at')
      .order('score', { ascending: false })
      .limit(20);

    res.json(leaderboard || []);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Get Quiz Details with Questions
router.get('/:id', async (req, res) => {
  try {
    const { data: quiz } = await supabase
      .from('quizzes')
      .select('*, questions(*)')
      .eq('id', req.params.id)
      .single();

    res.json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Submit Quiz Answer
router.post('/:id/answer', authenticateToken, async (req, res) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    const { data: question } = await supabase
      .from('questions')
      .select('correct_answer')
      .eq('id', questionId)
      .single();

    const isCorrect = question.correct_answer === selectedAnswer;

    const answerId = uuidv4();
    const { error } = await supabase
      .from('quiz_answers')
      .insert({
        id: answerId,
        quiz_id: req.params.id,
        user_id: req.user.id,
        question_id: questionId,
        selected_answer: selectedAnswer,
        is_correct: isCorrect,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.json({ isCorrect, correctAnswer: question.correct_answer });
  } catch (error) {
    console.error('Error submitting answer:', error);
    res.status(500).json({ error: 'Failed to submit answer' });
  }
});

// Get User Quiz Results
router.get('/user/results', authenticateToken, async (req, res) => {
  try {
    const { data: results } = await supabase
      .from('quiz_results')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    res.json(results || []);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

export default router;

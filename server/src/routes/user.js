import express from 'express';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get User Profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('*')
      .eq('id', req.user.id)
      .single();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update User Profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, bio, avatar } = req.body;

    const { error } = await supabase
      .from('users')
      .update({
        full_name: fullName,
        bio,
        avatar
      })
      .eq('id', req.user.id);

    if (error) throw error;

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Get User Statistics
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const { data: stats } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    res.json(stats || {});
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get User Badges
router.get('/badges', authenticateToken, async (req, res) => {
  try {
    const { data: badges } = await supabase
      .from('user_badges')
      .select('badges(*)')
      .eq('user_id', req.user.id);

    res.json(badges || []);
  } catch (error) {
    console.error('Error fetching badges:', error);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

// Get Study Streak
router.get('/streak', authenticateToken, async (req, res) => {
  try {
    const { data: streak } = await supabase
      .from('study_streaks')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    res.json(streak || { days: 0, lastStudyDate: null });
  } catch (error) {
    console.error('Error fetching streak:', error);
    res.status(500).json({ error: 'Failed to fetch streak' });
  }
});

export default router;

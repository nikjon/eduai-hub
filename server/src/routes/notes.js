import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get All Notes
router.get('/', async (req, res) => {
  try {
    const { subject, semester, search } = req.query;
    let query = supabase.from('notes').select('*');

    if (subject) query = query.eq('subject', subject);
    if (semester) query = query.eq('semester', semester);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data: notes } = await query.order('created_at', { ascending: false });
    res.json(notes || []);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

// Get User Bookmarks
router.get('/user/bookmarks', authenticateToken, async (req, res) => {
  try {
    const { data: bookmarks } = await supabase
      .from('bookmarks')
      .select('notes(*)')
      .eq('user_id', req.user.id);

    res.json(bookmarks || []);
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    res.status(500).json({ error: 'Failed to fetch bookmarks' });
  }
});

// Get Single Note
router.get('/:id', async (req, res) => {
  try {
    const { data: note } = await supabase
      .from('notes')
      .select('*')
      .eq('id', req.params.id)
      .single();

    res.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    res.status(500).json({ error: 'Failed to fetch note' });
  }
});

// Upload Note (Admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { data: user } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', req.user.id)
      .single();
    if (!user?.is_admin) {
      return res.status(403).json({ error: 'Only admins can upload notes' });
    }

    const { title, subject, semester, content, url } = req.body;
    const noteId = uuidv4();

    const { error } = await supabase
      .from('notes')
      .insert({
        id: noteId,
        title,
        subject,
        semester,
        content,
        url,
        uploaded_by: req.user.id,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.status(201).json({ id: noteId, message: 'Note uploaded successfully' });
  } catch (error) {
    console.error('Error uploading note:', error);
    res.status(500).json({ error: 'Failed to upload note' });
  }
});

// Bookmark Note
router.post('/:id/bookmark', authenticateToken, async (req, res) => {
  try {
    const bookmarkId = uuidv4();

    const { error } = await supabase
      .from('bookmarks')
      .insert({
        id: bookmarkId,
        user_id: req.user.id,
        note_id: req.params.id,
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.json({ message: 'Note bookmarked' });
  } catch (error) {
    console.error('Error bookmarking note:', error);
    res.status(500).json({ error: 'Failed to bookmark note' });
  }
});

export default router;

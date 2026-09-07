import express from 'express';
import { OpenAI } from 'openai';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Get Chat History
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const { data: chats } = await supabase
      .from('chat_sessions')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false });

    res.json(chats || []);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

// Create New Chat
router.post('/new', authenticateToken, async (req, res) => {
  try {
    const chatId = uuidv4();
    const { title } = req.body;

    const { error } = await supabase
      .from('chat_sessions')
      .insert({
        id: chatId,
        user_id: req.user.id,
        title: title || 'New Chat',
        created_at: new Date().toISOString()
      });

    if (error) throw error;

    res.status(201).json({ id: chatId, title: title || 'New Chat' });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Failed to create chat' });
  }
});

// Send Message
router.post('/message', authenticateToken, async (req, res) => {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save user message
    const messageId = uuidv4();
    await supabase
      .from('messages')
      .insert({
        id: messageId,
        chat_id: chatId,
        user_id: req.user.id,
        content: message,
        role: 'user',
        created_at: new Date().toISOString()
      });

    // Get AI Response
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are EduAI, a helpful AI tutor assisting students with their studies. Be concise, clear, and educational.'
        },
        {
          role: 'user',
          content: message
        }
      ]
    });

    const aiResponse = completion.choices[0].message.content;

    // Save AI response
    const aiMessageId = uuidv4();
    await supabase
      .from('messages')
      .insert({
        id: aiMessageId,
        chat_id: chatId,
        user_id: req.user.id,
        content: aiResponse,
        role: 'assistant',
        created_at: new Date().toISOString()
      });

    res.json({
      message: aiResponse,
      messageId: aiMessageId
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get Chat Messages
router.get('/:chatId', authenticateToken, async (req, res) => {
  try {
    const { data: messages } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_id', req.params.chatId)
      .order('created_at', { ascending: true });

    res.json(messages || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// Delete Chat
router.delete('/:chatId', authenticateToken, async (req, res) => {
  try {
    await supabase
      .from('chat_sessions')
      .delete()
      .eq('id', req.params.chatId)
      .eq('user_id', req.user.id);

    res.json({ message: 'Chat deleted' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ error: 'Failed to delete chat' });
  }
});

export default router;

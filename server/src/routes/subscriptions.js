import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../config/supabase.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();
const plans = {
  Free: { amount: 0, durationMonths: 0 },
  Pro: { amount: 299, durationMonths: 1 },
  Premium: { amount: 999, durationMonths: 1 }
};

router.get('/current', authenticateToken, async (req, res) => {
  try {
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    res.json(subscription || { plan: 'Free', status: 'active' });
  } catch (error) {
    console.error('Error fetching subscription:', error);
    res.status(500).json({ error: 'Failed to fetch subscription' });
  }
});

router.post('/checkout', authenticateToken, async (req, res) => {
  try {
    const { plan } = req.body;
    const selectedPlan = plans[plan];
    if (!selectedPlan) return res.status(400).json({ error: 'Invalid plan' });

    const startedAt = new Date();
    const endsAt = selectedPlan.durationMonths
      ? new Date(startedAt.setMonth(startedAt.getMonth() + selectedPlan.durationMonths))
      : null;

    await supabase
      .from('subscriptions')
      .update({ status: 'expired' })
      .eq('user_id', req.user.id)
      .eq('status', 'active');

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .insert({
        id: uuidv4(),
        user_id: req.user.id,
        plan,
        status: 'active',
        started_at: new Date().toISOString(),
        ends_at: endsAt?.toISOString() || null
      })
      .select()
      .single();
    if (error) throw error;

    await supabase.from('payments').insert({
      id: uuidv4(),
      user_id: req.user.id,
      amount: selectedPlan.amount,
      currency: 'INR',
      status: selectedPlan.amount ? 'pending' : 'completed'
    });

    res.status(201).json({ subscription, paymentRequired: Boolean(selectedPlan.amount) });
  } catch (error) {
    console.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Failed to start subscription' });
  }
});

router.post('/cancel', authenticateToken, async (req, res) => {
  try {
    const { error } = await supabase
      .from('subscriptions')
      .update({ status: 'cancelled' })
      .eq('user_id', req.user.id)
      .eq('status', 'active');
    if (error) throw error;
    res.json({ message: 'Subscription cancelled' });
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
});

export default router;

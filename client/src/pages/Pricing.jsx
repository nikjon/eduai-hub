import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import config from '../config/config';

export default function Pricing() {
  const { token } = useAuth();
  const [message, setMessage] = useState('');
  const plans = [
    {
      name: 'Free',
      price: '₹0',
      description: 'Perfect for getting started',
      features: [
        'AI Chat (100 questions/day)',
        'Basic Quiz Access',
        'Download Notes',
        'Study Streak Tracking',
        'Mobile App Access'
      ],
      cta: 'Get Started'
    },
    {
      name: 'Pro',
      price: '₹299',
      period: '/month',
      description: 'Best for serious learners',
      features: [
        'Unlimited AI Chat',
        'Premium Quizzes',
        'All Notes & PYQ',
        'No Ads',
        'Priority Support',
        'Monthly Reports',
        'Study Groups Access'
      ],
      cta: 'Try Now',
      popular: true
    },
    {
      name: 'Premium',
      price: '₹999',
      period: '/month',
      description: 'Ultimate learning experience',
      features: [
        'Everything in Pro',
        'Live Mentorship Sessions',
        '1-on-1 Doubt Sessions',
        'Custom Study Plans',
        'VIP Support',
        'Early Access to Features',
        'Certification Programs'
      ],
      cta: 'Go Premium',
    }
  ];

  const faqs = [
    {
      q: 'Can I change my plan anytime?',
      a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.'
    },
    {
      q: 'What payment methods are accepted?',
      a: 'We accept all major credit cards, debit cards, and digital wallets like Google Pay and Apple Pay.'
    },
    {
      q: 'Is there a free trial?',
      a: 'Yes! Start with our Free plan and upgrade anytime. All paid plans include a 7-day money-back guarantee.'
    },
    {
      q: 'How do I cancel my subscription?',
      a: 'You can cancel anytime from your account settings. No questions asked, no hidden fees.'
    }
  ];

  const choosePlan = async (plan) => {
    if (!token) return setMessage('Please sign in before choosing a paid plan.');
    const response = await fetch(`${config.apiUrl}${config.endpoints.subscriptionCheckout}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ plan }) });
    const data = await response.json();
    setMessage(response.ok ? `${plan} plan activated. Payment status: ${data.paymentRequired ? 'pending' : 'complete'}.` : data.error || 'Could not start subscription.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-400">Choose the perfect plan for your learning journey</p>
          {message && <p className="mx-auto mt-5 max-w-xl rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-4 py-3 text-cyan-200">{message}</p>}
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl transition ${
                plan.popular
                  ? 'bg-gradient-to-b from-cyan-600 to-blue-600 border-2 border-cyan-400 transform scale-105 shadow-2xl'
                  : 'bg-slate-800/50 backdrop-blur border border-cyan-500/20 hover:border-cyan-500/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-yellow-400 text-slate-900 px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className={`text-sm mb-6 ${plan.popular ? 'text-cyan-100' : 'text-gray-400'}`}>
                {plan.description}
              </p>

              <div className="mb-8">
                <span className="text-5xl font-bold text-white">{plan.price}</span>
                <span className={plan.popular ? 'text-cyan-100' : 'text-gray-400'}>{plan.period}</span>
              </div>

              <button onClick={() => choosePlan(plan.name)} className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                plan.popular
                  ? 'bg-white text-cyan-600 hover:bg-gray-100'
                  : 'bg-cyan-500 hover:bg-cyan-600 text-white'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-4">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <Check size={20} className={plan.popular ? 'text-white' : 'text-cyan-400'} />
                    <span className={plan.popular ? 'text-white' : 'text-gray-300'}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-6 rounded-xl"
              >
                <h3 className="text-lg font-semibold text-white mb-3">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to transform your learning?</h2>
          <p className="text-gray-300 mb-8">Join thousands of students using EduAI Hub</p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-lg font-semibold transition">
              Start Free Trial
            </Link>
            <button className="border border-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-lg font-semibold transition">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

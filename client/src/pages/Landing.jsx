import { Link } from 'react-router-dom';
import { ArrowRight, Zap, BookOpen, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const features = [
    { icon: Sparkles, title: 'AI Tutor', description: 'Ask anything from our AI. Get instant, detailed answers.' },
    { icon: BookOpen, title: 'Smart Notes', description: 'Auto-generated notes from lectures and textbooks.' },
    { icon: Zap, title: 'Quiz & Practice', description: 'Unlimited practice tests with instant feedback.' },
    { icon: BarChart3, title: 'Progress Analytics', description: 'Track your learning with detailed analytics.' }
  ];

  const testimonials = [
    { name: 'Priya Sharma', role: 'JEE Student', text: 'EduAI Hub helped me score 98 percentile!' },
    { name: 'Rohan Gupta', role: 'GATE Aspirant', text: 'The AI tutor is like having a personal coach.' },
    { name: 'Ananya Singh', role: 'College Student', text: 'Best platform for exam preparation!' }
  ];

  const pricing = [
    { plan: 'Free', price: '₹0', features: ['AI Chat (100 Q/day)', 'Quiz Access', 'Basic Notes'] },
    { plan: 'Pro', price: '₹299', features: ['Unlimited AI Chat', 'Premium Quizzes', 'Notes + PYQ', 'Ad-Free'], popular: true },
    { plan: 'Premium', price: '₹999', features: ['Everything in Pro', 'Live Sessions', 'Mentorship', '1-on-1 Support'] }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-3xl opacity-50"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-6xl md:text-7xl font-extrabold mb-6"
          >
            Learn Smarter with{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              EduAI Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            AI-powered learning platform with personalized tutoring, smart notes, and unlimited practice tests
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link to="/signup" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg flex items-center gap-2 transition">
              Get Started <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="border border-cyan-500 hover:bg-cyan-500/10 px-8 py-4 rounded-xl font-semibold text-lg transition">
              Sign In
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Why EduAI Hub?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-8 rounded-2xl hover:border-cyan-500/50 transition group"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-4 group-hover:scale-110 transition" />
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">What Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 backdrop-blur border border-cyan-500/20 p-8 rounded-2xl"
              >
                <p className="text-lg mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-cyan-400">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16">Simple Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricing.map((tier, i) => (
              <motion.div
                key={i}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl transition ${
                  tier.popular
                    ? 'bg-gradient-to-b from-cyan-600 to-blue-600 border-2 border-cyan-400 scale-105'
                    : 'bg-slate-800/50 border border-cyan-500/20'
                }`}
              >
                {tier.popular && <p className="text-sm font-bold text-cyan-200 mb-2">MOST POPULAR</p>}
                <h3 className="text-2xl font-bold mb-2">{tier.plan}</h3>
                <p className="text-4xl font-bold mb-6">{tier.price}<span className="text-lg text-gray-400">/month</span></p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <span className="text-cyan-400">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  tier.popular
                    ? 'bg-white text-cyan-600 hover:bg-gray-100'
                    : 'bg-cyan-500 hover:bg-cyan-600 text-white'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning?</h2>
        <Link to="/signup" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 px-8 py-4 rounded-xl font-semibold text-lg transition">
          Start Learning Today
        </Link>
      </section>

      <Footer />
    </div>
  );
}

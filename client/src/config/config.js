// Frontend configuration and constants
export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  appName: 'EduAI Hub',
  version: '1.0.0',
  
  // Feature flags
  features: {
    aiChat: true,
    notes: true,
    quizzes: true,
    studyPlanner: true,
    premiumSubscription: true,
    socialSharing: false,
  },

  // API Endpoints
  endpoints: {
    // Auth
    signup: '/auth/signup',
    login: '/auth/login',
    verify: '/auth/verify',

    // Chat
    chatHistory: '/chat/history',
    chatNew: '/chat/new',
    chatMessage: '/chat/message',
    chatDelete: (chatId) => `/chat/${chatId}`,

    // Notes
    notesAll: '/notes',
    notesById: (id) => `/notes/${id}`,
    notesCreate: '/notes',
    notesBookmark: (id) => `/notes/${id}/bookmark`,
    notesBookmarks: '/notes/user/bookmarks',

    // Quiz
    quizzesAll: '/quiz',
    quizzesById: (id) => `/quiz/${id}`,
    quizzesAnswer: (id) => `/quiz/${id}/answer`,
    quizzesResults: '/quiz/user/results',
    quizzesLeaderboard: '/quiz/leaderboard',

    // User
    userProfile: '/user/profile',
    userStats: '/user/stats',
    userBadges: '/user/badges',
    userStreak: '/user/streak',

    // Admin
    adminDashboard: '/admin/dashboard',
    adminUsers: '/admin/users',
    adminQuizzes: '/admin/quizzes',
    adminAnalytics: '/admin/analytics',

    // Subscriptions
    subscriptionCurrent: '/subscriptions/current',
    subscriptionCheckout: '/subscriptions/checkout',
    subscriptionCancel: '/subscriptions/cancel',
  },

  // Pagination
  pagination: {
    defaultLimit: 10,
    maxLimit: 100,
  },

  // Timeouts (ms)
  timeouts: {
    request: 30000,
    upload: 60000,
  },

  // Colors
  colors: {
    primary: '#06B6D4', // cyan-500
    secondary: '#3B82F6', // blue-500
    success: '#10B981', // green-500
    danger: '#EF4444', // red-500
    warning: '#F59E0B', // amber-500
    dark: '#1E293B', // slate-800
  },

  // Validation
  validation: {
    passwordMinLength: 8,
    usernameMinLength: 3,
    bioMaxLength: 500,
    titleMaxLength: 255,
  },

  // Quiz settings
  quiz: {
    defaultTimeLimit: 3600, // 1 hour in seconds
    passingScore: 60, // percentage
  },

  // Storage keys
  storage: {
    token: 'eduai_token',
    user: 'eduai_user',
    theme: 'eduai_theme',
    preferences: 'eduai_preferences',
  },

  // Error messages
  errors: {
    invalidEmail: 'Please enter a valid email address',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordMismatch: 'Passwords do not match',
    required: 'This field is required',
    unauthorized: 'Please login to continue',
    notFound: 'Resource not found',
    serverError: 'Something went wrong. Please try again.',
  },

  // Success messages
  success: {
    loggedIn: 'Logged in successfully!',
    signedUp: 'Account created successfully!',
    profileUpdated: 'Profile updated successfully!',
    noteBookmarked: 'Note bookmarked!',
    chatCreated: 'New chat started!',
  },
};

// API client configuration
export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
  timeout: config.timeouts.request,
};

export default config;

import axios from 'axios';
import config from '../config/config';

// Create axios instance
const api = axios.create({
  baseURL: config.apiUrl,
  timeout: config.timeouts.request,
  headers: config.apiConfig.headers,
});

// Add token to requests
api.interceptors.request.use(
  (requestConfig) => {
    const token = localStorage.getItem(config.storage.token);
    if (token) {
      requestConfig.headers.Authorization = `Bearer ${token}`;
    }
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem(config.storage.token);
      localStorage.removeItem(config.storage.user);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (email, password, fullName) =>
    api.post(config.endpoints.signup, { email, password, fullName }),
  login: (email, password) =>
    api.post(config.endpoints.login, { email, password }),
  verify: () => api.post(config.endpoints.verify),
};

// Chat API
export const chatAPI = {
  getHistory: () => api.get(config.endpoints.chatHistory),
  createNew: (title) => api.post(config.endpoints.chatNew, { title }),
  sendMessage: (chatId, message) =>
    api.post(config.endpoints.chatMessage, { chatId, message }),
  getMessages: (chatId) => api.get(`/chat/${chatId}`),
  deleteChat: (chatId) => api.delete(config.endpoints.chatDelete(chatId)),
};

// Notes API
export const notesAPI = {
  getAll: (filters = {}) =>
    api.get(config.endpoints.notesAll, { params: filters }),
  getById: (id) => api.get(config.endpoints.notesById(id)),
  create: (noteData) =>
    api.post(config.endpoints.notesCreate, noteData),
  bookmark: (id) =>
    api.post(config.endpoints.notesBookmark(id)),
  getBookmarks: () => api.get(config.endpoints.notesBookmarks),
};

// Quiz API
export const quizAPI = {
  getAll: (filters = {}) =>
    api.get(config.endpoints.quizzesAll, { params: filters }),
  getById: (id) => api.get(config.endpoints.quizzesById(id)),
  submitAnswer: (quizId, questionId, selectedAnswer) =>
    api.post(config.endpoints.quizzesAnswer(quizId), {
      questionId,
      selectedAnswer,
    }),
  getResults: () => api.get(config.endpoints.quizzesResults),
  getLeaderboard: () => api.get(config.endpoints.quizzesLeaderboard),
};

// User API
export const userAPI = {
  getProfile: () => api.get(config.endpoints.userProfile),
  updateProfile: (profileData) =>
    api.put(config.endpoints.userProfile, profileData),
  getStats: () => api.get(config.endpoints.userStats),
  getBadges: () => api.get(config.endpoints.userBadges),
  getStreak: () => api.get(config.endpoints.userStreak),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get(config.endpoints.adminDashboard),
  getUsers: () => api.get(config.endpoints.adminUsers),
  getQuizzes: () => api.get(config.endpoints.adminQuizzes),
  getAnalytics: () => api.get(config.endpoints.adminAnalytics),
};

// Generic error handler
export const handleAPIError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data?.error || 'An error occurred';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred';
  }
};

export default api;

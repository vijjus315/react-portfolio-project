import axios from 'axios'

/**
 * API service using Axios
 * Provides centralized configuration and common HTTP methods
 */

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://18.188.69.99:4235/api/v1",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for adding auth tokens, etc.
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * Generic API methods
 */
export const apiService = {
  // GET request
  get: (url, config = {}) => api.get(url, config),
  
  // POST request
  post: (url, data, config = {}) => api.post(url, data, config),
  
  // PUT request
  put: (url, data, config = {}) => api.put(url, data, config),
  
  // PATCH request
  patch: (url, data, config = {}) => api.patch(url, data, config),
  
  // DELETE request
  delete: (url, config = {}) => api.delete(url, config),
}

/**
 * Specific API endpoints
 * Example endpoints using JSONPlaceholder API
 */
export const postsAPI = {
  // Get all posts
  getAll: () => apiService.get('/posts'),
  
  // Get single post by ID
  getById: (id) => apiService.get(`/posts/${id}`),
  
  // Create new post
  create: (postData) => apiService.post('/posts', postData),
  
  // Update post
  update: (id, postData) => apiService.put(`/posts/${id}`, postData),
  
  // Delete post
  delete: (id) => apiService.delete(`/posts/${id}`),
}

export const usersAPI = {
  // Get all users
  getAll: () => apiService.get('/users'),
  
  // Get single user by ID
  getById: (id) => apiService.get(`/users/${id}`),
  
  // Get user's posts
  getPosts: (userId) => apiService.get(`/users/${userId}/posts`),
}

export const commentsAPI = {
  // Get all comments
  getAll: () => apiService.get('/comments'),
  
  // Get comments for a specific post
  getByPostId: (postId) => apiService.get(`/posts/${postId}/comments`),
  
  // Create new comment
  create: (commentData) => apiService.post('/comments', commentData),
}

export default api

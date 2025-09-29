

// Import the axios HTTP client library
import axios from "axios";

// Set the base URL for API requests.
// It first tries to use the environment variable VITE_API_BASE_URL,
// and falls back to the hardcoded URL if not provided.
const baseURL =
    import.meta.env.VITE_API_BASE_URL ||
    "https://www.portacourts.com:4235/api/v1";

// Create an Axios instance with custom configuration
export const apiClient = axios.create({
    // Base URL for all requests made with this client
    baseURL,

    // Whether to send cookies with cross-site requests (set to false here)
    withCredentials: false,

    // Default headers sent with every request
    headers: {
        Accept: "application/json", // Client expects JSON responses
        "Content-Type": "application/json", // Sending data in JSON format
    },
});

// Add a request interceptor to include auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle errors in a consistent way
apiClient.interceptors.response.use(
    // On successful response, just return the response
    (response) => response,

    // On error response, normalize the error object
    (error) => {
        // If the server responded with a status code
        if (error.response) {
            // Handle 401 unauthorized - clear auth data and redirect to login
            // But only if we have a valid token (don't clear for dummy tokens)
            if (error.response.status === 401) {
                const currentToken = localStorage.getItem('auth_token');
                // Only clear if token exists and is not a dummy token
                if (currentToken && !currentToken.startsWith('dummy_token_')) {
                    console.log('🔍 401 Error - Clearing localStorage for invalid token:', currentToken);
                    localStorage.removeItem('auth_token');
                    localStorage.removeItem('user_data');
                } else {
                    console.log('🔍 401 Error - Keeping dummy token, not clearing localStorage');
                }
                // Optionally redirect to login page
                // window.location.href = '/login';
            }
            
            // Reject with a simplified error object containing status and data
            return Promise.reject({
                status: error.response.status, // e.g., 400, 401, 500
                data: error.response.data, // error message or payload from the server
            });
        }

        // If there's no response (e.g., network error), provide a generic error
        return Promise.reject({
            status: 0, // Custom status for network issues
            data: { message: "Network error" }, // Custom message
        });
    }
);

// Export the configured Axios client for use throughout the app
export default apiClient;

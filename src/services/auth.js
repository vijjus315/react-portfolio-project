import apiClient from "./client.js";

export const login = (payload) => {
    return apiClient.post("/auth/login", payload).then((r) => r.data);
};

export const signup = (payload) => {
    return apiClient.post("/auth/sign-up", payload).then((r) => r.data);
};

export const verifyOtp = (payload) => {
    return apiClient.post("/auth/verify-otp", payload).then((r) => r.data);
};

export const resendOtp = (payload) => {
    return apiClient.post("/auth/resend-otp", payload).then((r) => r.data);
};

export const forgotPassword = (payload) => {
    return apiClient.post("/auth/forgot-password", payload).then((r) => r.data);
};

export const resetPassword = (payload) => {
    return apiClient.post("/auth/reset-password", payload).then((r) => r.data);
};

export const changePassword = (payload) => {
    return apiClient.post("/auth/change-password", payload).then((r) => r.data);
};

export const updateProfile = (payload) => {
    return apiClient.post("/auth/update-profile", payload).then((r) => r.data);
};

export const logout = () => {
    return apiClient.post("/auth/logout").then((r) => r.data);
};

// Utility functions for authentication state management
export const getAuthToken = () => {
    return localStorage.getItem('auth_token');
};

export const getUserData = () => {
    const userData = localStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
};

export const isAuthenticated = () => {
    const token = getAuthToken();
    if (!token) {
        return false;
    }
    
    // Check if user data exists and OTP is verified
    const userData = getUserData();
    if (!userData || userData.is_otp_verified !== 1) {
        return false;
    }
    
    return true;
};

export const clearAuthData = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
};

export default { login, signup, verifyOtp, resendOtp, forgotPassword, resetPassword, changePassword, updateProfile, logout, getAuthToken, getUserData, isAuthenticated, clearAuthData };

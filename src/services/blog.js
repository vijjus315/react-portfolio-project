import axios from "axios";

/**
 * Get the blog API base URL from environment variable with fallback
 * @returns {string} The blog API base URL
 */
export const getBlogApiBaseUrl = () => {
  // Vite automatically exposes environment variables prefixed with VITE_
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  
  // Fallback to default URL if environment variable is not set
  const defaultUrl = "https://staging.portacourts.com/api/v1";
  
  const baseUrl = envUrl || defaultUrl;
  
  // Clean the URL to remove any trailing slashes to prevent double slashes
  const cleanUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  console.log("🔧 Blog API: Environment URL:", envUrl);
  console.log("🔧 Blog API: Clean URL:", cleanUrl);
  
  return cleanUrl;
};

/**
 * Get the complete blog detail API URL
 * @param {string} blogId - The blog ID
 * @returns {string} The complete blog detail API URL
 */
export const getBlogDetailApiUrl = (blogId) => {
  const baseUrl = getBlogApiBaseUrl();
  // Ensure base URL ends with slash for proper concatenation
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const apiUrl = `${cleanBaseUrl}blogs/${blogId}`;
  console.log("🔧 Blog Detail API URL:", apiUrl);
  return apiUrl;
};

// Create a separate axios instance specifically for blog API
const blogApiClient = axios.create({
  baseURL: getBlogApiBaseUrl(),
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

/**
 * Fetch all blogs from the API
 * @returns {Promise<Object>} API response with blogs data
 */
export const getBlogs = async () => {
  try {
    console.log("📝 API: Fetching blogs via https://staging.portacourts.com/api/v1/blogs");
    const response = await blogApiClient.get("/blogs");
    console.log("📝 API: Blogs fetched successfully");
    return response.data;
  } catch (error) {
    console.error("❌ API: Error fetching blogs:", error);
    throw error;
  }
};

/**
 * Transform API blog data to match UI structure
 * @param {Object} apiBlog - Blog data from API
 * @returns {Object} Transformed blog data
 */
export const transformBlogData = (apiBlog) => {
  // Format date from API format to display format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Extract description from HTML content (first 150 characters)
  const extractDescription = (htmlContent) => {
    // Remove HTML tags and get first 150 characters
    const textContent = htmlContent.replace(/<[^>]*>/g, '');
    return textContent.length > 150 ? textContent.substring(0, 150) + '...' : textContent;
  };

  return {
    id: apiBlog.id,
    title: apiBlog.title,
    date: formatDate(apiBlog.created_at),
    author: apiBlog.user?.name || 'Unknown Author',
    role: 'Blog Author', // Default role since API doesn't provide this
    image: apiBlog.image_url,
    description: extractDescription(apiBlog.description),
    content: apiBlog.description, // Full HTML content for detail view
    sections: [
      {
        id: 'content',
        heading: 'Content',
        content: apiBlog.description
      }
    ]
  };
};

/**
 * Sort blogs to prioritize specific IDs at the top
 * @param {Array} blogs - Array of transformed blog data
 * @returns {Array} Sorted array with prioritized blogs at the top
 */
export const sortBlogsByPriority = (blogs) => {
  // Define the priority order for specific blog IDs
  const priorityIds = [8, 14, 15]; // First three blogs in this order: ID 8, 14, 15
  
  // Separate priority blogs from others
  const priorityBlogs = [];
  const otherBlogs = [];
  
  blogs.forEach(blog => {
    if (priorityIds.includes(blog.id)) {
      priorityBlogs.push(blog);
    } else {
      otherBlogs.push(blog);
    }
  });
  
  // Sort priority blogs by the specified order
  const sortedPriorityBlogs = priorityBlogs.sort((a, b) => {
    return priorityIds.indexOf(a.id) - priorityIds.indexOf(b.id);
  });
  
  // Sort other blogs by creation date (newest first)
  const sortedOtherBlogs = otherBlogs.sort((a, b) => {
    return new Date(b.created_at || b.date) - new Date(a.created_at || a.date);
  });
  
  // Return priority blogs first, then others
  return [...sortedPriorityBlogs, ...sortedOtherBlogs];
};

export default { getBlogs, transformBlogData, sortBlogsByPriority };

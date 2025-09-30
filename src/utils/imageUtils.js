// Helper function to construct image URLs
export const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    
    // If it's already a complete URL, return as is
    if (imageUrl.startsWith('http')) return imageUrl;
    
    // If it starts with 'images/', add the storage base URL
    if (imageUrl.startsWith('images/')) {
        return `https://www.portacourts.com/storage/${imageUrl}`;
    }
    
    // For any other relative path, add the storage base URL
    return `https://www.portacourts.com/storage/${imageUrl}`;
};

// Test function to verify getImageUrl works correctly
export const testGetImageUrl = () => {
    const testUrls = [
        'images/ZZFA0LxRbGtSVsLxyeiGzhyvUqCVZlMEBKwhli4W.jpg',
        'https://www.portacourts.com/storage/images/ZZFA0LxRbGtSVsLxyeiGzhyvUqCVZlMEBKwhli4W.jpg',
        'ZZFA0LxRbGtSVsLxyeiGzhyvUqCVZlMEBKwhli4W.jpg'
    ];
    
    testUrls.forEach(url => {
        console.log(`🖼️ Testing URL: ${url} -> ${getImageUrl(url)}`);
    });
};

// Helper function to get video URL
export const getVideoUrl = (videoUrl) => {
    if (!videoUrl) return '';
    if (videoUrl.startsWith('http')) return videoUrl;
    return `https://www.portacourts.com/storage/${videoUrl}`;
};

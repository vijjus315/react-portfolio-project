// Helper function to construct image URLs
export const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;
    return `https://www.portacourts.com/storage/${imageUrl}`;
};

// Helper function to get video URL
export const getVideoUrl = (videoUrl) => {
    if (!videoUrl) return '';
    if (videoUrl.startsWith('http')) return videoUrl;
    return `https://www.portacourts.com/storage/${videoUrl}`;
};

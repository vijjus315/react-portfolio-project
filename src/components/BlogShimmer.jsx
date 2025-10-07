import React from 'react';

const BlogShimmer = () => {
    return (
        <>
            {/* Header Section Shimmer */}
            <div className="text-center">
                <div className="shimmer-placeholder shimmer-blog-title mb-1"></div>
                <div className="shimmer-placeholder shimmer-blog-subtitle mb-5"></div>
            </div>

            {/* Top 3 Blogs - 3 Column Layout Shimmer */}
            <div className="row mb-5" style={{ marginBottom: "4rem" }}>
                {Array.from({ length: 3 }, (_, index) => (
                    <div className="col-md-6 col-lg-4 mb-4 mb-lg-0" key={index}>
                        <div className="blog-grid d-block">
                            <div>
                                {/* Blog Image Shimmer */}
                                <div className="shimmer-placeholder shimmer-blog-image mb-3"></div>
                            </div>
                            <div className="text-carousel">
                                {/* Post Meta Shimmer */}
                                <div className="post-meta pb-3">
                                    <div className="shimmer-placeholder shimmer-meta-text"></div>
                                </div>
                                
                                {/* Blog Title Shimmer */}
                                <div className="shimmer-placeholder shimmer-blog-grid-title pb-3 mb-0"></div>
                                
                                {/* Blog Description Shimmer */}
                                <div className="four-line mb-4 padding-blog">
                                    <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-description-line mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-description-line" style={{ width: '70%' }}></div>
                                </div>
                                
                                {/* Author Section Shimmer */}
                                <div className="post-author d-flex align-items-center gap-2">
                                    <div className="author-pic">
                                        <div className="shimmer-placeholder shimmer-author-avatar"></div>
                                    </div>
                                    <div className="text">
                                        <div className="shimmer-placeholder shimmer-author-name pb-0 lh-sm mb-0"></div>
                                        <div className="shimmer-placeholder shimmer-author-role mb-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Remaining Blogs - 2 Column Layout Shimmer */}
            <div className="row" style={{ marginTop: "2rem" }}>
                {Array.from({ length: 4 }, (_, index) => (
                    <div className="col-lg-6 mb-4" key={index}>
                        <div className="sports">
                            <div className="mb-4">
                                <div className="d-md-flex gap-3 align-items-center">
                                    {/* Blog List Image Shimmer */}
                                    <div className="listimage-blog">
                                        <div className="shimmer-placeholder shimmer-list-blog-image"></div>
                                    </div>

                                    <div className="text-carousel mt-3 mt-md-0">
                                        {/* Post Meta Shimmer */}
                                        <div className="post-meta pb-2">
                                            <div className="shimmer-placeholder shimmer-meta-text"></div>
                                        </div>
                                        
                                        {/* Blog Title Shimmer */}
                                        <div className="shimmer-placeholder shimmer-list-blog-title pb-3 mb-0"></div>
                                        
                                        {/* Author Section Shimmer */}
                                        <div className="post-author d-flex align-items-center gap-2 mt-2">
                                            <div className="author-pic">
                                                <div className="shimmer-placeholder shimmer-author-avatar"></div>
                                            </div>
                                            <div className="text">
                                                <div className="shimmer-placeholder shimmer-author-name pb-0 lh-sm mb-0"></div>
                                                <div className="shimmer-placeholder shimmer-author-role mb-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default BlogShimmer;

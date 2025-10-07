import React from 'react';

const BlogDetailShimmer = () => {
    return (
        <section className="blog-detail-wrapper py-5">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* Blog Title Shimmer */}
                        <div className="shimmer-placeholder shimmer-blog-detail-title mb-2"></div>
                        
                        {/* Author Section Shimmer */}
                        <div className="author-section mb-3 d-flex justify-content-between align-items-center">
                            <div className="author-info d-flex align-items-center">
                                <div className="position-relative me-3">
                                    <div className="shimmer-placeholder shimmer-author-detail-avatar"></div>
                                </div>
                                <div>
                                    <div className="shimmer-placeholder shimmer-author-name-detail mb-1"></div>
                                    <div className="shimmer-placeholder shimmer-date-detail"></div>
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className="shares-reads me-4 text-end">
                                    <div className="shimmer-placeholder shimmer-comments-count mb-1"></div>
                                    <div className="shimmer-placeholder shimmer-comments-label"></div>
                                </div>
                            </div>
                        </div>

                        {/* Blog Banner Image Shimmer */}
                        <div className="blog-detailbanner mb-3">
                            <div className="shimmer-placeholder shimmer-blog-detail-banner"></div>
                        </div>

                        {/* Blog Content Shimmer */}
                        <div className="blog-content">
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph mb-3"></div>
                            <div className="shimmer-placeholder shimmer-content-paragraph" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Comments Section Shimmer */}
                <div className="row mt-4">
                    <div className="col-12 col-lg-9 mb-3">
                        {/* Comments Header Shimmer */}
                        <div className="row align-items-center">
                            <div className="col-6">
                                <div className="shimmer-placeholder shimmer-border-line mb-2"></div>
                                <div className="shimmer-placeholder shimmer-comments-header"></div>
                            </div>
                            <div className="col-6 text-end">
                                <div className="sort-drop text-end gap-2">
                                    <div className="shimmer-placeholder shimmer-sort-label mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-dropdown"></div>
                                </div>
                            </div>
                        </div>

                        {/* Comments List Shimmer */}
                        <ul className="list-unstyled mt-3">
                            {Array.from({ length: 3 }, (_, index) => (
                                <li key={index} className="mb-2 p-2 border rounded">
                                    <div className="shimmer-placeholder shimmer-comment-text mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-comment-date"></div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Leave Comment Form Shimmer */}
                    <div className="col-lg-3">
                        <div className="leavecomment bg-white p-4">
                            <div className="shimmer-placeholder shimmer-form-title mb-3"></div>
                            <form>
                                <div className="form-group mb-4">
                                    <div className="shimmer-placeholder shimmer-form-label pb-2 mb-2"></div>
                                    <div className="shimmer-placeholder shimmer-textarea"></div>
                                </div>
                                <div className="pt-4 pb-3">
                                    <div className="shimmer-placeholder shimmer-submit-btn"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetailShimmer;

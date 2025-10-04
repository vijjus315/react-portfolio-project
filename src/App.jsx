/**
 * Main application entry point for PortaCourts
 * This file manages routing and application state across all pages
 * Following the same structure as the reference project
 */

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Import CSS files
import "./styles/website.css";
import "./styles/index.css";

// Import all page components
import Home from "./pages/Home.jsx";
import Products from "./pages/product.jsx";
import ProductDetail from "./pages/productDetail.jsx";
import AboutUs from "./pages/About.jsx";
import ContactUs from "./pages/contactUs.jsx";
import Blog from "./pages/blog.jsx";
import BlogDetail from "./pages/blogDetail.jsx";
import Cart from "./pages/cart.jsx";
import Wishlist from "./pages/wishlist.jsx";
import MyOrders from "./pages/myOrders.jsx";
import Address from "./pages/address.jsx";
import TrackOrder from "./pages/trackOrder.jsx";

// Import modals and components
import LoginModal from "./components/login.jsx";
import SignupModal from "./components/signup.jsx";
import VerifyEmailModal from "./components/verifyEmail.jsx";
import ChangePasswordModal from "./components/changePassword.jsx";
import EditProfileModal from "./components/editProfile.jsx";
import Header from "./layouts/Navbar.jsx";
import Footer from "./layouts/Footer.jsx";

// Import layouts
import MainLayout from "./layouts/MainLayout.jsx";
import PageLayout from "./layouts/PageLayout.jsx";

// Import utilities
import Loader from "./components/loader.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Bootstrap CSS is loaded via CDN in index.html

function App() {
  // Removed loading state to eliminate top-left corner loader
  // const [loading, setLoading] = useState(false);
  
  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  return (
    <ErrorBoundary>
      <Router>
          <ScrollToTop>
            <Routes>
              {/* Main Home Page */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
              </Route>

              {/* Product Pages */}
              <Route
                path="/products"
                element={
                  <PageLayout title="">
                    <Products />
                  </PageLayout>
                }
              />
              <Route
                path="/product-detail/:slug"
                element={
                  <PageLayout title="">
                    <ProductDetail />
                  </PageLayout>
                }
              />

              {/* Company Pages */}
              <Route
                path="/about-us"
                element={
                  <PageLayout title="">
                    <AboutUs />
                  </PageLayout>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <PageLayout title="">
                    <ContactUs />
                  </PageLayout>
                }
              />

              {/* Blog Pages */}
              <Route
                path="/blog"
                element={
                  <PageLayout title="">
                    <Blog />
                  </PageLayout>
                }
              />
              <Route
                path="/blogs/:id"
                element={
                  <PageLayout title="">
                    <BlogDetail />
                  </PageLayout>
                }
              />
              <Route
                path="/blog-detail/:id"
                element={
                  <PageLayout title="">
                    <BlogDetail />
                  </PageLayout>
                }
              />

              {/* User Account Pages */}
              <Route
                path="/cart"
                element={
                  <PageLayout title="">
                    <Cart />
                  </PageLayout>
                }
              />
              <Route
                path="/wishlist"
                element={
                  <PageLayout title="">
                    <Wishlist />
                  </PageLayout>
                }
              />
              <Route
                path="/wish-list"
                element={
                  <PageLayout title="Wishlist">
                    <Wishlist />
                  </PageLayout>
                }
              />
              <Route
                path="/myorders"
                element={
                  <PageLayout title="">
                    <MyOrders />
                  </PageLayout>
                }
              />
              <Route
                path="/my-address"
                element={
                  <PageLayout title="">
                    <Address />
                  </PageLayout>
                }
              />
              <Route
                path="/track-orders"
                element={
                  <PageLayout title="">
                    <TrackOrder />
                  </PageLayout>
                }
              />
            </Routes>
          </ScrollToTop>
        </Router>
    </ErrorBoundary>
  );
}

export default App;
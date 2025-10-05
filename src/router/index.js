/**
 * Router configuration
 * Centralized routing setup for the application
 */

import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { NotFound } from '../pages/NotFound'
import BlogDetail from '../pages/blogDetail'
import Blog from '../pages/blog'
import OrderDetail from '../pages/orderDetail'

/**
 * Application routes configuration
 * Defines all routes and their corresponding components
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <NotFound />
  },
  {
    path: '/about',
    element: <About />,
    errorElement: <NotFound />
  },
  {
    path: '/blog',
    element: <Blog />,
    errorElement: <NotFound />
  },
  {
    path: '/blogs/:id',
    element: <BlogDetail />,
    errorElement: <NotFound />
  },
  {
    path: '/blog-detail/:id',
    element: <BlogDetail />,
    errorElement: <NotFound />
  },
  {
    path: '/order-detail/:id',
    element: <OrderDetail />,
    errorElement: <NotFound />
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default router

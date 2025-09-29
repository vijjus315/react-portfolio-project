/**
 * Router configuration
 * Centralized routing setup for the application
 */

import { createBrowserRouter } from 'react-router-dom'
import { Home } from '../pages/Home'
import { About } from '../pages/About'
import { NotFound } from '../pages/NotFound'

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
    path: '*',
    element: <NotFound />
  }
])

export default router

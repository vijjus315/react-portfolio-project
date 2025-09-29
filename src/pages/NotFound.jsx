import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

/**
 * NotFound page component
 * Displays when a route is not found (404 page)
 */
export function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <Button variant="primary" className="mr-4">
              Go Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="secondary">
              Learn More
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  )
}

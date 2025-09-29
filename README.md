# React Vite App

A modern React application built with Vite, featuring a well-organized folder structure, Tailwind CSS, React Router, and custom hooks.

## 🚀 Features

- ⚡ **Vite** - Fast build tool and development server
- ⚛️ **React 18** - Latest React with modern hooks
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 🛣️ **React Router** - Client-side routing
- 🔧 **Custom Hooks** - Reusable logic with useFetch
- 🌐 **Axios** - HTTP client for API calls
- 📁 **Organized Structure** - Clean folder organization
- 🎯 **TypeScript Ready** - Easy to migrate to TypeScript

## 📁 Project Structure

```
src/
├── assets/          # Images, fonts, static files
├── components/      # Reusable UI components
│   └── Button.jsx   # Sample button component
├── pages/           # Page-level components
│   ├── Home.jsx     # Home page
│   ├── About.jsx    # About page
│   └── NotFound.jsx # 404 page
├── layouts/         # Layout components
│   ├── Navbar.jsx   # Navigation bar
│   └── Footer.jsx   # Footer component
├── hooks/           # Custom React hooks
│   └── useFetch.js  # Data fetching hook
├── context/         # React context providers
│   └── ThemeContext.jsx # Theme management
├── services/        # API calls using Axios
│   └── api.js       # API service configuration
├── utils/           # Helper functions
│   ├── formatters.js # Data formatting utilities
│   └── validators.js # Data validation utilities
├── styles/          # Global CSS and Tailwind configs
│   └── index.css    # Global styles
├── router/          # React Router setup
│   └── index.js     # Route configuration
├── App.jsx          # Main app component
└── main.jsx         # Application entry point
```

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🎯 Usage

### Custom Hooks

#### useFetch Hook
```jsx
import { useFetch } from './hooks/useFetch'

function MyComponent() {
  const { data, loading, error, refetch } = useFetch('https://api.example.com/data')
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  
  return <div>{data && JSON.stringify(data)}</div>
}
```

### API Service

#### Using the API service
```jsx
import { postsAPI } from './services/api'

// Get all posts
const posts = await postsAPI.getAll()

// Get single post
const post = await postsAPI.getById(1)

// Create new post
const newPost = await postsAPI.create({
  title: 'New Post',
  body: 'Post content'
})
```

### Button Component

#### Using the Button component
```jsx
import { Button } from './components/Button'

function MyComponent() {
  return (
    <div>
      <Button variant="primary" onClick={() => console.log('clicked')}>
        Primary Button
      </Button>
      <Button variant="secondary" size="lg">
        Large Secondary Button
      </Button>
    </div>
  )
}
```

### Theme Context

#### Using the theme context
```jsx
import { useTheme } from './context/ThemeContext'

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme()
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  )
}
```

## 🎨 Styling

This project uses Tailwind CSS for styling. You can:

- Use utility classes directly in components
- Add custom styles in `src/styles/index.css`
- Extend the Tailwind config in `tailwind.config.js`

### Custom CSS Classes

The project includes some custom utility classes:

```css
.btn-primary    /* Primary button styling */
.btn-secondary  /* Secondary button styling */
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=https://your-api-url.com
```

### Vite Configuration

The Vite configuration is in `vite.config.js`. You can modify:

- Server port (default: 3000)
- Build options
- Plugin configurations

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you have any questions or need help, please:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information

---

**Happy coding! 🎉**

# Frontend Documentation

## 🏗️ Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── admin/        # Admin-specific components
│   │   │   └── AdminLayout.jsx
│   │   ├── sections/     # Homepage sections
│   │   │   ├── Hero.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Skills.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Experience.jsx
│   │   │   └── Contact.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Loading.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/          # React Context
│   │   └── AuthContext.jsx
│   ├── pages/            # Page components
│   │   ├── admin/       # Admin pages
│   │   │   ├── AdminLogin.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Messages.jsx
│   │   └── Home.jsx
│   ├── services/         # API services
│   │   ├── api.js
│   │   └── index.js
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── .env                  # Environment variables
├── index.html            # HTML template
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎨 Design System

### Colors

- **Primary**: Blue shades (#0ea5e9)
- **Dark**: Dark gray shades for backgrounds
- **Accent**: Gradient combinations

### Typography

- **Font Family**: Inter (body), Outfit (headings)
- **Font Weights**: 300-900

### Components

All components use Tailwind CSS utility classes with custom components defined in `index.css`:

- `.glass-card` - Glassmorphism effect
- `.gradient-text` - Gradient text effect
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input-field` - Input field style
- `.skill-tag` - Skill tag style

## 📡 API Integration

### Base URL

Set in `.env`:
```
VITE_API_URL=http://localhost:8080/api
```

### Services

All API calls are organized in `src/services/index.js`:

- **authService**: Authentication (login, logout)
- **portfolioService**: Public portfolio data
- **contactService**: Contact form submission
- **adminService**: Admin CRUD operations

### Authentication

JWT tokens are stored in `localStorage` and automatically attached to requests via Axios interceptors.

## 🔐 Authentication Flow

1. User logs in via `/admin/login`
2. JWT token is received and stored
3. Token is attached to all subsequent requests
4. Protected routes check for valid token
5. On 401 error, user is redirected to login

## 📱 Responsive Design

All components are fully responsive:

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## ✨ Animations

Using Framer Motion for:

- Page transitions
- Scroll-triggered animations
- Hover effects
- Modal animations

## 🧪 Component Examples

### Creating a New Section

```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const NewSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="new-section" className="section-container" ref={ref}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="section-title"
      >
        Section Title
      </motion.h2>
      {/* Content */}
    </section>
  );
};
```

### Creating a New Admin Page

```jsx
import AdminLayout from '../../components/admin/AdminLayout';

const NewAdminPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white">Page Title</h2>
        {/* Content */}
      </div>
    </AdminLayout>
  );
};
```

## 🔧 Customization

### Update Personal Information

1. **Hero Section**: Edit `src/components/sections/Hero.jsx`
2. **About Section**: Edit `src/components/sections/About.jsx`
3. **Contact Info**: Edit `src/components/sections/Contact.jsx`
4. **Footer**: Edit `src/components/Footer.jsx`

### Update Meta Tags

Edit `index.html` to update SEO meta tags, title, and social sharing information.

### Update Colors

Edit `tailwind.config.js` to customize the color palette.

## 📦 Dependencies

### Core
- React 18
- React Router v6
- Vite

### UI/UX
- Tailwind CSS
- Framer Motion
- Lucide React (icons)

### Forms & Validation
- React Hook Form

### HTTP & State
- Axios

### Notifications
- React Hot Toast

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Set environment variables
4. Deploy

## 📝 Environment Variables

```env
VITE_API_URL=http://localhost:8080/api
```

For production, update this to your deployed backend URL.

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

1. Check `.env` file
2. Verify backend is running
3. Check CORS configuration on backend

### Styling Issues

```bash
# Rebuild Tailwind
npm run dev
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [React Router](https://reactrouter.com)

# CineNow - Frontend

A modern, responsive cinema management frontend built with React, Vite, and Tailwind CSS. This application provides an intuitive interface for both customers and administrators to manage cinema operations.

## 🎯 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **User Authentication**: Secure login and registration system
- **Movie Browsing**: Interactive movie catalog with detailed information
- **User Dashboard**: Personal booking history and profile management
- **Admin Panel**: Complete administrative control with statistics
- **Mobile Responsive**: Optimized for all device sizes

## 🏗️ Project Structure

```
Frontend/
├── node_modules/           # Dependencies
├── public/                 # Static assets
├── src/                    # Source code
│   ├── assets/             # Images, icons, and static files
│   ├── Auth/               # Authentication components
│   ├── Components/         # Reusable UI components
│   ├── Constants/          # Application constants
│   ├── Helpers/            # Utility functions and API calls
│   ├── Landing/            # Landing page components
│   ├── Store/              # State management (Zustand)
│   ├── User/               # User-specific components
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles and Tailwind imports
│   └── main.jsx            # Application entry point
├── .env                    # Environment variables
├── .env.template           # Environment template
├── .gitignore              # Git ignore rules
├── eslint.config.js        # ESLint configuration
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── package-lock.json       # Lock file
├── README.md               # Project documentation
└── vite.config.js          # Vite configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running on port 3000

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Andrewsy1004/CineNow.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.template .env
   ```
   Configure your environment variables in `.env`:
   ```env
   VITE_API_KEY_TMDB        = ""
   VITE_API_BASE_URL        = 'http://localhost:3000/api/v1'
   VITE_API_URL_CLOUD_IMAGE = ""
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Technologies Used

- **React 18** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management solution
- **React Router** - Client-side routing
- **Axios** - HTTP client for API requests
- **React PDF** - PDF generation library
- **Lucide React** - Beautiful icon library
- **Chart.js** - Data visualization library
and proper HTML structure

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


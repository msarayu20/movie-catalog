# Movie Explorer - Routing Guide

## 🎯 Application Structure

The application now has **3 main pages** with React Router:

### 1. **Home Page** (`/`)
- **Purpose**: Browse movies organized by genre
- **Features**:
  - Movies grouped by genre categories
  - Horizontal scrolling for each genre section
  - Scroll buttons appear on hover
  - Click any movie to view details
  - Add/remove favorites with heart icon

### 2. **All Movies Page** (`/all-movies`)
- **Purpose**: Complete movie catalog with advanced filtering
- **Features**:
  - Full filter controls (genre, sort, view mode)
  - Grid or List view options
  - Infinite scroll or pagination modes
  - Share URL functionality
  - Search integration (from header)

### 3. **Favorites Page** (`/favorites`)
- **Purpose**: View your saved favorite movies
- **Features**:
  - Display all favorited movies
  - Grid or List view toggle
  - Empty state with call-to-action
  - Remove favorites by clicking heart icon
  - Persisted in localStorage

## 🧭 Navigation

### Header Navigation
The header includes navigation links to all pages:
- **Home** 🏠 - Browse by genre
- **All Movies** 📋 - Complete catalog
- **Favorites** ❤️ - Your saved movies

Active page is highlighted with gradient background.

### Search Bar
- Located in the header (right corner on desktop)
- Available on All Movies page
- Smart suggestions with movie posters
- Keyboard shortcuts: Press `/` to focus

## 🎨 Design Features

### Horizontal Scrolling (Home Page)
- Smooth scroll behavior
- Navigation arrows on hover
- Touch/swipe support on mobile
- Hidden scrollbar for clean look

### Consistent Styling
- Dark theme: `#0f1014` background
- Card background: `#1a1d29`
- Blue accent: `#3b82f6`
- Responsive design for all screen sizes

## 📱 Responsive Behavior

### Desktop
- Full navigation with text labels
- Search bar in header
- Multi-column grid layouts

### Mobile
- Icon-only navigation
- Stacked layout
- Touch-optimized scrolling
- Collapsible search

## 🔧 Technical Details

### Routing
- Uses `react-router-dom` v6
- Browser history mode
- Smooth page transitions

### State Management
- Favorites stored in localStorage
- Persists across sessions
- Synced across all pages

### Performance
- Lazy loading for images
- Optimized scroll performance
- Memoized computations
- Efficient re-renders

// React Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Components
import Homepage from './components/Homepage';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy loaded components
const UserList = lazy(() => import('./components/UserList'));
const PostList = lazy(() => import('./components/PostList'));

// Global Styles
import './styles/App.css';
import './styles/components.css';
import './styles/utilities.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <Suspense fallback={<LoadingSpinner size="lg" message="Sayfa yükleniyor..." className="loading-spinner-fullpage" />}>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/posts" element={<PostList />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
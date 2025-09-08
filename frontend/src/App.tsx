import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import UserList from './components/UserList';
import PostList from './components/PostList';
import './styles/App.css';
import './styles/design-system.css';
import './styles/components.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/posts" element={<PostList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
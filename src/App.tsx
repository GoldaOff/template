import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { CallbackPage } from './pages/CallbackPage';

/**
 * Основной компонент приложения с маршрутизацией
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Link to="/" className="logo">
            last.fm
          </Link>
          <nav className="header-nav">
            <a href="#" className="nav-link">Live</a>
            <a href="#" className="nav-link">Music</a>
            <a href="#" className="nav-link">Charts</a>
            <a href="#" className="nav-link">Events</a>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
              <span role="img" aria-label="user">👤</span>
            </div>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/callback" element={<CallbackPage />} />
          </Routes>
        </main>
        <footer className="footer">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <div style={{ fontWeight: 700, color: '#d51007', fontSize: 18 }}>last.fm</div>
            <div style={{ fontSize: 14, color: '#888' }}>© 2025 Last.fm Clone. </div>
            <div style={{ fontSize: 13, color: '#aaa', marginTop: 2 }}>Дипломная работа.</div>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;

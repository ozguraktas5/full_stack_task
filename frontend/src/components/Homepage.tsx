import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage: React.FC = () => {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-links">
          <Link to="/users" className="homepage-link">
            <div className="link-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Kullanıcılar</h2>
              <p>Kullanıcı listesini görüntüle, ekle, düzenle ve sil</p>
            </div>
          </Link>
          
          <Link to="/posts" className="homepage-link">
            <div className="link-card">
              <div className="card-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>Postlar</h2>
              <p>Post listesini görüntüle, ekle, düzenle ve sil</p>
            </div>
          </Link>
        </div>
        
        <div className="homepage-features">
          <h3>Özellikler</h3>
          <div className="features-grid">
            <div className="feature-item">CRUD işlemleri (Create, Read, Update, Delete)</div>
            <div className="feature-item">Kullanıcı ve Post arası ilişki</div>
            <div className="feature-item">Modern ve kullanıcı dostu arayüz</div>
            <div className="feature-item">TypeScript ile tip güvenliği</div>
            <div className="feature-item">JSONPlaceholder API entegrasyonu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

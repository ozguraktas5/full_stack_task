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
              <h2>👥 Kullanıcılar</h2>
              <p>Kullanıcı listesini görüntüle, ekle, düzenle ve sil</p>
            </div>
          </Link>
          
          <Link to="/posts" className="homepage-link">
            <div className="link-card">
              <h2>📝 Postlar</h2>
              <p>Post listesini görüntüle, ekle, düzenle ve sil</p>
            </div>
          </Link>
        </div>
        
        <div className="homepage-features">
          <h3>Özellikler</h3>
          <ul>
            <li>CRUD işlemleri (Create, Read, Update, Delete)</li>
            <li>Kullanıcı ve Post arası ilişki</li>
            <li>Modern ve kullanıcı dostu arayüz</li>
            <li>TypeScript ile tip güvenliği</li>
            <li>JSONPlaceholder API entegrasyonu</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

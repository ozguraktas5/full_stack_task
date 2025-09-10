import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation: React.FC = () => {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const path = location.pathname;
    const segments = path.split('/').filter(Boolean);

    const breadcrumbs = [
      { label: 'Ana Sayfa', path: '/', isActive: path === '/' }
    ];

    if (segments.length > 0) {
      const currentPage = segments[0];
      const pageLabels: { [key: string]: string } = {
        'users': 'Kullanıcılar',
        'posts': 'Postlar'
      };

      breadcrumbs.push({
        label: pageLabels[currentPage] || currentPage,
        path: `/${currentPage}`,
        isActive: path === `/${currentPage}`
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <nav className="navigation" aria-label="Breadcrumb">
      <div className="breadcrumb">
        {breadcrumbs.map((crumb, index) => (
          <React.Fragment key={crumb.path}>
            {index > 0 && (
              <span className="breadcrumb-separator" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M9 18L15 12L9 6" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            )}
            {crumb.isActive ? (
              <span className="breadcrumb-current" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link to={crumb.path} className="breadcrumb-link">
                {crumb.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;

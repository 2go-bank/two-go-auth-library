import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UserProfileWidget from './UserProfileWidget';
import { isAuthenticated } from '@/utils/auth';

const Header = () => {
  const isUserAuthenticated = isAuthenticated();
  const headerBgColor = import.meta.env.VITE_HEADER_BG_COLOR || '#000000';
  const headerTextColor = import.meta.env.VITE_HEADER_TEXT_COLOR || '#EFB207';
  const headerLinkColor = import.meta.env.VITE_HEADER_LINK_COLOR || '#EFB207';
  const [logoUrl, setLogoUrl] = useState((window as any).env?.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL);

  useEffect(() => {
    const handleEnvUpdate = () => {
      setLogoUrl((window as any).env?.VITE_LOGO_URL || import.meta.env.VITE_LOGO_URL);
    };

    window.addEventListener('env-updated', handleEnvUpdate);
    return () => window.removeEventListener('env-updated', handleEnvUpdate);
  }, []);

  return (
    <header 
      style={{ backgroundColor: headerBgColor }} 
      className="w-full py-4 px-6 sticky top-0 z-50 shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/app" className="flex items-center">
          <img 
            src={logoUrl}
            alt="2GO Bank Logo" 
            className="h-[40%] md:h-[40%]" // Alterado para 40% do tamanho atual
          />
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:block">
            <ul className="flex space-x-6" style={{ color: headerTextColor }}>
              {isUserAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/app" 
                      style={{ color: headerLinkColor }}
                      className="hover:opacity-80 transition-colors"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/app/stats" 
                      style={{ color: headerLinkColor }}
                      className="hover:opacity-80 transition-colors"
                    >
                      Stats
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/app/plans" 
                      style={{ color: headerLinkColor }}
                      className="hover:opacity-80 transition-colors"
                    >
                      Planos
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link 
                    to="/login" 
                    style={{ color: headerLinkColor }}
                    className="hover:opacity-80 transition-colors"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          {isUserAuthenticated && <UserProfileWidget />}
        </div>
      </div>
    </header>
  );
};

export default Header;
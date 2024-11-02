import { Link } from 'react-router-dom';
import UserProfileWidget from './UserProfileWidget';
import { isAuthenticated } from '@/utils/auth';

const Header = () => {
  const isUserAuthenticated = isAuthenticated();
  const headerBgColor = import.meta.env.VITE_HEADER_BG_COLOR || '#000000';
  const headerLinkColor = import.meta.env.VITE_HEADER_LINK_COLOR || '#EFB207';

  return (
    <header style={{ backgroundColor: headerBgColor }} className="w-full py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/app" className="flex items-center">
          <img 
            src={import.meta.env.VITE_LOGO_URL}
            alt="2GO Bank Logo" 
            className="h-8 md:h-10"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
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
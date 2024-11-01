import { Link } from 'react-router-dom';
import UserProfileWidget from './UserProfileWidget';
import { isAuthenticated } from '@/utils/auth';

const Header = () => {
  const isUserAuthenticated = isAuthenticated();

  return (
    <header className="bg-black w-full py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="flex items-center">
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
                    <Link to="/home" className="text-[#EFB207] hover:text-[#EFB207]/80 transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/stats" className="text-[#EFB207] hover:text-[#EFB207]/80 transition-colors">
                      Stats
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="/login" className="text-[#EFB207] hover:text-[#EFB207]/80 transition-colors">
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
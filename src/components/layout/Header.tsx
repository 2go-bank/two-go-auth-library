import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import UserProfileWidget from './UserProfileWidget';
import { isAuthenticated } from '@/utils/auth';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const getEnvVar = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.env?.[key] || import.meta.env[key];
  }
  return process.env[key];
};

const Header = () => {
  const isUserAuthenticated = isAuthenticated();
  const headerBgColor = getEnvVar('VITE_HEADER_BG_COLOR') || '#000000';
  const headerTextColor = getEnvVar('VITE_HEADER_TEXT_COLOR') || '#EFB207';
  const headerLinkColor = getEnvVar('VITE_HEADER_LINK_COLOR') || '#EFB207';
  const [logoUrl, setLogoUrl] = useState(getEnvVar('VITE_LOGO_URL'));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleEnvUpdate = () => {
      setLogoUrl(getEnvVar('VITE_LOGO_URL'));
    };

    window.addEventListener('env-updated', handleEnvUpdate);
    return () => window.removeEventListener('env-updated', handleEnvUpdate);
  }, []);

  const NavigationLinks = () => (
    <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6" style={{ color: headerTextColor }}>
      {isUserAuthenticated ? (
        <>
          <li>
            <Link 
              to="/app" 
              style={{ color: headerLinkColor }}
              className="hover:opacity-80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/app/stats" 
              style={{ color: headerLinkColor }}
              className="hover:opacity-80 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Stats
            </Link>
          </li>
          <li>
            <Link 
              to="/app/plans" 
              style={{ color: headerLinkColor }}
              className="hover:opacity-80 transition-colors"
              onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        </li>
      )}
    </ul>
  );

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
            className="h-6"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:block">
            <NavigationLinks />
          </nav>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden" aria-label="Menu">
              {isOpen ? (
                <X className="h-6 w-6" style={{ color: headerLinkColor }} />
              ) : (
                <Menu className="h-6 w-6" style={{ color: headerLinkColor }} />
              )}
            </SheetTrigger>
            <SheetContent side="right" className="w-[80vw] pt-12" style={{ backgroundColor: headerBgColor }}>
              <nav className="flex flex-col space-y-4">
                <NavigationLinks />
              </nav>
            </SheetContent>
          </Sheet>

          {isUserAuthenticated && <UserProfileWidget />}
        </div>
      </div>
    </header>
  );
};

export default Header;
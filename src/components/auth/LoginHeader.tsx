import React from 'react';

interface LoginHeaderProps {
  logoUrl: string;
}

const LoginHeader: React.FC<LoginHeaderProps> = ({ logoUrl }) => {
  return (
    <div className="flex justify-center mb-8">
      <img 
        src={logoUrl}
        alt="2GO Bank Logo" 
        className="h-12"
      />
    </div>
  );
};

export default LoginHeader;
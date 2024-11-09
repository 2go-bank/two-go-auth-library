import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter: React.FC = () => {
  return (
    <div className="text-center mt-4 flex justify-between items-center">
      <Link to="/forgot-password" className="text-[#EFB207] hover:underline">
        Recuperar senha
      </Link>
      <Link to="/register" className="text-[#EFB207] hover:underline">
        Cadastre-se
      </Link>
    </div>
  );
};

export default LoginFooter;
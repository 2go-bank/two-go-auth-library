import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}

const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);

  useEffect(() => {
    const lastFailedAttempt = localStorage.getItem('lastFailedLoginAttempt');
    const failedAttempts = Number(localStorage.getItem('failedLoginAttempts') || '0');
    
    if (lastFailedAttempt && failedAttempts > 0) {
      const lastAttemptTime = new Date(lastFailedAttempt).getTime();
      const oneHourAgo = new Date().getTime() - (60 * 60 * 1000);
      
      if (lastAttemptTime > oneHourAgo && failedAttempts >= 1) {
        setShowCaptcha(true);
      } else if (lastAttemptTime < oneHourAgo) {
        // Reset if more than 1 hour has passed
        localStorage.removeItem('failedLoginAttempts');
        localStorage.removeItem('lastFailedLoginAttempt');
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showCaptcha && !captchaValue) {
      return;
    }

    try {
      await onSubmit(username, password);
      // Reset failed attempts on successful login
      localStorage.removeItem('failedLoginAttempts');
      localStorage.removeItem('lastFailedLoginAttempt');
    } catch (error) {
      // Increment failed attempts
      const currentAttempts = Number(localStorage.getItem('failedLoginAttempts') || '0');
      localStorage.setItem('failedLoginAttempts', String(currentAttempts + 1));
      localStorage.setItem('lastFailedLoginAttempt', new Date().toISOString());
      
      if (currentAttempts >= 0) {
        setShowCaptcha(true);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username" className="text-[#EFB207]">Usuário</Label>
        <Input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
          disabled={isLoading}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#EFB207]">Senha</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400 pr-10"
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {showCaptcha && (
        <div className="flex justify-center my-4">
          <ReCAPTCHA
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || ''}
            onChange={(value: string | null) => setCaptchaValue(value)}
          />
        </div>
      )}

      <Button 
        type="submit" 
        className="w-full bg-[#EFB207] hover:bg-[#EFB207]/90"
        disabled={isLoading || (showCaptcha && !captchaValue)}
      >
        {isLoading ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
};

export default LoginForm;
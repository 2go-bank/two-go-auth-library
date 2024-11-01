interface PasswordStrengthIndicatorProps {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: PasswordStrengthIndicatorProps) => {
  const requirements = [
    { label: 'Mínimo 8 caracteres', met: password.length >= 8 },
    { label: 'Letra maiúscula', met: /[A-Z]/.test(password) },
    { label: 'Letra minúscula', met: /[a-z]/.test(password) },
    { label: 'Número', met: /[0-9]/.test(password) },
    { label: 'Símbolo (!@#$)', met: /[!@#$]/.test(password) },
  ];

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className={`w-2 h-2 rounded-full ${req.met ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className={req.met ? 'text-green-500' : 'text-red-500'}>{req.label}</span>
        </div>
      ))}
    </div>
  );
};

export default PasswordStrengthIndicator;
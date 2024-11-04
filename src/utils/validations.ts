export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  
  if (cleanCPF.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  if (firstDigit !== parseInt(cleanCPF.charAt(9))) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  return secondDigit === parseInt(cleanCPF.charAt(10));
};

export const validateBirthDate = (date: string): boolean => {
  const birthDate = new Date(date);
  const minDate = new Date('1930-01-01');
  const today = new Date();
  return birthDate >= minDate && birthDate <= today;
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return /^[1-9]{2}[9]\d{8}$/.test(cleanPhone);
};

export const formatCPF = (value: string, currentValue: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length > 11) return currentValue;
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
};

export const formatPhone = (value: string, currentValue: string): string => {
  const numbers = value.replace(/\D/g, '');
  if (numbers.length > 11) return currentValue;
  if (numbers.length <= 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  }
  return value;
};
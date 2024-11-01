export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatCrypto = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 6,
    maximumFractionDigits: 6,
  }).format(value);
};
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const parseCurrencyInput = (value: string): number => {
  const numericValue = value.replace(/[R$\s.]/g, '').replace(',', '.');
  return parseFloat(numericValue) || 0;
};
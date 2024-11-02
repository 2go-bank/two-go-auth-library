import { ColorGroup } from '@/types/colors';

const COLOR_STORAGE_KEY = '2go-color-config';

export const getDefaultColors = (): ColorGroup[] => [
  {
    title: "Cores Gerais",
    colors: [
      { key: 'VITE_BODY_BG_COLOR', label: 'Cor de Fundo', value: import.meta.env.VITE_BODY_BG_COLOR || '#FFFFFF' },
      { key: 'VITE_BODY_TEXT_COLOR', label: 'Cor do Texto', value: import.meta.env.VITE_BODY_TEXT_COLOR || '#000000' },
      { key: 'VITE_BODY_LINK_COLOR', label: 'Cor dos Links', value: import.meta.env.VITE_BODY_LINK_COLOR || '#EFB207' },
    ]
  },
  {
    title: "Cores dos Títulos",
    colors: [
      { key: 'VITE_BODY_H1_COLOR', label: 'Cor H1', value: import.meta.env.VITE_BODY_H1_COLOR || '#111111' },
      { key: 'VITE_BODY_H2_COLOR', label: 'Cor H2', value: import.meta.env.VITE_BODY_H2_COLOR || '#222222' },
      { key: 'VITE_BODY_H3_COLOR', label: 'Cor H3', value: import.meta.env.VITE_BODY_H3_COLOR || '#222222' },
      { key: 'VITE_BODY_H4_COLOR', label: 'Cor H4', value: import.meta.env.VITE_BODY_H4_COLOR || '#333333' },
      { key: 'VITE_BODY_H5_COLOR', label: 'Cor H5', value: import.meta.env.VITE_BODY_H5_COLOR || '#333333' },
      { key: 'VITE_BODY_H6_COLOR', label: 'Cor H6', value: import.meta.env.VITE_BODY_H6_COLOR || '#444444' },
    ]
  },
  {
    title: "Cores do Cabeçalho",
    colors: [
      { key: 'VITE_HEADER_BG_COLOR', label: 'Cor de Fundo', value: import.meta.env.VITE_HEADER_BG_COLOR || '#000000' },
      { key: 'VITE_HEADER_TEXT_COLOR', label: 'Cor do Texto', value: import.meta.env.VITE_HEADER_TEXT_COLOR || '#EFB207' },
      { key: 'VITE_HEADER_LINK_COLOR', label: 'Cor dos Links', value: import.meta.env.VITE_HEADER_LINK_COLOR || '#EFB207' },
    ]
  },
  {
    title: "Cores do Rodapé",
    colors: [
      { key: 'VITE_FOOTER_BG_COLOR', label: 'Cor de Fundo', value: import.meta.env.VITE_FOOTER_BG_COLOR || '#000000' },
      { key: 'VITE_FOOTER_TEXT_COLOR', label: 'Cor do Texto', value: import.meta.env.VITE_FOOTER_TEXT_COLOR || '#EFB207' },
      { key: 'VITE_FOOTER_LINK_COLOR', label: 'Cor dos Links', value: import.meta.env.VITE_FOOTER_LINK_COLOR || '#EFB207' },
    ]
  },
  {
    title: "Outras Cores",
    colors: [
      { key: 'VITE_AVATAR_BORDER_COLOR', label: 'Cor da Borda do Avatar', value: import.meta.env.VITE_AVATAR_BORDER_COLOR || '#EFB207' },
    ]
  }
];

export const loadStoredColors = (): ColorGroup[] => {
  const stored = localStorage.getItem(COLOR_STORAGE_KEY);
  return stored ? JSON.parse(stored) : getDefaultColors();
};

export const saveColors = (colors: ColorGroup[]) => {
  localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(colors));
};

export const applyColors = (colors: ColorGroup[]) => {
  const root = document.documentElement;
  colors.forEach(group => {
    group.colors.forEach(color => {
      const cssVar = `--${color.key}`;
      root.style.setProperty(cssVar, color.value);
    });
  });
};
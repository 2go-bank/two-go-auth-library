import { ColorGroup, EnvGroup } from '@/types/colors';

const ENV_STORAGE_KEY = '2go-env-config';
const COLOR_STORAGE_KEY = '2go-color-config';

const getStoredValue = (key: string, defaultValue: any) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : defaultValue;
};

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

export const getDefaultEnvConfigs = (): EnvGroup[] => [
  {
    title: "URLs e Endpoints",
    configs: [
      { 
        key: 'VITE_AUTH_API_URL', 
        label: 'URL da API de Autenticação', 
        value: import.meta.env.VITE_AUTH_API_URL || '', 
        type: 'url' 
      },
      { 
        key: 'VITE_API_BASE_URL', 
        label: 'URL Base da API', 
        value: import.meta.env.VITE_API_BASE_URL || '', 
        type: 'url' 
      },
      { 
        key: 'VITE_LOGO_URL', 
        label: 'URL do Logo', 
        value: import.meta.env.VITE_LOGO_URL || '', 
        type: 'url' 
      }
    ]
  },
  {
    title: "Configurações do Sistema",
    configs: [
      { 
        key: 'VITE_ENVIRONMENT', 
        label: 'Ambiente', 
        value: import.meta.env.VITE_ENVIRONMENT || 'production', 
        type: 'select',
        options: ['production', 'development']
      }
    ]
  }
];

export const loadStoredColors = (): ColorGroup[] => {
  return getStoredValue(COLOR_STORAGE_KEY, getDefaultColors());
};

export const loadStoredEnvConfigs = (): EnvGroup[] => {
  return getStoredValue(ENV_STORAGE_KEY, getDefaultEnvConfigs());
};

export const saveColors = (colors: ColorGroup[]) => {
  localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(colors));
};

export const saveEnvConfigs = (configs: EnvGroup[]) => {
  localStorage.setItem(ENV_STORAGE_KEY, JSON.stringify(configs));
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

export const applyEnvConfigs = (groups: EnvGroup[]) => {
  const root = document.documentElement;
  if (!(window as any).env) {
    (window as any).env = {};
  }
  
  // Primeiro carregamos as configurações armazenadas
  const storedConfigs = loadStoredEnvConfigs();
  
  // Aplicamos as configurações armazenadas ou as novas configurações
  const configsToApply = groups || storedConfigs;
  
  configsToApply.forEach(group => {
    group.configs.forEach(config => {
      const cssVar = `--${config.key}`;
      const value = config.value || import.meta.env[config.key];
      root.style.setProperty(cssVar, value);
      (window as any).env[config.key] = value;
    });
  });

  // Salvamos as novas configurações se fornecidas
  if (groups) {
    saveEnvConfigs(groups);
  }

  // Forçamos a atualização dos componentes
  window.dispatchEvent(new Event('env-updated'));
};

// Função para inicializar as configurações na carga da aplicação
export const initializeConfigs = () => {
  const storedColors = loadStoredColors();
  const storedEnvConfigs = loadStoredEnvConfigs();
  
  applyColors(storedColors);
  applyEnvConfigs(storedEnvConfigs);
};
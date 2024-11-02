import { ColorGroup, EnvGroup } from "@/types/colors";

export const generateEnvContent = (envGroups: EnvGroup[], colorGroups: ColorGroup[]) => {
  // Generate environment configs
  const envConfigs = envGroups
    .flatMap(group => 
      group.configs.map(config => `${config.key}=${config.value}`)
    );

  // Generate color configs
  const colorConfigs = colorGroups
    .flatMap(group => 
      group.colors.map(color => `${color.key}=${color.value}`)
    );

  // Add empty Firebase configs
  const firebaseConfigs = [
    'VITE_FIREBASE_API_KEY=',
    'VITE_FIREBASE_AUTH_DOMAIN=',
    'VITE_FIREBASE_PROJECT_ID=',
    'VITE_FIREBASE_STORAGE_BUCKET=',
    'VITE_FIREBASE_MESSAGING_SENDER_ID=',
    'VITE_FIREBASE_APP_ID=',
    'VITE_FIREBASE_VAPID_KEY='
  ];

  // Combine all configs and join with newlines
  return [...envConfigs, ...colorConfigs, ...firebaseConfigs].join('\n');
};

export const downloadEnvFile = (content: string) => {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', '.env');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
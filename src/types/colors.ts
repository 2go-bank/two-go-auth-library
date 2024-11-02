export interface ColorConfig {
  key: string;
  label: string;
  value: string;
}

export interface ColorGroup {
  title: string;
  colors: ColorConfig[];
}

export interface EnvConfig {
  key: string;
  label: string;
  value: string;
  type: 'color' | 'text' | 'url';
}

export interface EnvGroup {
  title: string;
  configs: EnvConfig[];
}
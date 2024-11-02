export interface ColorConfig {
  key: string;
  label: string;
  value: string;
}

export interface ColorGroup {
  title: string;
  colors: ColorConfig[];
}
export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}

export interface Plan {
  id: string;
  name: string;
  created: string;
  products: Array<{
    name: string;
    description: string;
    value: number;
  }>;
}
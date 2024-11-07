export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}

export interface Product {
  type: 'voucher';
  name: string;
  description: string;
  thumbnail: string | null;
  sku: string;
  value: number;
  quantity: number;
  coverage: string[];
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  products: Product[];
  status: 'active' | 'inactive';
  created: string;
}

export interface PlansResponse {
  list: Plan[];
}
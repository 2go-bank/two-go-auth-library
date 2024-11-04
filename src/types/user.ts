export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  avatar?: string;
}

export interface Product {
  type: string;
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
  status: string;
  created: string;
}

export interface PlansPagination {
  pageCount: number;
  itemCountPerPage: number;
  first: number;
  current: number;
  last: number;
  next: number;
  pagesInRange: Record<string, number>;
  firstPageInRange: number;
  lastPageInRange: number;
  currentItemCount: number;
  totalItemCount: number;
  firstItemNumber: number;
  lastItemNumber: number;
}

export interface PlansResponse {
  list: Plan[];
  pages: PlansPagination;
  aggs: any;
}
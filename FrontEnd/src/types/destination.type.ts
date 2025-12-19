// Destination interface matching backend
export interface Destination {
  id: string;
  name: string;
  slug: string;
  location: string;
  price: number;
  image?: string;
  categoryId?: string;
  bestSeller?: boolean;
  rating?: number;
  description?: string;
  address?: string;
  searchConfig?: {
    [key: string]: string | number | boolean;
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface GroupedDestinations {
  category: Category;
  destinations: Destination[];
}

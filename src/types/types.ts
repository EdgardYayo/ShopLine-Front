export interface UserInterface {
  image: string;
  id: string;
  name: string;
  password: string;
  email: string;
  dni: string;
  registered: boolean;
  phone: string;
  address: string;
  nationality: string;
  rol: string;
  permissions: string;
}

export interface Product {
  id?: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
  rating: number;
  stock: number;
}

export interface UserLists {
  id: number;
  name: string;
  userId: string;
  products: number;
}

interface ProductInList {
  id: number;
  title: string;
  image: string;
  price: number;
}

export interface ListDetail {
  id: number;
  name: string;
  userId: string;
  products: Array<ProductInList>;
}

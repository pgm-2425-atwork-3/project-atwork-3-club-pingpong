type Category = {
  id: number;
  name: string;
  image: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type listItem = {
  title: string;
  location?: string;
  time?: string;
  label: string;
  link?: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type Order = {
  user_id: number;
  dateCreated: string;
  paymentMethod: string;
};

export type OrderItem = {
  // id: number;
  order_id: {
    id: number;
  };
  drink_id: {
    id: number;
  };
  quantity: number;
};

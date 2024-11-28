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

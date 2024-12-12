type Category = {
    id: number;
    name: string;
    image: string;
};

export type Drink = {
    id?: number;
    documentId?: string;
    name: string;
    price: number;
    unit_price: string;
    images: string;
    drink_image: {
        url: string;
        alternativeText: string;
    };
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
    role: string;
    created_at: string;
    updated_at: string;
};

export type Team = {
    id: number;
    name: string;
    description: string;
    image: string;
};

export type Group = {
    id: number;
    name: string;
    description: string;
    image: string;
};

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type Order = {
  documentId: string;
  user_id: number;
  dateCreated: string;
  paymentMethod: string;
  total: number;
};

export type OrderItem = {
  // id: number;
  order: {
    documentId: string;
  };
  drink: {
    documentId: string;
  };
  quantity: number;
};

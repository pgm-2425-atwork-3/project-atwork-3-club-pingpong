type Category = {
    id: number;
    name: string;
    image: string;
};

export type Product = {
    id: number;
    title: string;
    price: number;
    unit_price: string;
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
    role: string;
    created_at: string;
    updated_at: string;
};

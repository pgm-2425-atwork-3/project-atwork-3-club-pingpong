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
    drink_image: string;
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
    user_group: string;
};

export type Team = {
    id: number;
    team_name: string;
    description: string;
    image: string;
};

export type Group = {
    id: number;
    name: string;
    description: string;
    image: string;
};

export type Event = {
    id: number;
    title: string;
    description: string;
    image: string;
    documentId: string;
    home_team: Team;
    opponent_team: Team;
};

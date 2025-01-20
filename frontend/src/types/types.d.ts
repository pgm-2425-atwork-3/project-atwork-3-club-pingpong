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
    documentId: string;
};

export type User = {
    id: number;
    username: string;
    email: string;
    password: string;
};

export type Order = {
    documentId: string;
    user_id: {
        documentId: string;
        username: string;
    };
    dateCreated: string;
    paymentMethod: string;
    total: number;
    order_items: OrderItem[];
    isCompleted: boolean;
};

export type OrderItem = {
    documentId: string;
    order: {
        documentId: string;
    };
    drink: {
        documentId: string;
        name: string;
    };
    quantity: number;
};

export type Event = {
    id: number;
    documentId: string;
    title: string;
    location: string;
    eventDate: string;
    description: string;
    user_group: {
        documentId: string;
        id: number;
        name: string;
    };
    event_signups: {
        documentId: string;
        user: {
            documentId: string;
            username: string;
            choice: string;
        };
    };
};

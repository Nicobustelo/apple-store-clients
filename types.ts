export interface Store {
    id: string,
    name: string,
    userId: string,
    subdomain: string,
    createdAt: string,
    updatedAt: string,
};

export interface Billboard {
    id: string,
    label: string,
    imageUrl: string,
};

export interface Category {
    id: string,
    name: string,
    billboard: Billboard,
};

export interface Product {
    id: string,
    category: Category,
    name: string,
    price: string,
    isFeatured: boolean,
    subcategoryValueIds: JSON,
    images: Image[]
};

export interface Image {
    id: string,
    url: string,
};

export interface Subcategory {
    id: string,
    name: string,
    values: Value[],
};

export interface Value {
    id: string,
    value: string,
};
import type { users, book } from "@prisma/client";
type Nullable<T> = T | null;

enum Role {
    user = "USER",
    admin = "ADMIN",
}
export interface ResponseType<T> {
    status: string;
    response: T[];
    _count?: {
        [key: string]: number;
    };
}
export interface Category {
    id: number;
    name: string;
    created_at: string;
    updated_at: string;
}
export interface Book {
    id: number;
    name: string;
    author: string;
    quantity: number;
    borrowCount: number;
    image: string;
    created_at: string;
    updated_at: string;
    _count?: {
        [key: string]: number;
    };
    Category: Category;
}
export interface Borrow {
    id: number;
    usersId: number | null | string;
    bookId: number | null | string;
    borrowDate: string;
    dueDate: string;
    returnDate: string | null;
    books: book;
    users: users;
}

export interface User {
    id: number;
    email: string;
    name: string;
    role: Role;
    borrowCount: number;
    created_at: Date;
    updated_at: Date;
}

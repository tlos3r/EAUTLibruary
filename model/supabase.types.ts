export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
    public: {
        Tables: {
            book: {
                Row: {
                    author: string;
                    borrowedCount: number;
                    categoryId: number | null;
                    created_at: string;
                    id: number;
                    image: string;
                    name: string;
                    quantity: number | null;
                    updated_at: string;
                };
                Insert: {
                    author: string;
                    borrowedCount?: number;
                    categoryId?: number | null;
                    created_at?: string;
                    id?: number;
                    image: string;
                    name: string;
                    quantity?: number | null;
                    updated_at?: string;
                };
                Update: {
                    author?: string;
                    borrowedCount?: number;
                    categoryId?: number | null;
                    created_at?: string;
                    id?: number;
                    image?: string;
                    name?: string;
                    quantity?: number | null;
                    updated_at?: string;
                };
                Relationships: [
                    {
                        foreignKeyName: "book_categoryId_fkey";
                        columns: ["categoryId"];
                        isOneToOne: false;
                        referencedRelation: "category";
                        referencedColumns: ["id"];
                    }
                ];
            };
            borrows: {
                Row: {
                    bookId: number | null;
                    borrowDate: string;
                    dueDate: string;
                    id: number;
                    returnDate: string | null;
                    usersId: number | null;
                };
                Insert: {
                    bookId?: number | null;
                    borrowDate: string;
                    dueDate: string;
                    id?: number;
                    returnDate?: string | null;
                    usersId?: number | null;
                };
                Update: {
                    bookId?: number | null;
                    borrowDate?: string;
                    dueDate?: string;
                    id?: number;
                    returnDate?: string | null;
                    usersId?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "borrows_bookId_fkey";
                        columns: ["bookId"];
                        isOneToOne: false;
                        referencedRelation: "book";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "borrows_usersId_fkey";
                        columns: ["usersId"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            category: {
                Row: {
                    created_at: string;
                    id: number;
                    name: string;
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    id?: number;
                    name: string;
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    id?: number;
                    name?: string;
                    updated_at?: string;
                };
                Relationships: [];
            };
            Comment: {
                Row: {
                    booksId: number | null;
                    context: string;
                    created_at: string;
                    id: number;
                    updated_at: string;
                    usersId: number | null;
                };
                Insert: {
                    booksId?: number | null;
                    context: string;
                    created_at?: string;
                    id?: number;
                    updated_at?: string;
                    usersId?: number | null;
                };
                Update: {
                    booksId?: number | null;
                    context?: string;
                    created_at?: string;
                    id?: number;
                    updated_at?: string;
                    usersId?: number | null;
                };
                Relationships: [
                    {
                        foreignKeyName: "Comment_booksId_fkey";
                        columns: ["booksId"];
                        isOneToOne: false;
                        referencedRelation: "book";
                        referencedColumns: ["id"];
                    },
                    {
                        foreignKeyName: "Comment_usersId_fkey";
                        columns: ["usersId"];
                        isOneToOne: false;
                        referencedRelation: "users";
                        referencedColumns: ["id"];
                    }
                ];
            };
            users: {
                Row: {
                    created_at: string;
                    email: string;
                    id: number;
                    name: string;
                    role: Database["public"]["Enums"]["Role"];
                    updated_at: string;
                };
                Insert: {
                    created_at?: string;
                    email: string;
                    id?: number;
                    name: string;
                    role?: Database["public"]["Enums"]["Role"];
                    updated_at?: string;
                };
                Update: {
                    created_at?: string;
                    email?: string;
                    id?: number;
                    name?: string;
                    role?: Database["public"]["Enums"]["Role"];
                    updated_at?: string;
                };
                Relationships: [];
            };
        };
        Views: {
            [_ in never]: never;
        };
        Functions: {
            [_ in never]: never;
        };
        Enums: {
            Role: "ADMIN" | "USER";
        };
        CompositeTypes: {
            [_ in never]: never;
        };
    };
};

export type Tables<
    PublicTableNameOrOptions extends
        | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
        | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
              Database[PublicTableNameOrOptions["schema"]]["Views"])
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
          Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
          Row: infer R;
      }
        ? R
        : never
    : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    ? (Database["public"]["Tables"] & Database["public"]["Views"])[PublicTableNameOrOptions] extends {
          Row: infer R;
      }
        ? R
        : never
    : never;

export type TablesInsert<
    PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Insert: infer I;
      }
        ? I
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Insert: infer I;
      }
        ? I
        : never
    : never;

export type TablesUpdate<
    PublicTableNameOrOptions extends keyof Database["public"]["Tables"] | { schema: keyof Database },
    TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
        : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
    ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
          Update: infer U;
      }
        ? U
        : never
    : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
          Update: infer U;
      }
        ? U
        : never
    : never;

export type Enums<
    PublicEnumNameOrOptions extends keyof Database["public"]["Enums"] | { schema: keyof Database },
    EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
        ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
        : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
    ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
    : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never;

import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "../ui/button";
import type { Book } from "~/model/type";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Book>[] = [
    {
        id: "select",
        header: ({ table }) =>
            h(Checkbox, {
                checked: table.getIsAllPageRowsSelected(),
                "onUpdate:checked": (value: boolean) => table.toggleAllPageRowsSelected(!!value),
                ariaLabel: "Select all",
            }),
        cell: ({ row }) =>
            h(Checkbox, {
                checked: row.getIsSelected(),
                "onUpdate:checked": (value: boolean) => row.toggleSelected(!!value),
                ariaLabel: "Select row",
            }),
        enableSorting: false,
        enableHiding: false,
    },

    {
        accessorKey: "name",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Tên sách"),
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, `${useTitleCase(row.getValue("name"))}`);
        },
    },
    {
        accessorKey: "author",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Tác giả"),
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, row.getValue("author"));
        },
    },
    {
        accessorKey: "quantity",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Số lượng"),
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, row.getValue("quantity"));
        },
    },

    {
        accessorKey: "image",
        header: () => h("div", { class: "fonts-bold text-xl " }, "Ảnh"),
        cell: ({ row }) => {
            const books = row.original;
            return h("img", { width: "100", height: "100", class: "flex justify-ends", src: `${books.image}` });
        },
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["Tạo ra vào ngày", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
            );
        },
        cell: ({ row }) => {
            return h(
                "div",
                { class: " font-medium" },
                new Date(row.getValue("created_at")).toLocaleDateString("vi-VI")
            );
        },
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["Cập nhật vào ngày", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
            );
        },
        cell: ({ row }) => {
            return h(
                "div",
                { class: " font-medium" },
                new Date(row.getValue("updated_at")).toLocaleDateString("vi-VI")
            );
        },
    },
    {
        id: "status",

        header: () => h("div", { class: "fonts-bold text-xl  " }, "Trạng thái"),
        cell: ({ row }) => {
            const book = row.original;

            return book.quantity === book._count?.Borrows
                ? h(Button, { variant: "outline", class: "border-red-500 text-red-500" }, "Hết sách")
                : h(Button, { variant: "outline", class: "border-green-500 text-green-500" }, "Còn sách");
        },
    },
];

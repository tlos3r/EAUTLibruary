import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import BookAction from "./dataTableDropdown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "../ui/button";
import type { Borrow } from "~/model/type";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Borrow>[] = [
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
        id: "member",
        accessorKey: "usersId",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Người mượn"),
        cell: ({ row }) => {
            const borrow = row.original;
            return h("div", { class: " font-medium" }, `${borrow.users.name} <${borrow.users.email}>`);
        },
    },
    {
        accessorKey: "bookId",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Sách"),
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, row.original.books.name);
        },
    },
    {
        accessorKey: "borrowDate",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["Ngày mượn", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
            );
        },
        cell: ({ row }) => {
            return h(
                "div",
                { class: " font-medium" },
                new Date(row.getValue("borrowDate")).toLocaleDateString("vi-VI")
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["Hạn trả", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
            );
        },
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, new Date(row.getValue("dueDate")).toLocaleDateString("vi-VI"));
        },
    },
    {
        accessorKey: "returnDate",
        header: () => h("div", { class: "fonts-bold text-xl  " }, "Ngày trả lại"),
        cell: ({ row }) => {
            const borrow = row.original;
            let status = "";
            if (borrow.returnDate === null) {
                status = "Chưa trả";
            } else {
                status = new Date(borrow.returnDate!).toLocaleDateString("vi-VI");
            }
            return h("div", { class: " font-medium" }, `${status}`);
        },
    },
    {
        id: "status",

        header: () => h("div", { class: "fonts-bold text-xl  " }, "Trạng thái"),
        cell: ({ row }) => {
            const borrow = row.original;

            if (borrow.returnDate === null) {
                return h(Button, { variant: "outline", class: "border-cyan-500 text-cyan-500" }, "Đang mượn");
            }
            return new Date(borrow.returnDate!).getTime() > new Date(borrow.dueDate).getTime()
                ? h(Button, { variant: "outline", class: "border-yellow-500 text-yellow-500" }, "Trả muộn")
                : h(Button, { variant: "outline", class: "border-green-500 text-green-500" }, "Đã trả");
        },
    },
];

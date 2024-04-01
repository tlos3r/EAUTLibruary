import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import DropdownAction from "./dataTableDropdown.vue";
import { ArrowUpDown, ChevronDown } from "lucide-vue-next";
import { Button } from "../ui/button";
import type { Category } from "~/model/type";
export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "id",
        header: ({ column }) => {
            return h(
                Button,
                {
                    variant: "ghost",
                    onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
                },
                () => ["Id", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
            );
        },
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, row.getValue("id"));
        },
    },
    {
        accessorKey: "name",
        header: () => h("div", { class: "fonts-bold text-xl " }, "Tên thể loại"),
        cell: ({ row }) => {
            return h("div", { class: " font-medium" }, row.getValue("name"));
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const categories = row.original;

            return h("div", { class: "relative" }, h(DropdownAction, { categories }));
        },
    },
];

<script setup lang="ts" generic="TData, TValue">
import type { ColumnDef, SortingState, ColumnFiltersState } from "@tanstack/vue-table";
import { useToast } from "@/components/ui/toast/use-toast";

import { valueUpdater } from "@/lib/utils";
import {
    FlexRender,
    getCoreRowModel,
    useVueTable,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/vue-table";

const props = defineProps<{
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}>();
const sorting = ref<SortingState>([]);
const columnFilters = ref<ColumnFiltersState>([]);

const table = useVueTable({
    get data() {
        return props.data;
    },
    get columns() {
        return props.columns;
    },
    getCoreRowModel: getCoreRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
    state: {
        get sorting() {
            return sorting.value;
        },
        get columnFilters() {
            return columnFilters.value;
        },
    },
});
const { toast } = useToast();

const deleteBook = async () => {
    const id = table.getSelectedRowModel().rows.map((row) => {
        return (row.original as any).id;
    });

    await $fetch("/api/book/remove", {
        method: "DELETE",
        body: {
            id,
        },
        onResponse({ request, response, options }) {
            if (response._data.status === "success") {
                toast({
                    title: `${response._data.status}`,
                    description: `Xóa sách thành công `,
                });
            }
        },
    });
    refreshNuxtData("booksDashboard");
};
</script>

<template>
    <div class="flex items-center py-4 space-x-4">
        <Button class="bg-blue-600 hover:bg-blue-500"
            ><NuxtLink to="/admin/dashboard/book/create" class="inline-flex items-center space-x-3">
                <Icon name="gridicons:add-outline" class="text-2xl" /> Thêm
            </NuxtLink></Button
        >

        <Button :disabled="table.getFilteredSelectedRowModel().rows.length == 0" variant="destructive"
            ><NuxtLink @click="deleteBook" class="inline-flex items-center space-x-3">
                <Icon name="mingcute:delete-line" class="text-2xl" /> Xóa
            </NuxtLink></Button
        >
    </div>
    <div class="border rounded-md">
        <Table>
            <TableHeader>
                <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                    <TableHead v-for="header in headerGroup.headers" :key="header.id">
                        <FlexRender
                            v-if="!header.isPlaceholder"
                            :render="header.column.columnDef.header"
                            :props="header.getContext()"
                        />
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <template v-if="table.getRowModel().rows?.length">
                    <TableRow
                        v-for="row in table.getRowModel().rows"
                        :key="row.id"
                        :data-state="row.getIsSelected() ? 'selected' : undefined"
                    >
                        <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                            <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                        </TableCell>
                    </TableRow>
                </template>
                <template v-else>
                    <TableRow>
                        <TableCell :colSpan="columns.length" class="h-24 text-center">
                            Không tìm thấy kết quả nào cả.
                        </TableCell>
                    </TableRow>
                </template>
            </TableBody>
        </Table>
        <div class="flex items-center justify-end py-4 space-x-2">
            <Button variant="outline" size="sm" :disabled="!table.getCanPreviousPage()" @click="table.previousPage()">
                Trước
            </Button>
            <Button variant="outline" size="sm" :disabled="!table.getCanNextPage()" @click="table.nextPage()">
                Tiếp
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { columns } from "@/components/bookTable/column";

import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { ref } from "vue";

import type { ResponseType, Book } from "~/model/type";

definePageMeta({
    layout: "user",
});
useHead({
    title: "Sách",
});
const filter = ref<{ name: string; date: Date[] }>({
    name: "",
    date: [],
});
const trigger = ref(0);
const nuxtApp = useNuxtApp();
const { data, pending, error, refresh } = await useLazyAsyncData<ResponseType<Book>>(
    "booksDashboardUser",
    (): Promise<ResponseType<Book>> =>
        $fetch("/api/book", {
            params: {
                name: filter.value.name,
                gte: filter.value.date[0],
                lte: filter.value.date[1],
            },
        }),
    {
        watch: [trigger],
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
    }
);
const handleForm = () => {
    trigger.value++;
};
</script>

<template>
    <div class="container py-10 mx-auto mt-10">
        <h1 class="mb-5 font-mono text-2xl font-bold tracking-wider text-blue-600">Tất cả loại sách</h1>
        <form @submit.prevent="handleForm" class="p-4 my-10 border border-slate-300 rounded-xl">
            <Form class="grid grid-cols-4 gap-6 py-4 md:grid-cols-8 lg:grid-cols-12">
                <div class="col-span-4 lg:col-span-6">
                    <div class="grid w-full items-center gap-1.5">
                        <Label for="bookName">Tên sách</Label>
                        <Input id="bookName" v-model="filter.name" type="text" placeholder="tên sách" />
                    </div>
                </div>
                <div class="col-span-4 lg:col-span-6">
                    <div class="grid w-full items-center gap-1.5">
                        <Label>Ngày tạo ra</Label>
                        <VueDatePicker v-model="filter.date" range />
                    </div>
                </div>
            </Form>
            <div class="flex justify-end">
                <Button class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
                    <Icon name="mingcute:search-2-line" class="text-2xl" />Tìm kiếm</Button
                >
            </div>
        </form>
        <Skeleton v-if="pending" class="w-full h-[400px] rounded-xl" />
        <BookTableDataTable v-else :columns="columns" :data="(data as any).response" />
    </div>
</template>

<style scoped></style>

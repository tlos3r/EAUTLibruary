<script lang="ts" setup>
import { columns } from "@/components/borrow/column";
import type { Borrow, ResponseType } from "~/model/type";

definePageMeta({
    layout: "admin",
});
const nuxtApp = useNuxtApp();

const { data, pending, refresh } = await useLazyAsyncData<ResponseType<Borrow>>(
    "borrowDashboard",
    () => $fetch("/api/borrow"),
    {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
    }
);
console.log(data.value);
</script>

<template>
    <div class="container py-10 mx-auto mt-10">
        <h1 class="mb-5 font-mono text-2xl font-bold tracking-wider text-blue-600">Danh sách mượn sách</h1>
        <Skeleton v-if="pending" class="w-full h-[400px] rounded-xl" />
        <BorrowDataTable v-else :columns="columns" :data="(data as any).response" />
    </div>
</template>

<style scoped></style>

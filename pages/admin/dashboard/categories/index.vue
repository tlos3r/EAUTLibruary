<script lang="ts" setup>
import { columns } from "@/components/categories/column";
import { useToast } from "@/components/ui/toast/use-toast";
import type { ResponseType, Category } from "~/model/type";
const { toast } = useToast();
const nuxtApp = useNuxtApp();
const { data, pending, error, refresh } = await useLazyAsyncData<ResponseType<Category>>(
    "categoryDashboard",
    () => $fetch("/api/categories"),
    {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
    }
);
definePageMeta({
    layout: "admin",
});
</script>

<template>
    <div class="container py-10 mx-auto mt-10">
        <h1 class="mb-5 font-mono text-2xl font-bold tracking-wider text-blue-600">Tất cả thể loại</h1>
        <Skeleton v-if="pending" class="w-full h-[400px] rounded-xl" />
        <CategoriesDataTable v-else :columns="columns" :data="(data as any).response" />
    </div>
</template>

<style scoped></style>

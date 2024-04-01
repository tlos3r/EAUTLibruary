<script lang="ts" setup>
import { columns } from "@/components/borrowTable/column";
import type { Borrow, ResponseType, User } from "~/model/type";

definePageMeta({
    layout: "user",
});
useHead({
    title: "Sách",
});

const nuxtApp = useNuxtApp();
const userCookie = useCookie<User>("user");
const { data, pending, refresh } = await useLazyAsyncData<ResponseType<Borrow>>(
    "borrowDashboardUser",

    () =>
        $fetch("/api/borrow", {
            params: {
                id: userCookie.value.id,
            },
        }),
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
        <BorrowTableDataTable v-else :columns="columns" :data="(data as any).response" />
    </div>
</template>

<style scoped></style>

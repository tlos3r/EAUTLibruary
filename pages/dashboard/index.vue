<script lang="ts" setup>
import type { User } from "~/model/type";

definePageMeta({
    layout: "user",
});
useHead({
    title: "Trang chủ",
});
const userCookie = useCookie<User>("user");
</script>

<template>
    <div>day la trang dashboard</div>
</template>

<style scoped></style>

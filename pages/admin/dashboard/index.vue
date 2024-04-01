<script lang="ts" setup>
definePageMeta({
    layout: "admin",
});
</script>

<template>
    <div class="px-6">
        <div class="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div class="col-span-4 lg:col-span-6">
                <DashboardBook />
            </div>
            <div class="col-span-4 lg:col-span-6">
                <DashboardUser />
            </div>
        </div>
    </div>
</template>

<style scoped></style>

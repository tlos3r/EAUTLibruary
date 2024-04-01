<script lang="ts" setup></script>

<template>
    <div>
        <Toaster />
        <Sidebar />
        <div class="mt-24 sm:mt-0 md:ml-72">
            <Navbar />
            <slot />
        </div>
    </div>
</template>

<style scoped></style>

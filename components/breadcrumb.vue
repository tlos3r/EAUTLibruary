<script lang="ts" setup>
const route = useRoute();
console.log(route);
</script>

<template>
    <!-- Component: Flat basic breadcrumb -->
    <nav aria-label="Breadcrumb">
        <ol class="flex items-stretch gap-2 list-none">
            <li class="items-center hidden gap-2 md:flex" v-for="(matched, index) in $route.matched" :key="index">
                <NuxtLink
                    :to="matched.path"
                    class="flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-slate-700 transition-colors hover:text-blue-500"
                    >{{ matched.name }}</NuxtLink
                >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="flex-none w-4 h-4 transition-transform stroke-slate-700 md:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="1.5"
                    aria-hidden="true"
                    aria-labelledby="title-01 description-01"
                    role="graphics-symbol"
                >
                    <title :id="`title-0${index}`">Arrow</title>
                    <desc :id="`description-0${index}`">
                        Arrow icon that points to the next page in big screen resolution sizes and previous page in
                        small screen resolution sizes.
                    </desc>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
            </li>
        </ol>
    </nav>
    <!-- End Flat basic breadcrumb -->
</template>

<style scoped></style>

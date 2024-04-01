<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import type { ResponseType, Book } from "~/model/type";

ChartJS.register(Title, Tooltip, Legend, ArcElement);
const nuxtApp = useNuxtApp();
// @ts-ignore
const { data, error, pending, refresh } = await useLazyAsyncData<ResponseType<Book>>(
    "dashboardBook",
    () => $fetch("/api/book"),
    {
        getCachedData(key) {
            return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
        },
        // @ts-ignore
        transform: (_data) => {
            const getTopFive = _data.response.sort((a, b) => b.borrowCount - a.borrowCount).slice(0, 5);
            console.log(getTopFive);
            return {
                labels: getTopFive.map((book) => book.name) || [],
                datasets: [
                    {
                        data: getTopFive.map((book) => book.borrowCount),
                        backgroundColor: ["#334b5c", "#007c90", "#00af99", "#46de73", "#deff21"],
                    },
                ],
            };
        },
    }
);
const chartData = toRaw(data.value);
const chartOptions = {
    responsive: true,
};
</script>

<template>
    <!-- @vue-ignore -->
    <h3 v-if="!pending" class="mx-5 text-2xl font-bold text-center text-blue-500">Quyển sách được mượn nhiều nhất</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import type { ResponseType, User } from "~/model/type";

ChartJS.register(Title, Tooltip, Legend, ArcElement);
const nuxtApp = useNuxtApp();
// @ts-ignore
const { data, error, pending, refresh } = await useLazyAsyncData<ResponseType<User>>(
    "dashboardUsers",
    () => $fetch("/api/auth"),
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
                        data: getTopFive.map((user) => user.borrowCount),
                        backgroundColor: ["#521b5c", "#a72b63", "#e85a54", "#ffa13a", "#ffef3d"],
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
    <h3 v-if="!pending" class="mx-5 text-2xl font-bold text-center text-blue-500">Người mượn nhiều nhất</h3>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>

<script lang="ts" setup>
import type { ResponseType, Book, User, Borrow } from "~/model/type";

import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";
import { useToast } from "@/components/ui/toast";
useHead({
    title: "Thêm người mượn sách mới",
});
definePageMeta({
    layout: "admin",
});
const loading = ref(false);
const borrow = ref({
    usersId: "",
    bookId: "",
    borrowDate: new Date(),
    dueDate: "",
    borrowCount: 0,
});
const nuxtApp = useNuxtApp();

const { data: users } = await useFetch<ResponseType<User>>("/api/auth", {
    headers: {
        Accept: "application/json",
    },
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});

const { data: books } = await useFetch<ResponseType<Book>>("/api/book", {
    headers: {
        Accept: "application/json",
    },
    getCachedData(key) {
        return nuxtApp.payload.data[key] || nuxtApp.static.data[key];
    },
});
const { toast } = useToast();
const newBorrow = async () => {
    await $fetch("/api/borrow/create", {
        method: "POST",
        body: {
            bookId: borrow.value.bookId,
            usersId: borrow.value.usersId,
            borrowDate: borrow.value.borrowDate,
            dueDate: borrow.value.dueDate,
        },
        onResponse({ request, response, options }) {
            if (response._data.status === "success") {
                toast({
                    title: response._data.status,
                    description: "Mượn sách thành công",
                });
                borrow.value.usersId = "";
                borrow.value.bookId = "";
                borrow.value.borrowDate = new Date();
                borrow.value.dueDate = "";
                borrow.value.borrowCount = 0;
            } else {
                toast({
                    variant: "destructive",
                    title: response._data.status,
                    description: h("pre", `${response._data}`),
                });
            }
        },
    });
};
</script>

<template>
    <div class="container h-screen mt-10">
        <h1 class="pt-10 text-3xl font-bold text-blue-500">Thêm người mượn sách</h1>
        <form @submit.prevent="newBorrow" class="container">
            <div class="grid items-center w-full gap-2 mt-5 mb-5">
                <Label>Tên sách</Label>
                <Select v-model="borrow.bookId">
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn sách cho mượn" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup v-for="book in (books as any).response" :key="book.id">
                            <SelectItem :disabled="book.quantity - book._count.Borrows === 0" :value="book.id">
                                {{ `${book.name} - số lượng còn lại : ${book.quantity - book._count.Borrows} ` }}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <!-- <div v-for="book in (books as any)" :key="book.response.id" v-show="borrow.bookId">
                <div v-if="borrow.bookId === book.response.id" class="grid items-center w-full gap-2 mb-5">
                    <Button variant="outline" class="text-green-500 border-green-500">Có sẵn</Button>
                    <Button variant="outline" class="text-red-500 border-red-500">Hết sách</Button>
                </div>
            </div> -->

            <div class="grid items-center w-full gap-2 mb-5">
                <Label>Tên người dùng</Label>
                <Select v-model="borrow.usersId">
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn người cho mượn" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup v-for="user in (users as any).response" :key="user.id">
                            <SelectItem :value="user.id"> {{ `${user.name} (${user.email})` }} </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div class="grid items-center w-full gap-2 mb-5">
                <Label>Ngày mượn</Label>
                <VueDatePicker v-model="borrow.borrowDate" />
            </div>
            <div class="grid items-center w-full gap-2 mb-5">
                <Label>Hạn trả</Label>
                <VueDatePicker v-model="borrow.dueDate" />
            </div>

            <Button :disabled="loading" class="mt-5 bg-blue-500">{{ loading ? "Xác nhận..." : "Xác nhận" }}</Button>
        </form>
    </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { useForm } from "vee-validate";

import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const props = defineProps({
    books: {
        type: Object,
    },
});
const client = useSupabaseClient();
const imageUrl = ref("");

const { handleSubmit, isSubmitting, resetForm } = useForm();
const uploadImg = async (file: File) => {
    const { data, error } = await client.storage
        .from("images")
        .upload(`${Date.now()}.${file.name.split(".").pop()}`, file);
    if (error) {
        toast({
            title: "Error",
            description: `${error.message}`,
            variant: "destructive",
        });
        return;
    } else {
        imageUrl.value = `https://bvcoqamkzpzepecborys.supabase.co/storage/v1/object/public/images/${data.path}`;
    }
};
const updateBook = handleSubmit(async (value) => {
    const { name, author, quantity, image } = value;
    if (typeof image !== "undefined") {
        await uploadImg(image);
    } else {
        imageUrl.value = props.books?.image;
    }
    await $fetch("/api/book/update", {
        method: "PATCH",
        body: {
            id: props.books?.id,
            name,
            author,
            quantity,
            image: imageUrl.value,
        },
        onResponse({ response }) {
            if (response._data.status === "success") {
                toast({
                    title: "success",
                    description: `Sửa sách ${response._data.response.name} thanh cong`,
                    duration: 300,
                });
                resetForm();
            } else {
                toast({
                    title: "Error",
                    description: `${response._data}`,
                    variant: "destructive",
                    duration: 300,
                });
                console.error(response._data);
            }
            refreshNuxtData("booksDashboard");
        },
    });
});
</script>

<template>
    <Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem>Sửa</DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{{ `Sửa ${books?.name}` }}</DialogTitle>
            </DialogHeader>
            <form @submit.prevent="updateBook">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Tên sách</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="author">
                    <FormItem>
                        <FormLabel>Tên tác giả</FormLabel>
                        <FormControl>
                            <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="quantity">
                    <FormItem>
                        <FormLabel>Số lượng</FormLabel>
                        <FormControl>
                            <Input type="number" v-bind="componentField" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="image">
                    <FormItem>
                        <FormLabel>Upload ảnh</FormLabel>
                        <FormControl>
                            <Input type="file" v-bind="componentField" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                </FormField>
                <Button :disabled="isSubmitting" class="bg-blue-600 hover:bg-blue-500" type="submit">{{
                    isSubmitting ? "Xác nhận..." : "Xác nhận"
                }}</Button>
            </form>
        </DialogContent>
    </Dialog>
</template>

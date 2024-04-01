<script lang="ts" setup>
import { useForm } from "vee-validate";
import type { ResponseType, Category } from "~/model/type";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast/use-toast";
import { z } from "zod";
definePageMeta({
    layout: "admin",
});
const { toast } = useToast();
const client = useSupabaseClient();
const { data: categories, error, refresh } = await useFetch<ResponseType<Category>>("/api/categories");
const imageUrl = ref("");
const formSchema = toTypedSchema(
    z
        .object({
            name: z.string({ required_error: "Bạn cần nhập tên sách" }),
            author: z.string({ required_error: "Bạn cần nhập tên tác giả" }),
            quantity: z.number({ required_error: "Bạn cần nhập số lượng sách" }),
            image: z.any(),
            category: z.number({ required_error: "Bạn cần chọn thể loại" }),
        })
        .required()
);
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: formSchema,
});
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
const newBook = handleSubmit(async (value) => {
    const { name, author, quantity, image, category } = value;
    await uploadImg(image);

    await $fetch("/api/book/create", {
        method: "POST",
        body: {
            name,
            author,
            quantity,
            category,
            image: imageUrl.value,
        },
        onResponse({ response }) {
            if (response._data.status === "success") {
                return toast({
                    title: "success",
                    description: `Thêm sách ${response._data.response.name} thanh cong`,
                });
                resetForm();
            } else {
                console.error(response._data);
                return toast({
                    title: "Error",
                    description: `${response._data}`,
                    variant: "destructive",
                });
            }
        },
    });
});
</script>

<template>
    <div class="container h-screen mt-10">
        <h1 class="text-2xl text-center text-blue-600">Thêm sách mới</h1>
        <form @submit.prevent="newBook">
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
            <FormField v-slot="{ componentField }" name="category">
                <FormItem>
                    <FormLabel>Sách thuộc thể loại</FormLabel>
                    <Select v-bind="componentField">
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn thể loại cho sách" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem
                                    v-for="category in (categories as any).response"
                                    :key="category.id"
                                    :value="category.id"
                                >
                                    {{ category.name }}
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button :disabled="isSubmitting" class="mt-10 bg-blue-600 hover:bg-blue-500" type="submit">{{
                isSubmitting ? "Xác nhận..." : "Xác nhận"
            }}</Button>
        </form>
    </div>
</template>

<style scoped></style>

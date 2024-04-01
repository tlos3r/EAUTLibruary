<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast/use-toast";
import type { Category } from "~/model/type";
import { z } from "zod";
import type { ResponseType } from "~/model/type";
definePageMeta({
    layout: "admin",
});
const { toast } = useToast();
const route = useRoute();
const { data: category, pending } = await useLazyAsyncData<ResponseType<Category | unknown>>(
    "category",
    (): Promise<ResponseType<Category>> =>
        $fetch("/api/categories", {
            params: {
                id: route.params.id,
            },
        })
);

const categoryName = toTypedSchema(
    z.object({
        name: z.string({ invalid_type_error: "Cần phải nhập kiểu chữ" }),
    })
);
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: categoryName,
});
const updateCategory = handleSubmit(async (value) => {
    await $fetch("/api/categories/update", {
        method: "PATCH",
        body: {
            id: route.params.id,
            name: value.name,
        },
        onResponse({ response }) {
            if (response._data.status === "success") {
                toast({
                    title: response._data.status,
                    description: `Sửa thành thể loại ${response._data.response.name} thành công`,
                });
                resetForm();
            } else {
                toast({
                    title: response._data.status,
                    variant: "destructive",
                    description: `${response._data.error}`,
                });
            }
        },
        onResponseError({ error, response }) {
            toast({
                title: response._data.status,
                variant: "destructive",
                description: `${response._data.error}`,
            });
            console.error(error);
            console.log(response);
        },
    });
    await navigateTo("/admin/dashboard/categories");
});
</script>

<template>
    <div v-if="pending" class="container flex flex-col mt-10 space-x-0 space-y-2">
        <Skeleton class="w-[400px] h-28 mx-auto" />
        <Skeleton class="w-full h-52" />
    </div>
    <div v-else class="container h-screen mt-10">
        <h1 class="text-2xl text-center text-blue-600">Sửa thể loại</h1>
        <form @submit.prevent="updateCategory">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Tên thể loại thay cho {{ (category as any).response[0].name }}</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="thể loại mới" v-bind="componentField" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>
            <Button :disabled="isSubmitting" class="mt-5 bg-blue-600 hover:bg-blue-500" type="submit">{{
                isSubmitting ? `Xác nhận...` : "Xác nhận"
            }}</Button>
        </form>
    </div>
</template>

<style scoped></style>

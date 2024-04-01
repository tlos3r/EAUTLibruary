<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast/use-toast";
import { z } from "zod";
definePageMeta({
    layout: "admin",
});
const { toast } = useToast();
const categoryName = toTypedSchema(
    z.object({
        name: z.string({ invalid_type_error: "Cần phải nhập kiểu chữ" }),
    })
);
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: categoryName,
});
const newCategory = handleSubmit(async (value) => {
    await $fetch("/api/categories/create", {
        method: "POST",
        body: {
            name: value.name,
        },
        onResponse({ response }) {
            if (response._data.status === "success") {
                toast({
                    title: response._data.status,
                    description: `Thêm thể loại ${response._data.response.name} thành công`,
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
});
</script>

<template>
    <div class="container h-screen mt-10">
        <h1 class="text-2xl text-center text-blue-600">Thêm thể loại mới</h1>
        <form @submit.prevent="newCategory">
            <FormField v-slot="{ componentField }" name="name">
                <FormItem>
                    <FormLabel>Tên thể loại</FormLabel>
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

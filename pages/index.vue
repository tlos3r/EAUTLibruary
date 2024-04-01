<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "@/components/ui/toast/use-toast";
import type { User } from "~/model/type";
definePageMeta({
    middleware: ["auth"],
});
useHead({
    title: "Đăng nhập",
});
const formSchema = toTypedSchema(
    z
        .object({
            email: z.string({ required_error: "Vui lòng nhập email" }).email({ message: "Email không hợp lệ" }),
            password: z.string({ required_error: "Vui lòng nhập mật khẩu" }),
        })
        .required()
);

const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: formSchema,
});
const userCookie = useCookie<User>("user");
const { toast } = useToast();
const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    await $fetch("/api/auth/login", {
        method: "POST",
        body: {
            email: values.email,
            password: values.password,
        },
        async onResponse({ response }) {
            if (response._data.status === "success") {
                userCookie.value = response._data.response;
                await navigateTo("/dashboard/book");
            } else {
                toast({
                    title: "Error",
                    variant: "destructive",
                    description: `${response._data.error}`,
                });
            }
        },
    });
});

watchEffect(() => {
    if (userCookie.value) {
        return navigateTo("/dashboard/book");
    }
});
</script>

<template>
    <div class="container h-screen">
        <div class="flex flex-col items-center w-1/3 p-5 mx-auto mt-10 space-y-5 border-2 rounded-md h-fit">
            <NuxtImg
                src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_%C4%90%C3%B4ng_%C3%81_2015.png"
                class="w-36 h-36"
            />
            <h1 class="text-2xl font-bold">Đăng nhập</h1>
            <form @submit="onSubmit" class="flex flex-col justify-center w-full gap-3">
                <FormField v-slot="{ componentField }" name="email">
                    <FormItem>
                        <FormControl>
                            <Input type="text" placeholder="Email" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="password">
                    <FormItem>
                        <FormControl>
                            <Input type="password" placeholder="Mật khẩu" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <div class="flex justify-end">
                    <Button type="submit" class="bg-blue-500">
                        <span v-if="isSubmitting">Đăng nhập...</span>
                        <span v-else>Đăng nhập</span>
                    </Button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped></style>

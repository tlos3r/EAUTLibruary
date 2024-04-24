<script lang="ts" setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { useToast } from "@/components/ui/toast/use-toast";
import { z } from "zod";

definePageMeta({
    layout: "admin",
});
const client = useSupabaseClient();
const { toast } = useToast();
const showPassword = ref(false);
const formSchema = toTypedSchema(
    z
        .object({
            email: z
                .string({ required_error: "cần phải điền email" })
                .email({ message: "Hãy điền đúng định dạng của email đuôi @gmail.com hoặc @eaut.edu.vn" })
                .trim(),
            name: z.string({ required_error: "cần phải điền tên người dùng" }).trim(),
            password: z
                .string({ required_error: "cần phải điền mật khẩu" })
                .min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự" })
                .max(10, { message: "Mật khẩu chỉ đưới 10 ký tự" })
                .trim(),
            role: z.enum(["ADMIN", "USER"], { required_error: "Cần phải cấp quyền cho tài khoản" }),
        })
        .required()
);
const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: formSchema,
});

const registerUser = handleSubmit(async (value) => {
    const { error } = await client.auth.signUp({
        email: value.email,
        password: value.password,
    });
    if (error) {
        toast({
            title: "Có lỗi xảy ra",
            description: error.message,
            variant: "destructive",
        });
        return;
    }
    await $fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: {
            email: value.email,
            name: value.name,
            role: value.role,
            password: value.password,
        },
        onResponse({ response, error }) {
            if (response._data.status === "success") {
                console.log(response._data.response);

                toast({
                    title: response._data.status,
                    description: `Đăng ký tài khoản với tên ${response._data.response.name} thành công`,
                });
                resetForm();
            } else {
                toast({
                    title: response._data.status,
                    variant: "destructive",
                    description: `${response._data}`,
                });
            }
        },
        onResponseError({ error, response }) {
            toast({
                title: response._data.status,
                variant: "destructive",
                description: `${error?.message}`,
            });
            console.error(error);
            console.log(response);
        },
    });
});
</script>

<template>
    <form @submit.prevent="registerUser" class="w-3/4 mt-10 ml-10 space-y-6">
        <h1 class="text-3xl font-bold text-center text-blue-600">Thêm người dùng</h1>
        <FormField v-slot="{ componentField }" name="name">
            <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="tên người dùng" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="email" v-bind="componentField" />
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="password">
            <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                    <div class="relative items-center w-full">
                        <span class="absolute inset-y-0 flex items-center justify-center px-2 cursor-pointer end-0">
                            <Icon
                                @click="showPassword = !showPassword"
                                name="fluent:eye-24-regular"
                                v-if="showPassword"
                                class="text-2xl"
                            />
                            <Icon
                                @click="showPassword = !showPassword"
                                name="fluent:eye-off-24-regular"
                                v-else
                                class="text-2xl"
                            />
                        </span>
                        <Input
                            id="search"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="mật khẩu"
                            class="pr-10"
                            v-bind="componentField"
                        />
                    </div>
                </FormControl>
                <FormMessage />
            </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="role">
            <FormItem>
                <FormLabel>Quyền của tài khoản</FormLabel>
                <Select v-bind="componentField">
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Chọn quyền cho tài khoản" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="USER"> USER </SelectItem>
                            <SelectItem value="ADMIN"> ADMIN </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <FormMessage />
            </FormItem>
        </FormField>
        <Button :disabled="isSubmitting" class="bg-blue-600 hover:bg-blue-500" type="submit">{{
            isSubmitting ? "Xác nhận..." : "Xác nhận"
        }}</Button>
    </form>
</template>

<style scoped></style>

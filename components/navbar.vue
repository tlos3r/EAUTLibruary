<script setup lang="ts">
import { useToast } from "@/components/ui/toast/use-toast";
import type { User } from "~/model/type";

const { toast } = useToast();
const userCookie = useCookie<User | null>("user");
const logOut = async () => {
    try {
        userCookie.value = null;
        toast({
            title: "Success",
            description: "Đăng xuất thành công",
        });
        return navigateTo("/");
    } catch (error) {
        toast({
            title: "Error",
            variant: "destructive",
            description: useHandleError(error),
        });
    }
};
</script>

<template>
    <div class="flex justify-end my-4 mr-4">
        <DropdownMenu>
            <DropdownMenuTrigger as-child class="cursor-pointer">
                <Avatar size="sm" shape="circle" class="relative mr-4">
                    <AvatarImage
                        src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"
                        alt="user"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar></DropdownMenuTrigger
            >
            <DropdownMenuContent>
                <DropdownMenuItem @click="logOut">Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
</template>

<style lang="scss" scoped></style>

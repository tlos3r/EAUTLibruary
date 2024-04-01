import type { User } from "@/model/type";
export default defineNuxtRouteMiddleware((to, from) => {
    const userCookie = useCookie<User>("user");

    if (!userCookie) {
        return navigateTo("/");
    }
});

import type { User } from "~/model/type";

export default defineNuxtRouteMiddleware((to, from) => {
    const userCookie = useCookie<User>("user");

    if (userCookie.value.role !== "ADMIN") {
        return navigateTo("/dashboard");
    }
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@nuxt/image", "nuxt-icon", "shadcn-nuxt"],
    css: ["~/assets/css/main.css"],
    devtools: { enabled: true },
    supabase: {
        redirect: false,
    },
    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: "",
    },
});

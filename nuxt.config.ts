// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
        head: {
            link: [
                {
                    rel: "apple-touch-icon",
                    sizes: "180x180",
                    href: "/apple-touch-icon.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "32x32",
                    href: "/favicon-32x32.png",
                },
                {
                    rel: "icon",
                    type: "image/png",
                    sizes: "16x16",
                    href: "/favicon-16x16.png",
                },
                {
                    rel: "manifest",
                    href: "/site.webmanifest",
                },
            ],
        },
    },
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
        componentDir: "~/components/ui",
    },
});

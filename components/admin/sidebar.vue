<script lang="ts" setup>
const isNavbarOpen = ref(false);
</script>

<template>
    <!-- Component: Side navigation menu with content separator -->
    <!-- Mobile trigger -->
    <button
        title="Side navigation"
        type="button"
        class="fixed z-40 self-center order-10 visible block w-10 h-10 bg-white rounded opacity-100 lg:hidden left-6 top-6"
        :class="{
            'visible opacity-100 [&_span:nth-child(1)]:w-6 [&_span:nth-child(1)]:translate-y-0 [&_span:nth-child(1)]:rotate-45 [&_span:nth-child(3)]:w-0 [&_span:nth-child(2)]:-rotate-45':
                isNavbarOpen,
        }"
        @click="isNavbarOpen = !isNavbarOpen"
    >
        <div class="absolute w-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <span
                aria-hidden="true"
                class="absolute block h-0.5 w-9/12 -translate-y-2 transform rounded-full bg-slate-700 transition-all duration-300"
            ></span>
            <span
                aria-hidden="true"
                class="absolute block h-0.5 w-6 transform rounded-full bg-slate-900 transition duration-300"
            ></span>
            <span
                aria-hidden="true"
                class="absolute block h-0.5 w-1/2 origin-top-left translate-y-2 transform rounded-full bg-slate-900 transition-all duration-300"
            ></span>
        </div>
    </button>

    <!-- Side Navigation -->
    <aside
        id="nav-menu-1"
        aria-label="Side navigation"
        class="fixed top-0 bottom-0 left-0 z-40 flex flex-col transition-transform bg-white border-r w-72 sm:translate-x-0 border-r-slate-200"
        :class="[isNavbarOpen ? 'translate-x-full' : '-translate-x-full']"
    >
        <NuxtLink
            class="flex items-center gap-2 p-6 text-xl font-medium whitespace-nowrap focus:outline-none"
            to="/admin/dashboard"
        >
            <NuxtImg
                src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Logo_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_C%C3%B4ng_ngh%E1%BB%87_%C4%90%C3%B4ng_%C3%81_2015.png"
            />
        </NuxtLink>
        <nav aria-label="side navigation" class="flex-1 overflow-auto divide-y divide-slate-100">
            <div>
                <ul class="flex flex-col flex-1 gap-1 py-3">
                    <li class="px-3">
                        <NuxtLink
                            to="/admin/dashboard"
                            class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 aria-[current=page]:text-blue-500 aria-[current=page]:bg-blue-50"
                            :aria-current="[$route.fullPath === '/admin/dashboard' ? 'page' : 'false']"
                        >
                            <div class="flex items-center self-center">
                                <Icon name="material-symbols:dashboard-outline" class="text-2xl" />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                            >
                                Thống kê
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="px-3">
                        <NuxtLink
                            to="/admin/dashboard/user"
                            class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 aria-[current=page]:text-blue-500 aria-[current=page]:bg-blue-50"
                            :aria-current="[$route.fullPath === '/admin/dashboard/user' ? 'page' : 'false']"
                        >
                            <div class="flex items-center self-center">
                                <Icon name="mingcute:user-add-line" class="text-2xl" />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                            >
                                Thêm tài khoản
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="px-3">
                        <NuxtLink
                            to="/admin/dashboard/borrow"
                            class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 aria-[current=page]:text-blue-500 aria-[current=page]:bg-blue-50"
                            :aria-current="[$route.fullPath === '/admin/dashboard/borrow' ? 'page' : 'false']"
                        >
                            <div class="flex items-center self-center">
                                <Icon name="mage:id-card" class="text-2xl" />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                            >
                                Mượn sách
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="px-3">
                        <NuxtLink
                            to="/admin/dashboard/book"
                            class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 aria-[current=page]:text-blue-500 aria-[current=page]:bg-blue-50"
                            :aria-current="[$route.fullPath === '/admin/dashboard/book' ? 'page' : 'false']"
                        >
                            <div class="flex items-center self-center">
                                <Icon name="ion:book-outline" class="text-2xl" />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                            >
                                Sách
                            </div>
                        </NuxtLink>
                    </li>
                    <li class="px-3">
                        <NuxtLink
                            to="/admin/dashboard/categories"
                            class="flex items-center gap-3 p-3 transition-colors rounded text-slate-700 hover:text-blue-500 hover:bg-blue-50 focus:bg-blue-50 aria-[current=page]:text-blue-500 aria-[current=page]:bg-blue-50"
                            :aria-current="[$route.fullPath === '/admin/dashboard/categories' ? 'page' : 'false']"
                        >
                            <div class="flex items-center self-center">
                                <Icon name="material-symbols:category-outline" class="text-2xl" />
                            </div>
                            <div
                                class="flex flex-col items-start justify-center flex-1 w-full gap-0 overflow-hidden text-sm truncate"
                            >
                                Thể loại sách
                            </div>
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>

    <!-- Backdrop -->
    <div
        class="fixed top-0 bottom-0 left-0 right-0 z-30 transition-colors bg-slate-900/20 sm:hidden"
        :class="[isNavbarOpen ? 'block' : 'hidden']"
        @click="isNavbarOpen = !isNavbarOpen"
    ></div>
    <!-- End Side navigation menu with content separator -->
</template>

<style scoped></style>

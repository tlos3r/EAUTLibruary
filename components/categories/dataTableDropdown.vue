<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
const { toast } = useToast();
const props = defineProps({
    categories: {
        type: Object,
    },
});
// const emit = defineEmits(["acceptRequest"]);
const removeCategory = async (category: number) => {
    await $fetch("/api/categories/remove", {
        method: "DELETE",
        params: {
            id: category,
        },
        onResponse({ response }) {
            if (response._data.status === "success") {
                toast({
                    title: response._data.status,
                    description: `Xóa thể loại ${response._data.response.name} thành công`,
                });
            } else {
                toast({
                    title: response._data.status,
                    variant: "destructive",
                    description: `${response._data.error}`,
                });
            }
        },
    });
    console.log(category);
    await refreshNuxtData("categoryDashboard");
};
</script>

<template>
    <Dialog>
        <DropdownMenu>
            <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                    <span class="sr-only">Open menu</span>
                    <MoreHorizontal class="w-4 h-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <NuxtLink :to="`/admin/dashboard/categories/${categories?.id}`">
                    <DropdownMenuItem> Sửa </DropdownMenuItem>
                </NuxtLink>
                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem>Xóa</DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogDescription> Bạn có chắc chắn là muốn xóa {{ categories?.name }} chứ ? </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button type="submit" @click="removeCategory(categories?.id)">Xác nhận</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

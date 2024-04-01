<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { useToast } from "@/components/ui/toast/use-toast";
import "@vuepic/vue-datepicker/dist/main.css";
import VueDatePicker from "@vuepic/vue-datepicker";

const { toast } = useToast();
const props = defineProps({
    borrows: {
        type: Object,
    },
});
const date = ref();

const updateReturnDate = async () => {
    await $fetch("/api/borrow/update", {
        method: "PATCH",
        body: {
            id: props.borrows?.id,
            returnDate: date.value,
        },
        onResponse({ response }) {
            console.log(response._data);

            if (response._data.status === "success") {
                toast({
                    title: response._data.status,
                    description: `Cập nhật ngày trả thành công`,
                });
                return;
            } else {
                toast({
                    title: response._data.status,
                    variant: "destructive",
                    description: `${response._data.error}`,
                });
                return;
            }
        },
    });
};
onMounted(() => {
    const now = new Date();
    date.value = now;
});
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

                <DropdownMenuSeparator />
                <DialogTrigger asChild>
                    <DropdownMenuItem>Sửa ngày trả lại </DropdownMenuItem>
                </DialogTrigger>
            </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Cập nhật ngày trả sách</DialogTitle>
                <VueDatePicker v-model="date" />
            </DialogHeader>
            <DialogFooter>
                <Button type="submit" @click="updateReturnDate">Xác nhận</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

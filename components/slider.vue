<script lang="ts" setup>
import { register } from "swiper/element/bundle";
register();
</script>

<template>
    <div class="container my-10">
        <swiper-container
            slides-per-view="1"
            speed="500"
            loop="true"
            css-mode="true"
            navigation="true"
            scrollbar="true"
        >
            <swiper-slide>
                <NuxtImg
                    src="https://eaut.edu.vn/wp-content/uploads/2020/04/IMG_5556.jpg"
                    class="h-[500px] w-full"
                    format="webp"
                />
            </swiper-slide>
            <swiper-slide>
                <NuxtImg
                    src="https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/81243370_1605675886241543_2145244200512258048_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7f8c78&_nc_eui2=AeHICcvRc_L7jxV6cbMlCpXqXY8OccOkdi1djw5xw6R2LSVxck91UuV6aQL66aApMXj3BHtluXmQdwZ0IFG6339Y&_nc_ohc=asTXqXwek6IAX9Gci38&_nc_ht=scontent.fhan14-1.fna&oh=00_AfCNa7wQDtNVVsV0FMYaKluBl1D5gnDKDkMdx-zyrAjpGw&oe=660CD696"
                    class="h-[500px] w-full"
                    format="webp"
                />
            </swiper-slide>
            <swiper-slide>
                <NuxtImg
                    src="https://eaut.edu.vn/wp-content/uploads/2021/12/Banner.png"
                    class="h-[500px] w-full"
                    format="webp"
                />
            </swiper-slide>
        </swiper-container>
    </div>
</template>

<style scoped></style>

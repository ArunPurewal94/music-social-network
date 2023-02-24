<template>
    <div>
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">
                <div class="text-gray-900 text-xl">Videos</div>
                <div class="bg-indigo-500 w-full h-1"></div>
                <div class="w-full mt-4" v-if="userStore.id == route.params.id">
                    <RouterLinkButton
                        color="gray-900"
                        btnText="Delete Video"
                        class="ml-2 border-red-500 hover:bg-red-500"
                        url="/account/delete-video" />
                    <RouterLinkButton
                        color="gray-900"
                        btnText="Add Video"
                        class="border-green-500 hover:bg-green-500"
                        url="/account/add-video" />
                </div>
            </div>
        </div>

        <div class="flex flex-wrap mb-4">
            <div
                v-for="video in videoStore.videos"
                :key="video"
                class="my-1 px-1 w-full md:w-1/2 lg:w-1/2">
                <div class="text-xl text-gray-900 mb-2">
                    {{ video.title }}
                </div>
                <iframe
                    class="w-full h-60 rounded-md"
                    :src="video.url"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>

<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import { onMounted } from "vue";
import { useVideoStore } from "@/store/video-store";
import { useUserStore } from "@/store/user-store";
import { useRoute } from "vue-router";
const route = useRoute();
const videoStore = useVideoStore();
const userStore = useUserStore();
onMounted(async () => {
    await videoStore.fetchVideosByUserId(route.params.id);
});
</script>
<style lang="scss"></style>

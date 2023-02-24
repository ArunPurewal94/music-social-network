<template>
    <div>
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">
                <div class="text-gray-900 text-xl">Songs</div>
                <div class="bg-indigo-500 w-full h-1"></div>
                <div class="w-full mt-4" v-if="userStore.id == route.params.id">
                    <RouterLinkButton
                        color="gray-900"
                        btnText="Delete Song"
                        class="ml-2 border-red-500 hover:bg-red-500"
                        url="/account/delete-song" />
                    <RouterLinkButton
                        color="gray-900"
                        btnText="Add Song"
                        class="border-green-500 hover:bg-green-500"
                        url="/account/add-song" />
                </div>
            </div>
        </div>

        <div class="pb-4">
            <SongPlayer />
        </div>
    </div>
</template>

<script setup>
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import SongPlayer from "./SongPlayer.vue";
import { useUserStore } from "@/store/user-store";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { useSongStore } from "@/store/song-store";
const route = useRoute();
const userStore = useUserStore();
const songStore = useSongStore();

onMounted(async () => {
    await songStore.fetchSongsByUserId(route.params.id);
});
</script>
<style lang="scss"></style>

<template>
    <div class="flex md:flex-row sm:flex-col mt-10 justify-center items-center">
        <div class="lg:w-1/2">
            <div class="w-full max-w-sm rounded-lg">
                <div
                    class="flex flex-col items-center pb-10 xs:flex-row h-[300px]">
                    <img
                        class="w-[200px] h-[200px] m-3 rounded-full shadow-lg"
                        :src="profileStore.image"
                        alt="Bonnie image" />
                    <h5 class="mb-1 text-xl font-medium text-gray-900">
                        {{ profileStore.firstName }} {{ profileStore.lastName }}
                    </h5>
                    <span class="text-sm text-gray-600">{{
                        profileStore.location
                    }}</span>
                </div>
            </div>
        </div>
        <div class="w-full pl-4">
            <div class="flex">
                <div class="w-full">
                    <RouterLinkButton
                        v-if="userStore.id == route.params.id"
                        color="gray-900"
                        btnText="Edit Profile"
                        class="border-indigo-500 hover:bg-indigo-500"
                        url="/account/edit-profile" />
                </div>
            </div>
            <div class="my-2 flex flex-col items-center justify-center">
                <InfoSection />
            </div>
            <AboutSection />
        </div>
    </div>
    <SongSection />
    <VideoSection />
    <PostsSection />
</template>

<script setup>
import InfoSection from "@/components/partials/profile/InfoSection.vue";
import AboutSection from "@/components/partials/profile/AboutSection.vue";
import SongSection from "@/components/partials/profile/SongSection.vue";
import VideoSection from "@/components/partials/profile/VideoSection.vue";
import PostsSection from "@/components/partials/profile/PostSection.vue";
import RouterLinkButton from "@/components/global/RouterLinkButton.vue";
import { useUserStore } from "@/store/user-store";
import { useProfileStore } from "@/store/profile-store";
import { useRoute } from "vue-router";
import { onMounted } from "vue";
const userStore = useUserStore();
const profileStore = useProfileStore();
const route = useRoute();

onMounted(async () => {
    await profileStore.fetchProfileById(route.params.id);
});
</script>

<style lang="scss"></style>

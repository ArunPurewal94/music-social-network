<template>
    <div>
        <button
            @click="open = !open"
            class="bg-transparent text-white font-semibold hover:text-white py-1 px-2 border-indigo-500 hover:bg-indigo-500 hover:border-transparent rounded">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <div
            v-show="open"
            tabindex="-1"
            class="animated slideInDown faster fixed w-full h-full top-0 left-0 flex justify-center backdrop-blur-lg">
            <div class="bg-black absolute w-full h-full opacity-75"></div>
            <div class="relative w-full h-full max-w-md md:h-auto top-[20%]">
                <!-- Modal content -->
                <div class="relative rounded-lg shadow bg-gray-700">
                    <button
                        @click="open = !open"
                        type="button"
                        class="absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white">
                        <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                    <!-- Modal header -->
                    <div class="px-6 py-4 border-b rounded-t border-gray-600">
                        <h3
                            class="text-base font-semibold lg:text-xl text-white">
                            Menu
                        </h3>
                    </div>
                    <!-- Modal body -->
                    <div class="p-6">
                        <ul class="my-4 space-y-3">
                            <li>
                                <router-link
                                    v-if="!userStore.id"
                                    to="/login"
                                    @click="open = !open"
                                    class="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-900 hover:text-indigo-500 text-white text-center">
                                    <font-awesome-icon
                                        icon="fa-solid fa-right-to-bracket" />
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Login</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    v-if="!userStore.id"
                                    @click="open = !open"
                                    to="/register"
                                    class="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-900 hover:text-indigo-500 text-white text-center">
                                    <font-awesome-icon
                                        icon="fa-solid fa-right-to-bracket" />
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Register</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    v-if="userStore.id"
                                    @click="open = !open"
                                    :to="'/account/profile/' + userStore.id"
                                    class="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-900 hover:text-indigo-500 text-white text-center">
                                    <font-awesome-icon
                                        icon="fa-solid fa-right-to-bracket" />
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Profile</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    v-if="userStore.id"
                                    to="/account/posts"
                                    @click="open = !open"
                                    class="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-900 hover:text-indigo-500 text-white text-center">
                                    <font-awesome-icon
                                        icon="fa-solid fa-right-to-bracket" />
                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Posts</span
                                    >
                                </router-link>
                            </li>
                            <li>
                                <router-link
                                    v-if="userStore.id"
                                    @click="logout"
                                    to="/"
                                    class="flex items-center p-3 text-base font-bold rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-900 hover:text-indigo-500 text-white text-center">
                                    <font-awesome-icon
                                        icon="fa-solid fa-right-to-bracket" />

                                    <span class="flex-1 ml-3 whitespace-nowrap"
                                        >Logout</span
                                    >
                                </router-link>
                            </li>
                        </ul>
                        <div>
                            <router-link
                                @click="open = !open"
                                to="/"
                                class="inline-flex items-center text-xs font-normal hover:underline text-gray-400">
                                <svg
                                    class="w-3 h-3 mr-2"
                                    focusable="false"
                                    data-prefix="far"
                                    data-icon="question-circle"
                                    role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        fill="currentColor"
                                        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"></path>
                                </svg>
                                Do you need any help?
                                <span class="mx-1">Contact Us</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/store/user-store";
import axios from "axios";
import { useProfileStore } from "@/store/profile-store";
import { useSongStore } from "@/store/song-store";
import { usePostStore } from "@/store/post-store";
import { useVideoStore } from "@/store/video-store";
import { useRouter } from "vue-router";
let open = ref(false);
const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();

const logout = async () => {
    try {
        let res = await axios.post("api/logout", {
            user_id: userStore.id,
        });
        userStore.clearUser();
        profileStore.clearProfile();
        songStore.clearSongs();
        postStore.clearPosts();
        videoStore.clearVideos();
        router.push("/");
        console.log(res.data);
    } catch (err) {
        console.log(err);
    }
};
</script>

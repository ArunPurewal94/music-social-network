<template>
    <div id="register" class="fadeIn">
        <TopNavigation />
        <div class="h-screen md:flex">
            <div class="md:flex w-1/2 hidden">
                <div class="bg-image">
                    <img
                        src="@/assets/img/crowd2.png"
                        alt="Crowd Background Cover"
                        class="w-100% h-full" />
                </div>
            </div>

            <div
                class="flex md:w-1/2 justify-center py-10 items-center bg-white">
                <form class="bg-white w-full">
                    <h1
                        class="text-gray-800 font-bold text-2xl mb-1 text-center">
                        Hello!
                    </h1>
                    <p
                        class="text-sm font-normal text-gray-600 mb-7 text-center">
                        Welcome & Register!
                    </p>

                    <div class="flex items-center py-2 px-4 mb-4 w-full">
                        <TextInput
                            label="First Name"
                            :label-color="true"
                            v-model:input="firstName"
                            input-type="text"
                            :error="
                                errors.first_name ? errors.first_name[0] : ''
                            " />
                    </div>
                    <div class="flex items-center py-2 px-4 mb-4 w-full">
                        <TextInput
                            label="Last Name"
                            :label-color="true"
                            v-model:input="lastName"
                            input-type="text"
                            :error="
                                errors.last_name ? errors.last_name[0] : ''
                            " />
                    </div>
                    <div class="flex items-center py-2 px-4 mb-4 w-full">
                        <TextInput
                            label="Email"
                            :label-color="true"
                            v-model:input="email"
                            input-type="email"
                            :error="errors.email ? errors.email[0] : ''" />
                    </div>
                    <div class="flex items-center py-2 px-4 w-full">
                        <TextInput
                            label="Password"
                            :label-color="true"
                            v-model:input="password"
                            input-type="password"
                            :error="
                                errors.password ? errors.password[0] : ''
                            " />
                    </div>
                    <div class="flex items-center py-2 px-4 w-full">
                        <TextInput
                            label="Confirm Password"
                            :label-color="true"
                            v-model:input="confirmPassword"
                            input-type="password" />
                    </div>
                    <div class="px-4">
                        <button
                            @click="register"
                            type="button"
                            class="inline-block w-full hover:text-indigo-600 hover:bg-transparent bg-indigo-600 hover:border-2 hover:border-indigo-600 mt-4 py-2 px-2 text-white font-semibold mb-2 rounded-lg">
                            Register
                        </button>
                    </div>

                    <span
                        class="text-sm ml-2 hover:text-blue-500 cursor-pointer">
                        <p class="text-center text-md text-gray-900">
                            Already have an account?
                            <router-link
                                class="text-blue-500 no-underline hover:underline"
                                to="login"
                                >Login</router-link
                            >
                        </p></span
                    >
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useUserStore } from "@/store/user-store";
import { useProfileStore } from "@/store/profile-store";
import { useSongStore } from "@/store/song-store";
import { usePostStore } from "@/store/post-store";
import { useVideoStore } from "@/store/video-store";
import { useRouter } from "vue-router";
import TextInput from "@/components/global/TextInput.vue";
import TopNavigation from "@/components/static/TopNavigation.vue";

const router = useRouter();
const userStore = useUserStore();
const profileStore = useProfileStore();
const songStore = useSongStore();
const postStore = usePostStore();
const videoStore = useVideoStore();

let errors = ref([]);
let firstName = ref(null);
let lastName = ref(null);
let email = ref(null);
let password = ref(null);
let confirmPassword = ref(null);

const register = async () => {
    errors.value = [];

    try {
        let res = await axios.post("api/register", {
            first_name: firstName.value,
            last_name: lastName.value,
            email: email.value,
            password: password.value,
            password_confirmation: confirmPassword.value,
        });
        axios.defaults.headers.common["Authorization"] =
            "Bearer " + res.data.token;
        userStore.setUserDetails(res);

        await profileStore.fetchProfileById(userStore.id);
        await songStore.fetchSongsByUserId(userStore.id);
        await postStore.fetchPostsByUserId(userStore.id);
        await videoStore.fetchVideosByUserId(userStore.id);

        router.push("/account/profile/" + userStore.id);
    } catch (err) {
        errors.value = err.response.data.errors;
    }
};
</script>

<style lang="scss" scoped>
#register {
    animation-duration: 2s;
}
</style>

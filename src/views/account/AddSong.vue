<template>
    <div id="add-song" class="container mx-auto max-w-4xl pt-20 px-6">
        <div class="text-gray-900 text-xl">Add Song</div>
        <div class="bg-indigo-500 w-full h-1"></div>
        <div class="flex flex-wrap mt-6 mb-6">
            <div class="w-full px-3">
                <TextInput
                    label="Title"
                    :label-color="true"
                    v-model:input="title"
                    inputType="text"
                    :error="errors.title ? errors.title[0] : ''" />
            </div>
        </div>
        <div class="flex flex-wrap mt-6 mb-6">
            <div class="w-full px-3">
                <label
                    class="block uppercase tracking-wide text-gray-900 text-xs font-bold mb-2"
                    >Add Song</label
                >
                <input
                    type="file"
                    id="image"
                    ref="file"
                    @change="handleFileUpload"
                    class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-400 bg-white bg-clip-padding border border-solid border-gray-200 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-gray-300" />
            </div>
        </div>
        <div class="flex flex-wrap mt-4 mb-6">
            <div class="w-full px-3">
                <SubmitFormButton btnText="Add Song" @click="addSong" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import TextInput from "@/components/global/TextInput.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import Swal from "@/sweetalert2";
import { useUserStore } from "@/store/user-store";
import { useSongStore } from "@/store/song-store";
import axios from "axios";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const songStore = useSongStore();
const router = useRouter();

let title = ref(null);
let song = ref(null);
let file = ref(null);
let errors = ref([]);

const handleFileUpload = () => {
    song.value = file.value.files[0];
};

const addSong = async () => {
    if (!song.value) {
        Swal.fire(
            "Oops. Something went wrong!",
            "No MP3 File Uploaded!",
            "warning"
        );
        return null;
    }
    try {
        let form = new FormData();
        form.append("user_id", userStore.id);
        form.append("title", title.value || "");
        form.append("file", song.value);
        await axios.post("api/songs", form);
        songStore.fetchSongsByUserId(userStore.id);
        Swal.fire("Song Uploaded!", "Redirected to Profile", "success");
        setTimeout(() => {
            router.push("/account/profile/" + userStore.id);
        }, 600);
    } catch (err) {
        errors.value = err.response.data.errors;
    }
};
</script>

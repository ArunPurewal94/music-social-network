<template>
    <div id="delete-song" class="container mx-auto max-w-4xl pt-20 px-6">
        <div class="text-gray-900 text-xl">Delete Song</div>
        <div class="bg-red-500 w-full h-1"></div>

        <div class="bg-white rounded px-8 pt-6 pb-8">
            <div
                v-for="(song, index) in songStore.songs"
                :key="song"
                class="flex flex-wrap">
                <div class="w-3/4 mr-auto mt-2 text-lg p-1 text-gray-900">
                    {{ ++index }} . {{ song.title }}
                </div>
                <div class="w-1/4 ml-auto p-1">
                    <button
                        @click="deleteSong(song)"
                        type="button"
                        class="float-right bg-transparent hover:bg-red-500 text-gray-900 hover:text-white font-semibold py-2 px-4 border border-red-500 hover:border-transparent rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useSongStore } from "@/store/song-store";
import { useUserStore } from "@/store/user-store";
import Swal from "@/sweetalert2";
import axios from "axios";
import { useRouter } from "vue-router";
const songStore = useSongStore();
const userStore = useUserStore();
const router = useRouter();
const deleteSong = async (song) => {
    Swal.fire({
        title: "<strong>Are you sure you want to delete this song?</strong>",
        text: "You won't be able to revert this. ",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: "#3085D6",
        cancelButtonColor: "#D33",
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Yes, Delete Song',
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete("api/songs/" + song.id + "/" + userStore.id);
                songStore.fetchSongsByUserId(userStore.id);
                Swal.fire("Song Deleted!", "Redirected to Profile", "success");
                setTimeout(() => {
                    router.push("/account/profile/" + userStore.id);
                }, 600);
            } catch (err) {
                console.log(err);
            }
        }
    });
};
</script>

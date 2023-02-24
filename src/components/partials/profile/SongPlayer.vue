<template>
    <div class="bg-indigo-500 rounded">
        <div id="aplayer"></div>
    </div>
</template>

<script setup>
import APlayer from "aplayer";
import { onMounted } from "vue";
import { useSongStore } from "@/store/song-store";
import "aplayer/dist/APlayer.min.css";

const songStore = useSongStore();
let songsList = [];

onMounted(() => {
    setTimeout(() => {
        mapSongs();
    }, 2000);
});

const mapSongs = () => {
    let newSongs = songStore.songs.map(function (song) {
        return {
            name: song.title,
            artist: songStore.artistName,
            url:
                process.env.VUE_APP_API_URL +
                "songs/" +
                songStore.artistId +
                "/" +
                song.song,
        };
    });
    for (let i = 0; i < newSongs.length; i++) {
        songsList.push(newSongs[i]);
    }
    thePlayer();
};

const thePlayer = () => {
    new APlayer({
        container: document.getElementById("aplayer"),
        audio: songsList,
    });
};
</script>
<style lang="scss"></style>

import axios from "axios";
import { defineStore } from "pinia";

export const useSongStore = defineStore("song", {
    state: () => ({
        songs: [],
        artistId: null,
        artistName: null,
    }),
    actions: {
        async fetchSongsByUserId(userId) {
            let res = await axios.get("api/user/" + userId + "/songs");
            this.$state.artistId = res.data.artist_id;
            this.$state.artistName = res.data.artist_name;
            if (res.data.songs) {
                this.$state.songs = res.data.songs;
            }
        },

        clearSongs() {
            this.$state.songs = [];
            this.$state.artistName = null;
            this.$state.artistId = null;
        },
    },
    persist: true,
});

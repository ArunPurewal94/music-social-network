<template>
    <div class="container max-w-4xl mx-auto py-6 px-3">
        <div
            v-for="post in posts"
            :key="post"
            class="p-10 my-5 shadow-md hover:shadow-xl rounded-xl">
            <div class="w-full flex items-center px-4 pb-6">
                <img
                    class="w-12 h-12 rounded-full object-cover mr-4 shadow"
                    :src="userStore.userImage(post.user.image)"
                    alt="avatar" />
                <div class="">
                    <div class="flex items-center justify-between">
                        <h2 class="text-lg font-semibold text-gray-900 -mt-1">
                            <router-link
                                :to="'/account/profile/' + post.user.id">
                                {{ post.user.first_name }}
                                {{ post.user.last_name }}
                            </router-link>
                        </h2>
                    </div>
                </div>
            </div>
            <div class="w-full overflow-hidden">
                <img
                    class="block mx-auto w-full h-[500px] rounded"
                    :src="postStore.postImage(post.image)"
                    alt="Mountain" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{{ post.title }}</div>
                    <div class="font-semibold text-lg mb-2">
                        Location: {{ post.location }}
                    </div>
                    <p class="text-gray-700 text-base">
                        {{ post.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import { usePostStore } from "@/store/post-store";
import { useUserStore } from "@/store/user-store";
const postStore = usePostStore();
const userStore = useUserStore();
let posts = ref(null);
onMounted(async () => {
    await getPosts();
});
const getPosts = async () => {
    try {
        let res = await axios.get("api/posts");
        posts.value = res.data.paginate.data;
    } catch (err) {
        console.log(err);
    }
};
</script>

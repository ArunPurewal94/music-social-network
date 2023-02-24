<template>
    <div>
        <div class="mx-auto py-4">
            <div class="flex flex-wrap font-bold text-gray-100">
                <div class="text-gray-900 text-xl">Posts</div>
                <div class="bg-indigo-500 w-full h-1"></div>
                <div class="w-full mt-4">
                    <RouterLinkButton
                        v-if="userStore.id == route.params.id"
                        color="gray-900"
                        btnText="Add Post"
                        class="border-green-500 hover:bg-green-500"
                        url="/account/add-post" />
                </div>
            </div>
        </div>

        <div class="flex flex-wrap mb-4">
            <div
                v-for="post in postStore.posts"
                :key="post"
                class="my-1 px-1 w-full md:w-1/2 lg:w-1/2">
                <div
                    class="max-w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl">
                    <a href="#">
                        <img
                            class="rounded-t-lg w-full h-[400px]"
                            :src="postStore.postImage(post.image)"
                            alt="" />
                    </a>
                    <div class="p-2 md:p-4">
                        <div class="text-xl">
                            <router-link
                                :to="'/account/post-by-id/' + post.id"
                                class="mb-2 hover:underline font-bold tracking-tight text-indigo-500">
                                {{ post.title }}
                            </router-link>
                        </div>
                        <p class="py-2 md:py-4 text-lg">
                            Location: <b>{{ post.location }}</b>
                        </p>
                        <p class="text-gray-darker text-md">
                            {{ post.description }}
                        </p>
                        <div
                            class="mt-5 flex items-end justify-end"
                            v-if="userStore.id == route.params.id">
                            <router-link
                                :to="'/account/edit-post/' + post.id"
                                class="mr-1 bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-bold py-2 px-5 rounded-full">
                                Edit post
                            </router-link>
                            <button
                                @click="deletePost(post.title, post.id)"
                                class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold py-2 px-5 rounded-full">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import RouterLinkButton from "../../global/RouterLinkButton.vue";
import { usePostStore } from "../../../store/post-store";
import { useUserStore } from "../../../store/user-store";
import { useRoute } from "vue-router";
import Swal from "../../../sweetalert2";
import axios from "axios";
import { onMounted } from "vue";

const route = useRoute();
const postStore = usePostStore();
const userStore = useUserStore();

onMounted(async () => {
    await postStore.fetchPostsByUserId(route.params.id);
});

const deletePost = async (title, id) => {
    Swal.fire({
        title: 'Are you sure you want to delete the post "' + title + '"',
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await axios.delete("api/posts/" + id);

                postStore.fetchPostsByUserId(userStore.id);

                Swal.fire("Deleted!", "Your post has been deleted.", "success");
            } catch (err) {
                console.log(err);
            }
        }
    });
};
</script>

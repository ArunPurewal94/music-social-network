<template>
    <div id="add-video" class="container mx-auto max-w-4xl pt-20 px-6">
        <div class="text-gray-900 text-xl">Add Video</div>
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
                <TextInput
                    label="Video URL"
                    :label-color="true"
                    v-model:input="videoCode"
                    inputType="text"
                    :error="errors.url ? errors.url[0] : ''" />
            </div>
        </div>

        <div class="flex flex-wrap mt-4 mb-6">
            <div class="w-full px-3">
                <SubmitFormButton btnText="Add Video" @click="addVideoLink" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TextInput from "@/components/global/TextInput.vue";
import SubmitFormButton from "@/components/global/SubmitFormButton.vue";
import { ref } from "vue";
import axios from "axios";
import Swal from "@/sweetalert2";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user-store";
const router = useRouter();
const userStore = useUserStore();
let title = ref(null);
let videoCode = ref(null);
let errors = ref([]);
const addVideoLink = async () => {
    errors.value = [];
    try {
        await axios.post("api/youtube", {
            user_id: userStore.id,
            title: title.value,
            url: videoCode.value,
        });
        Swal.fire(
            "New video added!",
            'You added a video with the name "' + title.value + '"',
            "success"
        );
        router.push("/account/profile/" + userStore.id);
    } catch (err) {
        errors.value = err.response.data.errors;
        console.log("err addYoutubeVideoLink", err);
    }
};
</script>

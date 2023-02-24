<template>
    <div class="relative z-10">
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div class="fixed inset-0 z-10 overflow-y-auto mt-6">
            <div class="flex min-h-full justify-center p-4 items-center py-2">
                <div
                    class="relative inset-0 z-10 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                    <!-- Modal content -->
                    <div class="relative rounded-lg shadow bg-gray-700">
                        <!-- Modal header -->
                        <div
                            class="flex items-start justify-between p-4 border-b rounded-t border-gray-600">
                            <h3 class="text-xl font-semibold text-white">
                                Crop Image
                            </h3>
                            <button
                                type="button"
                                @click="$emit('showModal', false)"
                                class="text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
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
                        </div>
                        <!-- Modal body -->
                        <div class="p-6 space-y-6">
                            <div class="flex flex-wrap my-4">
                                <label
                                    class="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2"
                                    >Select Image</label
                                >
                                <div class="mb-3 w-full">
                                    <input
                                        type="file"
                                        id="image"
                                        ref="fileInput"
                                        @change="getUploadedImage"
                                        class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-400 bg-white bg-clip-padding border border-solid border-gray-200 rounded transition ease-in-out m-0 focus:text-gray-900 focus:bg-gray-300" />
                                </div>
                            </div>
                            <div class="flex items-center justify-center">
                                <Cropper
                                    ref="cropper"
                                    :src="uploadedImage"
                                    :stencil-props="{
                                        minAspectRatioProp:
                                            minAspectRatioProp /
                                            minAspectRatioProp.height,
                                        maxAspectRatioProp:
                                            maxAspectRatioProp /
                                            maxAspectRatioProp.height,
                                    }"></Cropper>
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div
                            class="flex items-center p-6 space-x-2 border-t rounded-b border-gray-600">
                            <button
                                v-if="uploadedImage"
                                @click="crop"
                                type="button"
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-white text-base font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3">
                                Crop Image
                            </button>
                            <button
                                @click="$emit('showModal', false)"
                                type="button"
                                class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-white text-base font-medium shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ml-3">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, toRefs } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
const emit = defineEmits(["croppedImageData", "showModal"]);
const props = defineProps({
    minAspectRatioProp: Object,
    maxAspectRatioProp: Object,
});
const { minAspectRatioProp, maxAspectRatioProp } = toRefs(props);
let fileInput = ref(null);
let cropper = ref(null);
let uploadedImage = ref(null);
let croppedImageData = {
    file: null,
    imageUrl: null,
    height: null,
    width: null,
    left: null,
    top: null,
};
const getUploadedImage = (e) => {
    const file = e.target.files[0];
    uploadedImage.value = URL.createObjectURL(file);
};
const crop = () => {
    const { coordinates, canvas } = cropper.value.getResult();
    croppedImageData.file = fileInput.value.files[0];
    croppedImageData.imageUrl = canvas.toDataURL();
    croppedImageData.height = coordinates.height;
    croppedImageData.width = coordinates.width;
    croppedImageData.left = coordinates.left;
    croppedImageData.top = coordinates.top;
    emit("croppedImageData", croppedImageData);
    emit("showModal", false);
};
</script>

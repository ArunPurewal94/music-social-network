<template>
    <nav
        class="w-full px-4 bg-gray-800 border-gray-700 relative z-20 text-white-200">
        <div
            class="container mx-auto max-w-4xl h-16 flex justify-between text-xs md:text-sm">
            <div class="h-full flex items-center hover:opacity-75">
                <router-link to="/" class="flex justify-center items-center">
                    <div class="text-white text-2xl">
                        <font-awesome-icon
                            class="h-8 w-8 text-white mx-2"
                            icon="fa-solid fa-guitar" /><b>MSN</b>
                    </div>
                </router-link>
            </div>
            <div class="h-full flex items-center">
                <FullScreenModal />
            </div>
        </div>
    </nav>
</template>

<script setup>
import FullScreenModal from "./FullScreenModal.vue";
</script>

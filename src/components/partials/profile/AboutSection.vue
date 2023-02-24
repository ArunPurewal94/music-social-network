<template>
    <div class="py-2">
        <p class="text-center text-gray-900 text-lg font-bold">About Me</p>
        <p class="text-center text-md md:text-lg text-gray-600 leading-normal">
            {{ profileStore.description }}
        </p>
    </div>
</template>

<script setup>
import { useProfileStore } from "@/store/profile-store";
const profileStore = useProfileStore();
</script>
<style lang="scss"></style>

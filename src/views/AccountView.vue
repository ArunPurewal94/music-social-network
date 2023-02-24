<template>
    <TopNavigation />
    <div id="account-view" class="max-w-full px-8">
        <router-view />
    </div>
</template>

<style lang="scss"></style>

<script setup>
import TopNavigation from "@/components/static/TopNavigation.vue";
</script>

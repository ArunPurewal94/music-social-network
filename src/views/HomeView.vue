<template>
    <div class="home">
        <TopNavigation />
        <HomeSection />
        <FooterSection class="fixed bottom-0 w-full" />
    </div>
</template>

<script setup>
import TopNavigation from "@/components/static/TopNavigation.vue";
import FooterSection from "@/components/static/FooterSection.vue";
import HomeSection from "@/components/partials/HomeSection.vue";
</script>

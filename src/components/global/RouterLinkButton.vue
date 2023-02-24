<template>
  <router-link
    class="
      float-right
      bg-transparent
      font-semibold
      hover:text-white
      py-2
      px-4
      border
      hover:border-transparent
      rounded
    "
    :to="url"
    :class="[color ? 'text-' + color : '']"
  >
    {{ btnText }}
  </router-link>
</template>

<script setup>
import { defineProps, toRefs } from "vue";
const props = defineProps({
  btnText: String,
  url: { type: String, default: "" },
  color: String,
});
const { btnText, url, color } = toRefs(props);
</script>
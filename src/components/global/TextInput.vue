<template>
    <div class="w-full">
        <label
            :class="[labelColor ? 'text-gray-900' : 'text-gray-100']"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            >{{ label }}</label
        >
        <input
            :type="inputType"
            v-model="inputComputed"
            :placeholder="placeholder"
            class="appearance-none block w-full text-gray-700 border border-gray-400 rounded py-3 px-4 leading-tight focus:border-indigo-500 focus:ring-indigo-500" />
        <span v-if="error" class="text-red-400 font-bold">{{ error }}</span>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, toRefs, computed } from "vue";

const emit = defineEmits(["update:input"]);
const props = defineProps({
    label: String,
    labelColor: { type: Boolean, default: false },
    input: String,
    placeholder: { type: String, default: "" },
    inputType: String,
    error: String,
});

const { label, labelColor, input, placeholder, inputType, error } =
    toRefs(props);
const inputComputed = computed({
    get: () => input.value,
    set: (val) => emit("update:input", val),
});
</script>

<style lang="scss"></style>

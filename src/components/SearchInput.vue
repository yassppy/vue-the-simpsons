<template>
    <div class="form-control w-full max-w-xs mb-4">
        <input
            type="text"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
            placeholder="Filtrar por nombre..."
            class="input input-bordered w-full max-w-xs"
        />
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        default: "",
    },
});
defineEmits(["update:modelValue"]);
</script>

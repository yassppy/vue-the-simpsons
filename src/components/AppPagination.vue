<template>
    <div class="flex justify-center items-center gap-2 my-6">
        <button
            class="btn btn-sm"
            :disabled="currentPage <= 1"
            @click="$emit('page-change', currentPage - 1)"
        >
            Anterior
        </button>
        <span class="text-sm font-medium">
            Página {{ currentPage }} de {{ totalPages }}
        </span>
        <button
            class="btn btn-sm"
            :disabled="currentPage >= totalPages"
            @click="$emit('page-change', currentPage + 1)"
        >
            Siguiente
        </button>
    </div>
</template>

<script setup>
defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalPages: {
        type: Number,
        required: true,
    },
});

defineEmits(["page-change"]);
</script>

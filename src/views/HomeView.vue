<template>
    <div class="hero min-h-[70vh] bg-base-200 rounded-box my-4">
        <div class="hero-content text-center">
            <div class="max-w-md">
                <h1 class="text-4xl font-bold">Curso Vue.js 3</h1>
                <p class="py-6">
                    Aplicación SPA desarrollada con Vue.js, Vite, Bun y Tailwind
                    CSS / DaisyUI, consumiendo The Simpsons API.
                </p>
                <RouterLink to="/simpsons" class="btn btn-primary">
                    Ir al módulo Simpsons
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

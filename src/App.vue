<template>
    <div class="min-h-screen flex flex-col bg-base-100 text-base-content">
        <AppNavbar />
        <main class="flex-1 container mx-auto p-4">
            <RouterView />
        </main>
        <AppFooter />
    </div>
</template>

<script setup>
import AppNavbar from "./components/AppNavbar.vue";
import AppFooter from "./components/AppFooter.vue";
</script>

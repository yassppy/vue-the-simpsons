<template>
    <header class="navbar bg-base-100 shadow-sm px-4">
        <div class="flex-1">
            <RouterLink to="/" class="btn btn-ghost text-xl font-bold"
                >Simpsons App</RouterLink
            >
        </div>
        <div class="flex-none">
            <ul class="menu menu-horizontal px-1 font-medium">
                <li><RouterLink to="/">Inicio</RouterLink></li>
                <li><RouterLink to="/simpsons">Simpsons</RouterLink></li>
            </ul>
        </div>
    </header>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

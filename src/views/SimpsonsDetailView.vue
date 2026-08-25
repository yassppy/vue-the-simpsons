<template>
    <div class="min-h-screen bg-base-100 pb-12">
        <!-- Estado de carga -->
        <LoadingSpinner v-if="isLoading" />

        <!-- Estado de error -->
        <div v-else-if="errorMessage" class="p-4">
            <div class="alert alert-error shadow-sm">
                <span>{{ errorMessage }}</span>
            </div>
        </div>

        <!-- Detalle principal -->
        <div v-else-if="character" class="flex flex-col">
            <!-- SECCIÓN SUPERIOR -->
            <div class="pt-6 pb-6 px-4 flex flex-col items-center">
                <div class="w-full max-w-xl mb-6">
                    <RouterLink
                        to="/simpsons"
                        class="btn btn-sm btn-ghost font-bold opacity-80 hover:opacity-100"
                    >
                        ← Volver al listado
                    </RouterLink>
                </div>

                <!-- Círculo de perfil con el fondo azul clásico de Los Simpson y ajustado a la imagen -->
                <div
                    class="w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-[#5bc5f2] flex items-center justify-center overflow-hidden mb-4 shadow-md"
                >
                    <img
                        :src="`https://cdn.thesimpsonsapi.com/500${character.portrait_path}`"
                        :alt="character.name"
                        class="object-contain w-full h-full p-1"
                        @error="
                            $event.target.src =
                                'https://via.placeholder.com/300?text=Sin+Imagen'
                        "
                    />
                </div>

                <!-- Nombre del personaje -->
                <h1
                    class="text-3xl sm:text-4xl font-black text-center tracking-tight"
                >
                    {{ character.name }}
                </h1>
            </div>

            <!-- SECCIÓN INFERIOR: Contenido fluido -->
            <div class="w-full max-w-xl mx-auto px-6 py-4 space-y-6">
                <!-- Datos Principales -->
                <div class="space-y-2">
                    <h2
                        class="text-xs uppercase tracking-widest opacity-50 font-bold"
                    >
                        Información del Personaje
                    </h2>
                    <div
                        class="grid grid-cols-2 gap-4 text-sm sm:text-base font-medium"
                    >
                        <div>
                            <span class="opacity-50 block text-xs">Edad</span>
                            {{ character.age || "No especificada" }}
                        </div>
                        <div>
                            <span class="opacity-50 block text-xs">Género</span>
                            {{ character.gender || "No especificado" }}
                        </div>
                        <div>
                            <span class="opacity-50 block text-xs">Estado</span>
                            {{ character.status || "Desconocido" }}
                        </div>
                        <div>
                            <span class="opacity-60 block text-xs"
                                >Ocupación</span
                            >
                            {{ character.occupation || "No especificada" }}
                        </div>
                    </div>
                </div>

                <div class="divider my-2 opacity-25"></div>

                <!-- Storyline / Descripción -->
                <div v-if="character.description" class="space-y-2">
                    <h2
                        class="text-xs uppercase tracking-widest opacity-50 font-bold"
                    >
                        Storyline
                    </h2>
                    <p class="opacity-85 text-sm sm:text-base leading-relaxed">
                        {{ character.description }}
                    </p>
                </div>

                <!-- Frases Célebres -->
                <div
                    v-if="character.phrases && character.phrases.length > 0"
                    class="space-y-3 pt-2"
                >
                    <h2
                        class="text-xs uppercase tracking-widest opacity-50 font-bold"
                    >
                        Frases Célebres
                    </h2>
                    <ul class="space-y-2 text-sm sm:text-base">
                        <li
                            v-for="(phrase, index) in character.phrases"
                            :key="index"
                            class="italic opacity-80"
                        >
                            "{{ phrase }}"
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { simpsonsService } from "../services/simpsonsService";
import { getErrorMessage } from "../helpers/errorHelper";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const route = useRoute();
const character = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");

onMounted(async () => {
    try {
        const id = route.params.id;
        const data = await simpsonsService.getCharacterById(id);
        character.value = data.result || data;
    } catch (error) {
        errorMessage.value = getErrorMessage(error);
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 1000);
    }
});
</script>

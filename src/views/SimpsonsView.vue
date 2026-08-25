<template>
    <div class="space-y-6">
        <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
            <h1 class="text-3xl font-bold">Personajes de Los Simpsons</h1>
            <!-- Componente buscador reutilizable -->
            <SearchInput v-model="searchQuery" />
        </div>

        <!-- Estado de carga -->
        <LoadingSpinner v-if="isLoading" />

        <!-- Estado de error: Con el mensaje exacto de red y la imagen desde public -->
        <div
            v-else-if="errorMessage"
            class="min-h-[60vh] bg-white text-neutral flex flex-col items-center justify-center px-4 py-12 rounded-2xl shadow-sm border border-gray-100"
        >
            <div
                class="max-w-4xl w-full flex flex-col md:flex-row items-center justify-between gap-12"
            >
                <!-- Lado Izquierdo: Texto D'OH! y mensaje de error de red -->
                <div class="flex flex-col items-start space-y-4 text-left">
                    <h1
                        class="text-7xl md:text-8xl font-black tracking-tighter text-black"
                    >
                        D'OH!
                    </h1>
                    <p
                        class="text-gray-500 text-sm md:text-base max-w-xs leading-relaxed"
                    >
                        {{ errorMessage }}
                    </p>
                    <button
                        @click="fetchCharacters(currentPage)"
                        class="btn bg-black hover:bg-gray-800 text-white border-none rounded-full px-6 mt-2 shadow-md transition-transform active:scale-95"
                    >
                        Reintentar 🔄
                    </button>
                </div>

                <!-- Lado Derecho: El número 4 [Imagen] 4 animado -->
                <div class="flex items-center justify-center select-none">
                    <span
                        class="text-8xl md:text-9xl font-black text-black tracking-widest"
                        >4</span
                    >

                    <!-- Contenedor de la imagen con animación flotante -->
                    <div
                        class="relative mx-2 w-28 h-36 md:w-36 md:h-48 flex items-center justify-center animate-bounce duration-1000"
                    >
                        <img
                            src="/homer_404.png"
                            alt="D'oh 404"
                            class="w-full h-full object-contain drop-shadow-md"
                        />
                    </div>

                    <span
                        class="text-8xl md:text-9xl font-black text-black tracking-widest"
                        >4</span
                    >
                </div>
            </div>
        </div>

        <!-- Contenido principal -->
        <template v-else>
            <!-- Si hay resultados filtrados -->
            <div v-if="filteredCharacters.length > 0">
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                    <div
                        v-for="character in filteredCharacters"
                        :key="character.id"
                        class="card bg-base-200 shadow-md hover:shadow-xl transition-shadow flex flex-col"
                    >
                        <figure
                            class="px-4 pt-4 h-48 bg-base-300 flex items-center justify-center overflow-hidden"
                        >
                            <img
                                :src="`https://cdn.thesimpsonsapi.com/200${character.portrait_path}`"
                                :alt="character.name"
                                class="object-contain h-full w-full"
                                @error="
                                    $event.target.src =
                                        'https://via.placeholder.com/150?text=Sin+Imagen'
                                "
                            />
                        </figure>
                        <div
                            class="card-body flex-1 flex flex-col justify-between"
                        >
                            <div>
                                <h2 class="card-title text-lg">
                                    {{ character.name }}
                                </h2>
                                <p class="text-sm opacity-80 line-clamp-2 mt-1">
                                    {{
                                        character.occupation ||
                                        "Ocupación no especificada"
                                    }}
                                </p>
                            </div>
                            <div class="card-actions justify-end mt-4">
                                <RouterLink
                                    :to="`/simpsons/${character.id}`"
                                    class="btn btn-primary btn-sm"
                                >
                                    Ver detalle
                                </RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Paginación -->
                <AppPagination
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    @page-change="changePage"
                />
            </div>

            <!-- Estado sin resultados en el filtro -->
            <EmptyResults v-else />
        </template>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { simpsonsService } from "../services/simpsonsService";
import { getErrorMessage } from "../helpers/errorHelper";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import SearchInput from "../components/SearchInput.vue";
import AppPagination from "../components/AppPagination.vue";
import EmptyResults from "../components/EmptyResults.vue";

const characters = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const isLoading = ref(false);
const errorMessage = ref("");
const searchQuery = ref("");

const fetchCharacters = async (page) => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
        const data = await simpsonsService.getCharacters(page);
        characters.value = data.results || [];
        totalPages.value = data.pages || 1;
        currentPage.value = page;
    } catch (error) {
        // Recupera el mensaje mediante tu helper original
        errorMessage.value = getErrorMessage(error);
    } finally {
        setTimeout(() => {
            isLoading.value = false;
        }, 600);
    }
};

// Filtro local por nombre sobre los registros de la página actual
const filteredCharacters = computed(() => {
    if (!searchQuery.value.trim()) return characters.value;
    const query = searchQuery.value.toLowerCase();
    return characters.value.filter((char) =>
        char.name.toLowerCase().includes(query),
    );
});

const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value) {
        searchQuery.value = ""; // Restablece el filtro al cambiar de página
        fetchCharacters(newPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
};

onMounted(() => {
    fetchCharacters(1);
});
</script>

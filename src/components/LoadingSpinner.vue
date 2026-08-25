<template>
    <!-- Fondo completo estilo Simpson con padding horizontal y centrado estricto -->
    <div
        class="loading-container fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#FFDE00] px-4 text-center"
    >
        <!-- Imagen de la dona que gira -->
        <img
            src="/dona.png"
            alt="Dona giratoria"
            class="donut-spin w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain mb-6 drop-shadow-2xl"
        />
        <!-- Mensaje de carga responsivo (texto más pequeño en móvil para que no se corte) -->
        <p
            class="text-base sm:text-xl md:text-2xl font-black text-black tracking-wider uppercase animate-pulse max-w-xs sm:max-w-md"
        >
            ¡Cargando datos de Springfield!
        </p>
    </div>
</template>

<style scoped>
.loading-container {
    background-color: #ffde00 !important;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.donut-spin {
    animation: spin 2s linear infinite;
}

@keyframes pulse {
    50% {
        opacity: 0.5;
    }
}
.animate-pulse {
    animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { getApiUrl } from '../config/api'

const router = useRouter()

onMounted(async () => {
    const API_URL = await getApiUrl()
    console.log(API_URL)
})
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white flex flex-col items-center justify-center px-4">

        <div class="text-center max-w-md">
            <div class="text-6xl mb-6">📒</div>
            <h1 class="text-4xl font-bold text-white mb-3">Mi Agenda</h1>
            <p class="text-gray-400 text-lg mb-10">Gestiona tus contactos de forma fácil y rápida</p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    @click="router.push('/login')"
                    class="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-3 rounded-lg transition"
                >
                    Iniciar sesión
                </button>
                <button
                    @click="router.push('/registro')"
                    class="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-3 rounded-lg border border-gray-700 transition"
                >
                    Crear cuenta
                </button>
            </div>
        </div>

    </div>
</template>
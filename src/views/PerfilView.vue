<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getApiUrl } from '../config/api'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const nombre_de_usuario = ref('')
const foto = ref(null)
const preview = ref('')
const fotoActual = ref('')

async function obtenerPerfil() {
    const API_URL = await getApiUrl()
    const response = await fetch(`${API_URL}/auth/perfil.php`, {
        headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await response.json()
    if (data.success) {
        nombre_de_usuario.value = data.usuario.nombre_de_usuario
        fotoActual.value = data.usuario.foto
    }
}

function seleccionarFoto(event) {
    const file = event.target.files[0]
    foto.value = file
    if (file) preview.value = URL.createObjectURL(file)
}

async function actualizarPerfil() {
    const API_URL = await getApiUrl()
    const formData = new FormData()
    formData.append('nombre_de_usuario', nombre_de_usuario.value)
    formData.append('foto', foto.value)
    const response = await fetch(`${API_URL}/auth/editar.php`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
        body: formData
    })
    const data = await response.json()
    if (data.success) {
        alert('Perfil actualizado')
        obtenerPerfil()
        preview.value = ''
    }
}

onMounted(() => obtenerPerfil())
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white">

        <!-- Navbar -->
        <nav class="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold text-violet-400">📒 Mi Agenda</h1>
            <button
                @click="router.push('/agenda')"
                class="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
            >
                ← Volver
            </button>
        </nav>

        <!-- Contenido -->
        <div class="max-w-lg mx-auto px-6 py-10">
            <h2 class="text-2xl font-bold text-white mb-1">Mi perfil</h2>
            <p class="text-gray-400 mb-8">Actualiza tu información personal</p>

            <!-- Foto de perfil -->
            <div class="flex justify-center mb-8">
                <div class="relative">
                    <img
                        v-if="preview"
                        :src="preview"
                        class="w-28 h-28 rounded-full object-cover border-4 border-violet-500"
                    />
                    <img
                        v-else-if="fotoActual"
                        :src="fotoActual"
                        class="w-28 h-28 rounded-full object-cover border-4 border-violet-500"
                    />
                    <div
                        v-else
                        class="w-28 h-28 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center text-4xl"
                    >
                        👤
                    </div>
                    <label class="absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-700 rounded-full p-2 cursor-pointer transition">
                        <span class="text-xs">✏️</span>
                        <input type="file" class="hidden" @change="seleccionarFoto" accept="image/*" />
                    </label>
                </div>
            </div>

            <!-- Card info -->
            <div class="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
                <p class="text-gray-400 text-sm mb-1">Usuario actual</p>
                <p class="text-white text-lg font-semibold">{{ nombre_de_usuario }}</p>
            </div>

            <div class="space-y-5">
                <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Nuevo nombre de usuario</label>
                    <input
                        v-model="nombre_de_usuario"
                        placeholder="Tu nombre de usuario"
                        class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                    />
                </div>

                <button
                    @click="actualizarPerfil"
                    class="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Guardar cambios
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { getApiUrl } from '../config/api'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const contactos = ref([])

async function obtenerContactos() {
    const API_URL = await getApiUrl()
    const response = await fetch(`${API_URL}/contactos/index.php`, {
        headers: { Authorization: `Bearer ${auth.token}` }
    })
    const data = await response.json()
    if (data.success) contactos.value = data.contactos
}

function cerrarSesion() {
    auth.logout()
    router.push('/login')
}

async function eliminarContacto(id) {
    if (!confirm('¿Eliminar contacto?')) return
    const API_URL = await getApiUrl()
    const response = await fetch(`${API_URL}/contactos/eliminar.php`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.token}`
        },
        body: JSON.stringify({ id })
    })
    const data = await response.json()
    if (data.success) {
        alert(data.message)
        obtenerContactos()
    }
}

onMounted(() => obtenerContactos())
</script>

<template>
    <div class="min-h-screen bg-gray-950 text-white">

        <!-- Navbar -->
        <nav class="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <h1 class="text-xl font-bold text-violet-400">📒 Mi Agenda</h1>
            <div class="flex gap-3">
                <RouterLink
                    to="/agenda/crear"
                    class="bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    + Nuevo contacto
                </RouterLink>
                <RouterLink
                    to="/perfil"
                    class="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    Mi perfil
                </RouterLink>
                <button
                    @click="cerrarSesion"
                    class="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>

        <!-- Contenido -->
        <div class="max-w-4xl mx-auto px-6 py-8">

            <p v-if="contactos.length === 0" class="text-gray-500 text-center mt-20 text-lg">
                No tienes contactos aún. ¡Crea el primero!
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div
                    v-for="contacto in contactos"
                    :key="contacto.id"
                    class="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex gap-4 items-start hover:border-violet-600 transition"
                >
                    <!-- Foto -->
                    <img
                        v-if="contacto.foto"
                        :src="`http://localhost/agenda-backend/api/uploads/contactos/${contacto.foto}`"
                        class="w-16 h-16 rounded-full object-cover border-2 border-violet-500"
                    />
                    <div
                        v-else
                        class="w-16 h-16 rounded-full bg-violet-700 flex items-center justify-center text-2xl font-bold"
                    >
                        {{ contacto.nombre.charAt(0).toUpperCase() }}
                    </div>

                    <!-- Info -->
                    <div class="flex-1">
                        <h3 class="text-white font-semibold text-lg">{{ contacto.nombre }}</h3>
                        <p class="text-gray-400 text-sm">📞 {{ contacto.telefono }}</p>
                        <p v-if="contacto.email" class="text-gray-400 text-sm">✉️ {{ contacto.email }}</p>

                        <div class="flex gap-2 mt-3">
                            <RouterLink
                                :to="`/agenda/${contacto.id}`"
                                class="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg transition"
                            >
                                Editar
                            </RouterLink>
                            <button
                                @click="eliminarContacto(contacto.id)"
                                class="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1.5 rounded-lg transition"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
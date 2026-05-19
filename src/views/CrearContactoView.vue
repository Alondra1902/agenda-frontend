<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getApiUrl } from '../config/api'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const nombre = ref('')
const telefono = ref('')
const email = ref('')
const foto = ref(null)
const preview = ref(null)

async function crearContacto() {
    if (!nombre.value || !telefono.value) {
        alert('Nombre y teléfono obligatorios')
        return
    }
    if (email.value && !email.value.includes('@')) {
        alert('Email inválido')
        return
    }
    const API_URL = await getApiUrl()
    const formData = new FormData()
    formData.append('nombre', nombre.value)
    formData.append('telefono', telefono.value)
    formData.append('email', email.value)
    formData.append('foto', foto.value)
    const response = await fetch(`${API_URL}/contactos/crear.php`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
        body: formData
    })
    const data = await response.json()
    if (data.success) {
        alert('Contacto creado')
        router.push('/agenda')
    } else {
        alert(data.message)
    }
}

function seleccionarFoto(event) {
    const file = event.target.files[0]
    foto.value = file
    if (file) preview.value = URL.createObjectURL(file)
}
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

        <!-- Formulario -->
        <div class="max-w-lg mx-auto px-6 py-10">
            <h2 class="text-2xl font-bold text-white mb-1">Nuevo contacto</h2>
            <p class="text-gray-400 mb-8">Completa la información del contacto</p>

            <!-- Preview foto -->
            <div class="flex justify-center mb-8">
                <div class="relative">
                    <img
                        v-if="preview"
                        :src="preview"
                        class="w-24 h-24 rounded-full object-cover border-4 border-violet-500"
                    />
                    <div
                        v-else
                        class="w-24 h-24 rounded-full bg-gray-800 border-4 border-gray-700 flex items-center justify-center text-gray-500 text-3xl"
                    >
                        📷
                    </div>
                    <label class="absolute bottom-0 right-0 bg-violet-600 hover:bg-violet-700 rounded-full p-1.5 cursor-pointer transition">
                        <span class="text-xs">✏️</span>
                        <input type="file" class="hidden" @change="seleccionarFoto" accept="image/*" />
                    </label>
                </div>
            </div>

            <div class="space-y-5">
                <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Nombre <span class="text-red-400">*</span></label>
                    <input
                        v-model="nombre"
                        placeholder="Nombre del contacto"
                        class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                    />
                </div>

                <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Teléfono <span class="text-red-400">*</span></label>
                    <input
                        v-model="telefono"
                        placeholder="Número de teléfono"
                        class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                    />
                </div>

                <div>
                    <label class="block text-gray-300 text-sm font-medium mb-2">Email</label>
                    <input
                        v-model="email"
                        placeholder="correo@ejemplo.com"
                        class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                    />
                </div>

                <button
                    @click="crearContacto"
                    class="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition mt-2"
                >
                    Crear contacto
                </button>
            </div>
        </div>
    </div>
</template>
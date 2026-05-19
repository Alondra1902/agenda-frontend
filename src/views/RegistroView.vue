<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getApiUrl } from '../config/api'

const router = useRouter()
const nombre_de_usuario = ref('')
const password = ref('')

async function registrar() {
    if (!nombre_de_usuario.value || !password.value) {
        alert('Completa todos los campos')
        return
    }
    if (password.value.length < 6) {
        alert('La contraseña debe tener mínimo 6 caracteres')
        return
    }
    const API_URL = await getApiUrl()
    const response = await fetch(`${API_URL}/auth/registrar.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_de_usuario: nombre_de_usuario.value,
            password: password.value
        })
    })
    const data = await response.json()
    if (data.success) {
        alert('Usuario registrado')
        router.push('/login')
    } else {
        alert(data.message)
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">

            <h1 class="text-3xl font-bold text-white text-center mb-2">Crear cuenta</h1>
            <p class="text-gray-400 text-center mb-8">Regístrate para comenzar</p>

            <div class="mb-5">
                <label class="block text-gray-300 text-sm font-medium mb-2">Usuario</label>
                <input
                    v-model="nombre_de_usuario"
                    placeholder="Elige un nombre de usuario"
                    class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                />
            </div>

            <div class="mb-7">
                <label class="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                />
            </div>

            <button
                @click="registrar"
                class="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition"
            >
                Registrarse
            </button>

            <p class="text-center text-gray-500 text-sm mt-6">
                ¿Ya tienes cuenta?
                <a href="/login" class="text-violet-400 hover:underline">Inicia sesión</a>
            </p>

        </div>
    </div>
</template>
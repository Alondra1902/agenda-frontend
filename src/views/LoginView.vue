<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getApiUrl } from '../config/api'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const nombre_de_usuario = ref('')
const password = ref('')

async function login() {
    const API_URL = await getApiUrl()
    const response = await fetch(`${API_URL}/auth/login.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre_de_usuario: nombre_de_usuario.value,
            password: password.value
        })
    })
    const data = await response.json()
    if (data.success) {
        auth.setAuth(data.token, data.usuario)
        alert('Login correcto')
        router.push('/agenda')
    } else {
        alert(data.message)
    }
}
</script>

<template>
    <div class="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div class="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8 border border-gray-800">

            <h1 class="text-3xl font-bold text-white text-center mb-2">Bienvenido</h1>
            <p class="text-gray-400 text-center mb-8">Inicia sesión en tu cuenta</p>

            <div class="mb-5">
                <label class="block text-gray-300 text-sm font-medium mb-2">Usuario</label>
                <input
                    v-model="nombre_de_usuario"
                    placeholder="Tu nombre de usuario"
                    class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                />
            </div>

            <div class="mb-7">
                <label class="block text-gray-300 text-sm font-medium mb-2">Contraseña</label>
                <input
                    v-model="password"
                    type="password"
                    placeholder="Tu contraseña"
                    class="w-full bg-gray-800 text-white placeholder-gray-500 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-violet-500 transition"
                />
            </div>

            <button
                @click="login"
                class="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-lg transition"
            >
                Iniciar sesión
            </button>

            <p class="text-center text-gray-500 text-sm mt-6">
                ¿No tienes cuenta?
                <a href="/registro" class="text-violet-400 hover:underline">Regístrate</a>
            </p>

        </div>
    </div>
</template>
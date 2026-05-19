import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import AgendaView from '../views/AgendaView.vue'
import CrearContactoView from '../views/CrearContactoView.vue'
import EditarContactoView from '../views/EditarContactoView.vue'
import PerfilView from '../views/PerfilView.vue'

import { useAuthStore } from '../stores/auth'

const router = createRouter({

    history: createWebHistory(),

    routes: [

        {
            path: '/',
            component: HomeView
        },

        {
            path: '/login',
            component: LoginView
        },

        {
            path: '/registro',
            component: RegistroView
        },

        {
            path: '/agenda',
            component: AgendaView,
            meta: { requiresAuth: true }
        },

        {
            path: '/agenda/crear',
            component: CrearContactoView,
            meta: { requiresAuth: true }
        },

        {
            path: '/agenda/:id',
            component: EditarContactoView,
            meta: { requiresAuth: true }
        },

        {
            path: '/perfil',
            component: PerfilView,
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to, from, next) => {

    const auth = useAuthStore()

    if(
        to.meta.requiresAuth &&
        !auth.token
    ) {

        next('/login')

        return
    }

    next()
})

export default router
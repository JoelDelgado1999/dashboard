<template>
    <v-app id="inspire">
        <v-navigation-drawer expand-on-hover rail>
            <v-list color="secondary">
                <v-list-item :prepend-avatar="userStore.user.image" :title="userStore.user.name"
                    :subtitle="userStore.user.email"> </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact" nav class="mt-5">
                <v-list-item class="item-hover" v-for="routeLink in routeLinks" v-bind:key="routeLink.id" rounded="xl"
                    active-color="primary" @click="pushRoute(routeLink.route)" :title="routeLink.title">
                    <template v-slot:prepend>
                        <v-icon :icon="routeLink.icon" :color="routeLink.color"> {{ routeLink.icon }}</v-icon>
                    </template>
                </v-list-item>
                <v-list-group value="Reportes">
                    <template v-slot:activator="{ props }">
                        <v-list-item v-bind="props" prepend-icon="mdi-chart-line" title="Reportes"></v-list-item>
                    </template>

                    <v-list-item v-for="routeLink in routeLinksGroup" v-bind:key="routeLink.id"  @click="pushRoute(routeLink.route)" style="font-size: 13px">
                        {{ routeLink.title }}
                    </v-list-item>
                </v-list-group>
            </v-list>
            <template v-slot:append>

                <v-list-item @click="signOut()" color="red" class="item-hover" prepend-icon="mdi-close-thick"
                    title="Cerrar Sesión"></v-list-item>
            </template>
        </v-navigation-drawer>

        <v-main>
            <v-container class="py-8 px-6" fluid>
                <RouterView></RouterView>
            </v-container>
        </v-main>
    </v-app>
</template>
<script lang="ts" setup>
import { useAppStore } from "@/store/app"
import { onMounted } from 'vue'
import router from '@/router'
import IUserProfile from '@/types/IUserProfile'

const routeLinks = [
    {
        id: 1,
        icon: 'mdi-recycle',
        title: 'Centro de Acopio',
        route: 'centroacopio',
        color: 'green',
        list: []
    },
    {
        id: 2,
        icon: 'mdi-view-list',
        title: 'Solicitudes de recolección',
        route: 'ordenes',
        color: 'orange',
        list: []

    },
    {
        id: 3,
        icon: 'mdi-gift-outline',
        title: 'Premios',
        route: 'premios',
        color: 'green',
        list: []


    },
    {
        id: 4,
        icon: 'mdi-list-box',
        title: 'Solicitudes de premio',
        route: 'orderpremios',
        color: 'orange',
        list: []
    }

]
const routeLinksGroup = [
    {
        id: 5,
        icon: 'mdi-list-box',
        title: 'Informe solicitudes',
        route: 'information',
        color: 'green',
    }
    ,
    {
        id: 6,
        icon: 'mdi-list-box',
        title: 'Premios entregados',
        route: 'reportproduct',
        color: 'green',
    }
    ,
    {
        id: 7,
        icon: 'mdi-list-box',
        title: 'Recolectados',
        route: 'reportcentroacopio',
        color: 'green',
    }
]
const userStore = useAppStore()

const pushRoute = (route: string) => {
    router.push({ name: route })
}

const signOut = () => {
    localStorage.removeItem('token')
    userStore.user.name = '';
    userStore.user.session_token = '';
    userStore.user.email = '';
    router.push({ name: 'login' })
}
onMounted(() => {
    const user: IUserProfile = JSON.parse(localStorage.getItem('user_data') || '')
    console.log(user)
    userStore.setUser(user);
})


</script>

<style>
.item-hover:hover {
    background-color: rgb(172, 170, 170);
    cursor: pointer;
}
</style>
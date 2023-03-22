<template>
    <v-content>
        <div >
            <v-row class="ma-6 pa-6 align-center" style="height:500px">
                <v-col cols="6" class="mx-auto">
                    <v-img src="https://cdn0.ecologiaverde.com/es/posts/3/0/3/como_ensenar_a_los_ninos_a_reciclar_la_basura_1303_600_square.jpg"></v-img>
                </v-col>
                <v-col cols="12" md="6" class="pa-6">
                    <v-row>
                        <v-col cols="12 " col="3" class="pa-6">
                            <h1 class="display-4 text-sm-center">Procefibras</h1>

                            <v-card class="elevation-12">
                                <v-toolbar dark color="green">
                                    <v-toolbar-title>Inicia sesión</v-toolbar-title>
                                </v-toolbar>
                                <v-card-text>
                                    <v-form>
                                        <v-text-field prepend-icon="person" name="login" label="Correo electrónico"
                                            v-model="loginForm.name" type="text"></v-text-field>
                                        <v-text-field id="password" prepend-icon="lock" name="password" label="Contraseña"
                                            v-model="loginForm.password" type="password"></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" @click="loginEvent">Login</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>

                </v-col>
            </v-row>
        </div>
    </v-content>
    <v-row class="">
        <v-alert :title="alert.title" :text="alert.message" type="error" v-show="alert.show"></v-alert>

    </v-row>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import AuthenticationService from "../../services/AuthenticationService"
import { useAppStore } from "@/store/app"
import IResponse from "@/types/IResponse"
import router from '@/router';

const userStore = useAppStore()

const loginForm = ref({
    name: "",
    password: "",
});

const loginEvent = async () => {
    const response: IResponse = await AuthenticationService.login({ email: loginForm.value.name, password: loginForm.value.password })
    console.log(response)
    if (response.success) {
        userStore.setUser({
            name: response.data!.name,
            session_token: response.data!.session_token,
            email: response.data!.email,
            id: response.data!.id,
            image: response.data!.image
        })
        router.push({ name: 'dashboard' })
    } else {
        showAlert(response.message, 'Error en la autenticación')
    }

}

const alert = reactive({
    message: '',
    title: '',
    show: false
})
const showAlert = (message: string, title: string) => {
    alert.message = message
    alert.title = title
    alert.show = true
    setTimeout(() => {
        alert.show = false
    }, 2500);
}
</script>

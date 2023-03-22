<template>
    <div>
        <v-card v class="my-4">
            <v-row no-glutters>
                <v-col cols="8">
                    <div class="text-h3 pa-6">Solicitudes de Recolección</div>
                </v-col>

            </v-row>
        </v-card>
        <v-data-table :headers="headers" :items="orders">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="x-large" widt="200" class="me-2" color="warning" @click="showDetailsOrder(item.props.title)">
                    mdi-eye
                </v-icon>
            </template>
            <template v-slot:[`item.evidencia`]="{ item }">
                <v-avatar :image="item.props.title.evidencia" size="50" class="mt-1 mb-1"></v-avatar>
            </template>
            <template v-slot:[`item.date`]="{ item }">
                    {{ new Date( item.raw.created_at).toDateString()}}
            </template>
        </v-data-table>
    </div>
    <v-row justify="center">
        <v-dialog v-model="dialogDetail" width="1024">
            <v-card>
                <v-card-title class="text-sm-center">
                    <span class="text-h5 ">DETALLE DE LA SOLICITUD</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-img :src="order.evidencia == '' ? '' : order.evidencia" cover height="400px"></v-img>
                            </v-col>

                            <v-col cols="6">
                                <div class="text-h6 pa-1">Nombre Centro de Acopio: </div>
                                <div class="text-h7 pa-1"> {{ order.client == null ? '' : order.client.name }}</div>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-h6 pa-1">Dueño: </div>
                                <div class="text-h7 pa-1">{{ order.client == null ? '' : order.client.lastname }} </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-h6 pa-1">Cantidad (KG):</div>
                                <div class="text-h7 pa-1"> {{ order.client == null ? '' : order.cantidad_aprox }} </div>
                            </v-col>
                            <v-col cols="6">
                                <div class="text-h6 pa-1">Observación</div>
                                <v-text-field v-model="order.observation" required></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue-darken-1" variant="outlined" @click="dialogDetail = false">
                        Cerrar
                    </v-btn>
                    <v-btn color="red-accent-4" variant="outlined" @click="denyOrder">
                        Rechazar
                    </v-btn>
                    <v-btn color="green" variant="outlined" @click="acceptOrder">
                        Aceptar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
    <v-alert :title="alert.title" :text="alert.message" v-show="alert.show"></v-alert>
</template>
<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import OrderService from "@/services/OrderService"
import IOrder from "@/types/IOrder";
import { useAppStore } from "@/store/app";
const order: IOrder = reactive({
    status: '',
    evidencia: '',
    cantidad_aprox: 0,
    id: 0,
    observation: ''
})

const appStore = useAppStore()
const orders: any = ref([])
const dialogDetail = ref(false)
const headers = [
    {
        title: 'Foto Evidencia', text: 'fotoEvidencia', key: 'evidencia',
        align: 'center',
    },
    {
        title: 'Centro de Acopio',
        text: 'Centro de Acopio',
        align: 'left',
        sortable: false,
        value: 'client.name'
    },
    {
        title: 'Estado', text: 'status', value: 'status'
    },
    { title: 'Materia recolectado', text: 'evidencia', value: 'nombre_evidencia' },
    { title: 'Fecha de Solicitud', text: 'Descripción', value: 'created_at', key: 'date' },
    { title: 'Cantidad (KG)', text: 'Teléfono', value: `cantidad_aprox`, align: 'end' },
    { title: 'Acciones', key: 'actions', sortable: false },
]

const getOrders = async () => {
    const response = await OrderService.getByStatus('EN ESPERA')
    orders.value = response
    console.log(response)
}

const showDetailsOrder = (orderDetail: IOrder) => {
    order.client = orderDetail.client
    order.empresa = { id: 0, name: '' }
    dialogDetail.value = true
    order.cantidad_aprox = orderDetail.cantidad_aprox
    order.evidencia = orderDetail.evidencia
    order.id = orderDetail.id
    order.empresa.id = appStore.user.id || 0
    order.observation = orderDetail.observation
}

const acceptOrder = async () => {
    const response = await OrderService.accept(order)
    if (response.success) {
        dialogDetail.value = false
        getOrders()
    } else {
        console.log('hola')
    }
}

const denyOrder = async () => {
    const response = await OrderService.deny(order)
    if (response.success) {
        dialogDetail.value = false
        getOrders()
    } else {
        console.log('hola')

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
    }, 1500);
}
// showAlert( 'error mensaje', 'error')

onMounted(() => {
    getOrders()
})



</script>


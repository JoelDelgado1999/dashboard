<template>
    <div>
        <v-card v class="my-4">
            <v-row no-glutters>
                <v-col cols="8">
                    <div class="text-h3 pa-6">Solicitudes de premio</div>
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
                    {{ new Date( item.raw.date_create).toDateString()  }}
            </template>
            <template v-slot:[`item.client_name`]="{ item }">
                    {{ item.raw.user_name.charAt(0).toUpperCase()+ item.raw.user_name.slice(1)  }}
            </template>
        </v-data-table>
    </div>
    <v-row justify="center">
        <v-dialog v-model="dialogDetail" width="1024">
            <v-card>
                <v-card-title class="text-center ">
                    <h2 class="pt-2">INFORMACIÓN DE PREMIO</h2>
                </v-card-title>
                <v-card-text style="padding: 0">
                    <v-container>
                        <v-row class="justify-center pl-5">
                            <v-col cols="6">

                                    <h2 class="mb-3 "> Premio</h2>
                                <v-row>
                                    <v-col cols="5">
                                        <h4> Nombre:</h4>
                                    </v-col>
                                    <v-col cols="7 align-start"> {{ productOrder.productName }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="5">
                                        <h4> Puntos: </h4>
                                    </v-col>
                                    <v-col cols="7 align-start"> {{ productOrder.price }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="5">
                                        <h4> Stock: </h4>
                                    </v-col>
                                    <v-col cols="7 align-start"> {{ productOrder.stock }}
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="5">
                                        <h4> Descripción: </h4>
                                    </v-col>
                                    <v-col cols="7 align-start"> {{ productOrder.description }}
                                    </v-col>
                                </v-row>
                                <v-img :src="productOrder.productPhoto" class="mt-4" cover height="250" width="250"></v-img>

                            </v-col>
                            <v-col cols="6">
                                <v-row class="justify-center">
                                    <v-col cols="6">
                                           <h2 class="mb-3 mt-2"> Datos del cliente</h2>
                                        <v-row>
                                            <v-col cols="5">
                                                <h4> Cédula:</h4>
                                            </v-col>
                                            <v-col cols="7 align-start"> {{ productOrder.ci }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5">
                                                <h4> Nombre:</h4>
                                            </v-col>
                                            <v-col cols="7 align-start"> {{ productOrder.clientName +' '+ productOrder.lastName }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5">
                                                <h4> Correo: </h4>
                                            </v-col>
                                            <v-col cols="7 align-start"> {{ productOrder.email }}
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="5">
                                                <h4> Teléfono: </h4>
                                            </v-col>
                                            <v-col cols="7 align-start"> {{ productOrder.phone }}
                                            </v-col>
                                        </v-row>
                                        <v-img :src="productOrder.clientPhoto" class="mt-4" height="200" width="200" cover></v-img>

                                    </v-col>
                                   
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" variant="outlined" @click="dialogDetail = false">
                        Cerrar
                    </v-btn>

                    <v-btn color="green" variant="outlined" @click="acceptOrder">
                        Entregar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue';
import OrderService from '@/services/OrderService'
const dialogDetail = ref(false)
const orders = ref([])
const productOrder = reactive({
    id: 0,
    clientName: '',
    productName: '',
    clientPhoto: '',
    productPhoto: '',
    lastName: '',
    email: '',
    phone: '',
    price: '',
    stock: '',
    description: '',
    ci: ''
})
const headers = [
    {
        title: 'Fecha de creación',
        text: 'productName',
        value: 'date_create',
        key: 'date'
    },
    {
        title: 'Nombre del producto',
        text: 'productName',
        value: 'name'
    },
    {
        title: 'Nombre del cliente',
        text: 'clientName',
        value: 'user_name',
        key: 'client_name'
    },
    {
        title: 'Estado',
        text: 'state',
        value: 'status'
    },
    {
        title: 'Descripción',
        text: 'description',
        value: 'description'
    },
    {
        title: 'Acciones',
        text: 'actions',
        key: 'actions'
    }
]



const acceptOrder = async () => {
    const response = await OrderService.updateToEntregado(productOrder.id)
    console.log(response)
    if (response.success) {
        getOrderService()
        dialogDetail.value = false
    }
    else {
        console.log('hubo un error')

    }
}

const getOrderService = async () => {
    const ordersProduct = await OrderService.getOrderProductoByStatus('EN ESPERA')
    orders.value = ordersProduct.data
    console.log(ordersProduct)
}

const showDetailsOrder = async (data: any) => {
    dialogDetail.value = true
    productOrder.id = data.id
    productOrder.clientName = data.user_name.charAt(0).toUpperCase() + data.user_name.slice(1)
    productOrder.productName = data.name
    productOrder.productPhoto = data.product_image
    productOrder.clientPhoto = data.user_image
    productOrder.phone = data.phone
    productOrder.price = data.price
    productOrder.email = data.email
    productOrder.stock = data.stock
    productOrder.description = data.description
    productOrder.ci = data.ci
    productOrder.lastName = data.lastname.charAt(0).toUpperCase()+ data.lastname.slice(1)
}
onMounted(() => {
    getOrderService()
})
</script>
<style>
    .v-col{
        padding: 5px 5px 10px;
    }

</style>
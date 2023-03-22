<template>
    <div>
        <v-card v class="my-4">
            <v-row no-glutters>
                <v-col cols="8">
                    <div class="text-h3 pa-6">Premios</div>
                </v-col>
                <v-col cols="4" align="center" class="d-flex justify-center align-center">
                    <v-btn variant="flat" color="success" @click="storeDialogProduct">
                        Agregar
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-data-table :headers="headers" :items="products">
            <template v-slot:[`item.imagen`]="{ item }">
                <v-avatar :image="item.props.title.image1" size="50" class="mt-1 mb-1"></v-avatar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">

                <v-icon size="small" class="me-2" color="warning" @click="showModalUpdate(item.props.title)">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" color="red" @click="deleteProduct(item.props.title.id)">
                    mdi-delete
                </v-icon>
            </template>

        </v-data-table>
    </div>

    <v-row justify="center">
        <v-dialog v-model="dialogCreate" width="1024">
            <v-card>
                <v-card-title class="text-sm-center">
                    <span class="text-h5">CREANDO PREMIO</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-file-input accept="image/*" label="File input" @change="onFileSelected" v-model="files"></v-file-input>
                            <v-text-field class="d-none" v-model="product.id" required></v-text-field>
                            <v-col cols="6" sm="6" md="6">
                                <v-text-field label="Nombre*" v-model="product.name" required></v-text-field>
                            </v-col>
                           
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field label="Descripción*" aria-required=""
                                    v-model="product.description"></v-text-field>
                            </v-col>    
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field label="Puntos*" v-model="product.price" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="6">
                                <v-text-field label="Stock*" v-model="product.stock" required></v-text-field>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" variant="outlined" @click="dialogCreate = false">
                        Cerrar
                    </v-btn>
                    <v-btn  color="success" variant="outlined" @click="saveProduct">
                        Guardar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
import { onMounted, ref, reactive } from 'vue'
import ProductService from '@/services/ProductService'
import IProduct from '@/types/IProduct'
const products = ref([])
const dialogCreate = ref(false)
const product = reactive({
    id: 0,
    name: '',
    description: '',
    price: 0,
    image1: null,
    stock: 0
})

const files = ref([])
const headers = [

    {
        title: 'Imagen', text: 'imagen', key: 'imagen',
        align: 'center',
    },
    {
        title: 'Nombre',
        text: 'nombre',
        align: 'left',
        sortable: false,
        value: 'name'
    },
    { title: 'Descripción', text: 'description', value: 'description' },
    { title: 'Puntos', text: 'precio', value: 'price' },
    { title: 'Stock', text: 'precio', value: 'stock' },
    { title: 'Acciones', key: 'actions', sortable: false },
]
onMounted(() => {
    getAllProducts()

})

const getAllProducts = async () => {
    const response = await ProductService.get()
    products.value = response

}

const saveProduct = async () => {
    if (product.id == 0) {
        const response = await ProductService.store({ id: product.id, name: product.name, description: product.description, price: product.price, image: product.image1, category: 1,image1: '', stock: product.stock  })
        console.log(response)
        if (response.success) {
            dialogCreate.value = false
            getAllProducts()
        }
    } else {
        const response = await ProductService.update({ id: product.id, name: product.name, description: product.description, price: product.price, image1: '', category: 1, stock: product.stock })
        console.log(response)
        if (response.success) {
            dialogCreate.value = false
            getAllProducts()
        }

    }
}

const showModalUpdate = async (productUpdate: IProduct) => {
    cleanFormulario()

    product.name = productUpdate.name
    product.id = productUpdate.id
    product.description = productUpdate.description
    product.price = productUpdate.price
    product.stock = productUpdate.stock
    dialogCreate.value = true
}

const cleanFormulario = () => {
    product.name = ""
    product.id = 0
    product.description = ""
    product.price = 0
}

const deleteProduct = async (product_id: number) => {
    const response = await ProductService.delete(product_id)
    console.log(response)

    if (response.success) {
        getAllProducts()

    }

}

const onFileSelected = () => {
    console.log(files.value)
    product.image1 = files.value[0]
    
}

const storeDialogProduct = () => {
    cleanFormulario()

    dialogCreate.value = true
}
</script>

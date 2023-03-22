<template>
    <div>
        <v-card v class="my-4">
            <v-row no-glutters>
                <v-col cols="8">
                    <div class="text-h3 pa-6">Centros de Acopio</div>
                </v-col>
                <v-col cols="4" align="center" class="d-flex justify-center align-center">
                    <v-btn variant="flat" color="success" @click="storeDialogGatheringCenter">
                        Agregar
                    </v-btn>
                </v-col>
            </v-row>
        </v-card>
        <v-data-table :headers="headers" :items="gatheringCenters">
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon size="small" class="me-2" color="warning" @click="updateDialogGatherinCenter({
                    name: item.props.title.name,
                    ci: item.props.title.ci,
                    phone: item.props.title.phone,
                    email: item.props.title.email,
                    owner: item.props.title.lastname,
                    id: item.props.title.id,
                    direction: item.props.title.direction,
                    password: ''
                })">
                    mdi-pencil
                </v-icon>
                <v-icon size="small" color="red" @click="deleteGatheringCenter(item.props.title.id)">
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:[`item.photo`]="{ item }">
                <v-avatar :image="item.props.title.image" size="50" class="mt-1 mb-1"></v-avatar>
            </template>
        </v-data-table>
    </div>

    <v-row justify="center">
        <v-dialog v-model="dialogCreate" width="1024">
            <v-card>
                <v-card-title>
                    <span class="text-h5">CREANDO EL CENTRO DE ACOPIO</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form fast-fail @submit.prevent ref="validateForm">
                            <v-row>
                                <v-text-field class="d-none" v-model="gatheringCenterCreate.id" required></v-text-field>
                                <v-col cols="12" sm="12" md="12">
                                    <v-text-field label="Nombre*" v-model="gatheringCenterCreate.name" :rules="nameValidate"
                                        required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="RUC*" aria-required="" hint="Ingresa el RUC de tu centro de acopio"
                                        :rules="validateRUC" v-model="gatheringCenterCreate.ci"></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Correo electrónico*" v-model="gatheringCenterCreate.email"
                                        :rules="validateEmail" required></v-text-field>
                                </v-col>

                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Nombre del dueño*" v-model="gatheringCenterCreate.owner"
                                        :rules="nameValidate" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6">
                                    <v-text-field label="Teléfono*" v-model="gatheringCenterCreate.phone"
                                        :rules="validatePhone" required></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="12" md="8">
                                    <v-text-field label="Dirección*" v-model="gatheringCenterCreate.direction"
                                        :rules="nameValidate" required></v-text-field>
                                </v-col>
                                <v-col cols="4">
                                    <v-text-field label="Contraseña*" type="password"
                                        v-model="gatheringCenterCreate.password" :rules="validatePassword"
                                        required></v-text-field>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red-darken-1" variant="outlined" @click="dialogCreate = false">
                        Cerrar
                    </v-btn>
                    <v-btn color="green-darken-1" variant="outlined" @click="saveGatheringCenter">
                        {{ gatheringCenterCreate.id == 0 ? 'Guardar' : 'Actualizar' }}
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import GatherinCenterService from '@/services/GatherinCenterService'
import IGatheringCenter from '@/types/IGatheringCenter'

import { onMounted } from 'vue'
const gatheringCenters: any = ref([])
const dialogCreate = ref(false)
const validateForm = ref<null | { validate: () => null }>(null)
const gatheringCenterCreate: IGatheringCenter = reactive({
    name: '',
    direction: '',
    ci: '',
    email: '',
    phone: '',
    password: '',
    owner: '',
    id: 0
})

const headers = [
    {
        title: 'Foto',
        text: 'foto',
        align: 'left',
        key: 'photo'
    },
    {
        title: 'RUC',
        text: 'RUC',
        align: 'left',
        sortable: false,
        value: 'ci'
    },
    { title: 'Nombre', text: 'Nombre', value: 'name' },
    { title: 'Email', text: 'Correo electrónico', value: 'email' },
    { title: 'Nombres y apellidos', text: 'Descripción', value: 'lastname' },
    { title: 'Teléfono', text: 'Teléfono', value: 'phone' },
    { title: 'Acciones', key: 'actions', sortable: false },
]
const getGatheringCenter = async () => {
    const response = await GatherinCenterService.get()
    console.log(response)

    gatheringCenters.value = response
}


const saveGatheringCenter = async () => {
    const formIsValid: any = await validateForm.value?.validate()
    if (formIsValid.valid) {
        if (gatheringCenterCreate.id == 0) {
            const response = await GatherinCenterService.store(gatheringCenterCreate)
            if (response.success) {
                getGatheringCenter()
                dialogCreate.value = false
                cleanForm()
            }
        } else {
            const response = await GatherinCenterService.update(gatheringCenterCreate)
            if (response.success) {
                getGatheringCenter()
                dialogCreate.value = false
                cleanForm()
            }
        }
    }
}

const deleteGatheringCenter = async (gatheringCenterId: number) => {
    console.log(gatheringCenterId)
    const response = await GatherinCenterService.delete(gatheringCenterId)
    if (response.success) {
        console.log(response)
        getGatheringCenter()
    }
}

const updateDialogGatherinCenter = async (gatheringCenterUpdate: IGatheringCenter) => {
    console.log(gatheringCenterUpdate)
    gatheringCenterCreate.name = gatheringCenterUpdate.name
    gatheringCenterCreate.direction = gatheringCenterUpdate.direction
    gatheringCenterCreate.ci = gatheringCenterUpdate.ci
    gatheringCenterCreate.email = gatheringCenterUpdate.email
    gatheringCenterCreate.phone = gatheringCenterUpdate.phone
    gatheringCenterCreate.password = gatheringCenterUpdate.password
    gatheringCenterCreate.owner = gatheringCenterUpdate.owner
    gatheringCenterCreate.id = gatheringCenterUpdate.id
    dialogCreate.value = true
}

const storeDialogGatheringCenter = () => {
    dialogCreate.value = true
    cleanForm()
}

const cleanForm = () => {
    gatheringCenterCreate.name = ''
    gatheringCenterCreate.direction = ''
    gatheringCenterCreate.ci = ''
    gatheringCenterCreate.email = ''
    gatheringCenterCreate.phone = ''
    gatheringCenterCreate.password = ''
    gatheringCenterCreate.owner = ''
    gatheringCenterCreate.id = 0
}

const nameValidate: any[] = [
    (value: any) => {
        if (value.length == 0) return 'Este campo no puede estar vacio'
        return true
    }
]

const validateRUC: any[] = [
    (value: any) => {
        if (value.length != 13) {
            return 'El ruc debe de contener 13 digitos'
        } else {
            const validateCI = isValidCI(value.slice(0, 10))
            console.log(value.slice(10, 13) == "001")
            if (value.slice(10, 13) == "001") {
                if (isValidCI(value))
                    return validateCI
                else
                    return validateCI
            } else {
                return "Los últimos digitos no son validos"
            }

        }

    }
]


function isValidCI(ci: any) {
    var isNumeric = true;
    var total = 0,
        individual;

    for (var position = 0; position < 10; position++) {
        // Obtiene cada posición del número de cédula
        // Se convierte a string en caso de que 'ci' sea un valor numérico
        individual = ci.toString().substring(position, position + 1)

        if (isNaN(individual)) {
            isNumeric = false;
            break;
        } else {
            // Si la posición es menor a 9
            if (position < 9) {
                // Si la posición es par, osea 0, 2, 4, 6, 8.
                if (position % 2 == 0) {
                    // Si el número individual de la cédula es mayor a 5
                    if (parseInt(individual) * 2 > 9) {
                        // Se duplica el valor, se obtiene la parte decimal y se aumenta uno 
                        // y se lo suma al total
                        total += 1 + ((parseInt(individual) * 2) % 10);
                    } else {
                        // Si el número individual de la cédula es menor que 5 solo se lo duplica
                        // y se lo suma al total
                        total += parseInt(individual) * 2;
                    }
                    // Si la posición es impar (1, 3, 5, 7)
                } else {
                    // Se suma el número individual de la cédula al total
                    total += parseInt(individual);
                }
            }
        }
    }

    if ((total % 10) != 0) {
        total = (total - (total % 10) + 10) - total;
    } else {
        total = 0;
    }


    if (isNumeric) {
        // El total debe ser igual al último número de la cédula
        // La cédula debe contener al menos 10 dígitos
        if (ci.toString().length != 10) {
            return "La c\u00E9dula debe ser de: 10 d\u00EDgitos.";
        }

        // El número de cédula no debe ser cero
        if (parseInt(ci, 10) == 0) {
            return "La c\u00E9dula ingresada no puede ser cero.";
        }

        // El total debe ser igual al último número de la cédula
        if (total != parseInt(individual)) {
            return "La c\u00E9dula ingresada no es v\u00E1lida.";
        }

        return true;
    }

    return "El dato solo puede contener numeros.";
}

const validatePhone: any[] = [
    (v: any) => {
        if (v.length != 10)
            return "El número de teléfono debe de tener 10 dígitos"
        else
            return true
    }
]
const validateEmail: any[] = [
    (v: any) => /.+@.+/.test(v) || 'Formato de email inválido'
]

const validatePassword: any[] = [
    (v: any) => {
        if (v.length <= 6)
            return "La contraseña debe de tener mas de 6 carácteres"
        else
            return true
    }
]


onMounted(() => {
    getGatheringCenter()

})

</script>

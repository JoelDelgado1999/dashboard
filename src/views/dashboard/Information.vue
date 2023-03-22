<template>
  <div>
    <h2 class="text-center mb-5">Cantidad de solicitudes recolectadas por centro de acopio</h2>
    <div class="card-custom ">

      <v-row class=" p-5  justify-center align-center">
        <v-col cols="2">
          <h5 class="mr-2" color="green">Inicio</h5>
          <input class="mr-5" color="green" type="date" v-model="rangeDates.start" @change="changeUrl">
        </v-col>
        <v-col cols="2">
          <h5 class="mr-2">Final</h5>
          <input class="" color="green" type="date" v-model="rangeDates.end" @change="changeUrl">
        </v-col>
        <v-col cols="2">
          <v-btn color="yellow" class="mb-2" @click="getReport">Buscar</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn :href="url" color="green" class="mb-2" target="_blank">Imprimir reporte</v-btn>
        </v-col>
        <v-col cols="12" v-show="showMessageError">
          <h3 class="text-center mb-5" style="color: red">Selecciona un rango de fechas</h3>
        </v-col>
      </v-row>
    </div>
    <v-row class="mb-3 justify-center mb-5">
      <v-col cols="6"><v-table>
          <thead>
            <tr>
              <th class="text-left">
                Centro de acopio
              </th>
              <th class="text-left">
                Dueño
              </th>
              <th class="text-left">
                Cliente
              </th>
              <th class="text-left">
                Teléfono del cliente
              </th>
              <th class="text-left">
                Cantidad aproximada
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderReport" :key="item.id">
              <td>{{ item.name_centro }}</td>
              <td>{{ item.name_duenio.charAt(0).toUpperCase() + item.name_duenio.slice(1) }}</td>
              <td>{{ item.name_client.charAt(0).toUpperCase() + item.name_client.slice(1) }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.cantidad_aprox }}</td>
            </tr>
          </tbody>
        </v-table></v-col>
      <v-col cols="6">
        <apexchart height="250" type="bar" :options="options" :series="series"></apexchart>

      </v-col>

    </v-row>
  </div>
</template>
<style scoped>
.card-custom {
  padding: 20px;
  display: flex;
  align-items: center;
  background-color: rgb(187, 243, 187);
  border-radius: 5px;
  margin-bottom: 20px;
}
</style>
<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import ReportService from '@/services/ReportService';
const categories: number[] = [];
const data: number[] = [];
const showMessageError = ref(false)
const url: any = ref('')

const rangeDates = reactive({
  start: '',
  end: ''
})

const orderReport: any = ref([])
const options = reactive({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories
  }
})
const series = ref([{
  name: 'Cantidad de ordenes entregadas',
  data
}])


const getReport = () => {
  if (rangeDates.start === '' || rangeDates.end === '') {
    showMessageError.value = true

    setTimeout(() => {
      showMessageError.value = false

    }, 4000)


  } else {
    ReportService.ordenesDetalleTable(rangeDates)
      .then(response => {
        orderReport.value = response.data
      })
  }

}

const changeUrl = () => {
  if (rangeDates.start != '' && rangeDates.end != '') {
    url.value = `${process.env.api}/api/orders/quantity/pdf/${rangeDates.start}/${rangeDates.end}`;

  }
}
onMounted(() => {
  ReportService.quantityOfOrderByCentroAcopio()
    .then(response => {
      response.data.forEach((element: any) => {
        options.xaxis.categories.push(element.name)
        series.value[0].data.push(element.count)
      });
    })


})
</script>
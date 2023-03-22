<template>
  <div>
    <h2 class="text-center">Peso recolectado por centro de acopio</h2>
    <div class="card-custom ">
      <v-row class="p-5  justify-center align-center">

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
    <v-row class="mb-3 justify-center mb-4 card-custom-body">
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Centro de acopio
              </th>
              <th class="text-left">
                Peso recolectado
              </th>
              <th class="text-left">
                Nombres y apellidos
              </th>
              <th class="text-left">
                Teléfono
              </th>
              <th class="text-left">
                Correo electrónico
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in orderReports" :key="item.id">
              <td>{{ item.centro_acopio }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.duenio }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.email }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12">
        <apexchart height="250" type="bar" :options="optionsWeightReport" :series="seriesWeightReport"></apexchart>

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
const dataWeightReport: number[] = [];
const orderReports: any = ref([])
const showMessageError = ref(false)
const rangeDates = reactive({
  start: '',
  end: ''
})
const url: any = ref('')
const optionsWeightReport = reactive({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories
  }
})
const seriesWeightReport = ref([{
  name: 'Peso reciclado',
  data: dataWeightReport
}])
const getReport = () => {
  if (rangeDates.start === '' || rangeDates.end === '') {
    showMessageError.value = true

    setTimeout(() => {
      showMessageError.value = false

    }, 4000)


  } else {
    ReportService.ordenesWeightTable(rangeDates)
      .then(response => {
        orderReports.value = response.data

      })
  }
}
const changeUrl = () => {
  if (rangeDates.start != '' && rangeDates.end != '') {
    url.value = `${process.env.api}/api/orders/pdf/${rangeDates.start}/${rangeDates.end}`;

  }
}
onMounted(() => {
  ReportService.weightOfCentrosAcopio()
    .then(response => {
      response.data.forEach((element: any) => {
        optionsWeightReport.xaxis.categories.push(element.name)
        seriesWeightReport.value[0].data.push(element.weight)
      });
    })
})
</script>
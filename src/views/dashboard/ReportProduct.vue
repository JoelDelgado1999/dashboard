<template>
  <div>
    <h2 class="text-center mb-5">Premios mas solicitados</h2>
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
      <v-col cols="8">
        <v-table>
          <thead>
            <tr>
              <th class="text-left">
                Nombre del usuario
              </th>
              <th class="text-left">
                Correo del usuario
              </th>
              <th class="text-left">
                Teléfono del usuario
              </th>
              <th class="text-left">
                Premio
              </th>

              <th class="text-left">
                Puntos del premio
              </th>
              <th class="text-left">
                Fecha de creación
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in productReport" :key="item.id">
              <td>{{ item.user_name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phone }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.price }}</td>
              <td>{{ new Date(item.created_at).toDateString() }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="4">
        <apexchart height="300" type="donut" :series="optionsProductReport.series"
          :options="optionsProductReport.options">
        </apexchart>
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
import { reactive, onMounted, ref } from 'vue';
import ReportService from '@/services/ReportService';

const url: any = ref('')

const rangeDates = reactive({
  start: '',
  end: ''
})
const showMessageError = ref(false)
const productReport: any = ref([])
const dataProductReport: number[] = [];
const dataLabelProductReport: string[] = [];
const optionsProductReport = reactive({
  series: dataProductReport,
  options: {
    labels: dataLabelProductReport
  }
})

const getReport = () => {
  if (rangeDates.start === '' || rangeDates.end === '') {
    showMessageError.value = true

    setTimeout(() => {
      showMessageError.value = false

    }, 4000)


  } else {
    ReportService.premiosDetalleTable(rangeDates)
      .then(response => {
        productReport.value = response.data
      })
  }
}

const changeUrl = () => {
  if (rangeDates.start != '' && rangeDates.end != '') {
    url.value = `${process.env.api}/api/products/pdf/${rangeDates.start}/${rangeDates.end}`;

  }
}
onMounted(() => {

  ReportService.productsTotal()
    .then(response => {
      response.data.forEach((element: any) => {
        console.log(element)
        optionsProductReport.series.push(element.total)
        optionsProductReport.options.labels.push(element.name)
      })
    })


})
</script>
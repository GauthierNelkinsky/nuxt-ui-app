<script lang="ts" setup>
import { Line } from 'vue-chartjs'

const props = defineProps<{
  data : {value: number, timestamp: Date}[],
}>()

const refData = ref(props.data)

//When the data changes, update chartData
watch(refData.value, (newData) => {
  chartData.value = {
    labels: newData.map(d => d.timestamp.getHours() + ':' + d.timestamp.getMinutes() + ':' + d.timestamp.getSeconds()),
    datasets: [
    {
        backgroundColor: 'lime',
        borderColor: 'lime',
        data: newData.map(d => d.value)
      }
    ],
  } 
})


const chartData = ref({
  labels: refData.value.map(d => d.timestamp.getHours() + ':' + d.timestamp.getMinutes() + ':' + d.timestamp.getSeconds()),
  datasets: [
  {
      backgroundColor: 'lime',
      borderColor: 'lime',
      data: props.data.map(d => d.value)
    }
  ],
})

const chartOptions = ref({
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Time'
      }
    },
    y: {
      display: true,
      title: {
        display: true,
        text: 'Mb/s'
      },
      min: 0,
      max: 100
    }
  },
  responsive: true,
  maintainAspectRatio: false
})
</script>
<template>
  <div>
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
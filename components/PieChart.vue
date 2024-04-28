<script lang="ts" setup>
import { Pie } from 'vue-chartjs'

const props = defineProps<{
  used : number,
  left : number
}>()

watch(()=>props.used, (newVal)=>{
  chartData.value = {
    labels: ["used", "left"],
    datasets: [
      {
        backgroundColor: ['lime', 'lightgrey'],
        data: [newVal, props.left - newVal]
      },
    ],
  }
})


const chartData = ref({
  labels: ["used", "left"],
  datasets: [
    {
      backgroundColor: ['lime', 'lightgrey'],
      data: [props.used, props.left - props.used]
    },
  ],
})


const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false
})
</script>
<template>
  <div>
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
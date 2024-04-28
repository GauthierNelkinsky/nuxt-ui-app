<template >
  <main class="flex w-full flex-col p-10 gap-10">
    <div>
      <h1 class="text-2xl font-semibold">Traffic Analysis</h1>
      <p class="text-gray-500">This is the traffic analysis page</p>
    </div>
    <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 gap-10">
        <UCard class="">
            <template #header>
              <h2 class="text-lg font-semibold">Average Mb Incoming</h2>
              <p class="text-gray-500">This is the average of the last 10 mb values</p>
            </template>
            <h3 class="text-[94px] font-semibold text-center">
                {{ avgMbsIn }}
            </h3>
            <p class="text-center">Mb/s</p>
        </UCard>

        <UCard class="">
            <template #header>
              <h2 class="text-lg font-semibold">Mb Outgoing</h2>
              <p class="text-gray-500">This is the average of the last 10 mb values</p>
            </template>
            <h3 class="text-[94px] font-semibold text-center">
                {{ avgMbsOut }}
            </h3>
            <p class="text-center">Mb/s</p>
        </UCard>

        <UCard class="">
            <template #header>
              <h2 class="text-lg font-semibold">API calls</h2>
              <p class="text-gray-500">This is number of API Call used and left</p>
            </template>
            <PieChart :used="nbFetch" :left="100"/>
        </UCard>

        <UCard class="">
            <template #header>
              <h2 class="text-lg font-semibold">Radar chart</h2>
              <p class="text-gray-500">Just a simple radar chart because it is cool</p>
            </template>
            <RadarChart />
        </UCard>

    </div>

  </main>
</template>


<script setup lang="ts">

  const mbStore = useMegabitStore()
 
  const mbsIn = ref(mbStore.mbs_in)
  const mbsOut = ref(mbStore.mbs_out)
  const nbFetch = ref(mbStore.nbFetch)

  // Calculate the average of the last 10 values round it to 2 decimal places
  const avgMbsIn = ref((mbsIn.value.reduce((acc, curr) => acc + curr.value, 0) / mbsIn.value.length).toFixed(2))
  const avgMbsOut = ref((mbsOut.value.reduce((acc, curr) => acc + curr.value, 0) / mbsOut.value.length).toFixed(2))

  mbStore.$subscribe((data, state) => {
    mbsIn.value = state.mbs_in
    mbsOut.value = state.mbs_out
    avgMbsIn.value = (mbsIn.value.reduce((acc, curr) => acc + curr.value, 0) / mbsIn.value.length).toFixed(2)
    avgMbsOut.value = (mbsOut.value.reduce((acc, curr) => acc + curr.value, 0) / mbsOut.value.length).toFixed(2)
    nbFetch.value = state.nbFetch
  })

</script>
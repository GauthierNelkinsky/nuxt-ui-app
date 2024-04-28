<template>
  <main class="flex w-full flex-col p-10 gap-10">
    <div>
      <h1 class="text-2xl font-semibold">Real-Time Data</h1>
      <p class="text-gray-500">This is a real-time data page</p>
    </div>
    <div class="flex flex-col gap-10">
      <UCard class="">
          <template #header>
            <h2 class="text-lg font-semibold">Mb Incoming</h2>
            <p class="text-gray-500">This is the data coming in</p>
          </template>
          <LineChart :data="mbsIn"/>
      </UCard>
      <UCard class="">
          <template #header>
            <h2 class="text-lg font-semibold">Mb Outgoing</h2>
            <p class="text-gray-500">This is the data coming out</p>
          </template>
          <LineChart :data="mbsOut" />
      </UCard>
    </div>
    <div class="flex gap-5">
      <UButton v-if="mbStore.state !== 'fetching'" @click="mbStore.start()" >Fetch data</UButton>
      <UButton v-if="mbStore.state === 'fetching'" @click="mbStore.stop()" color="red">Stop</UButton>
    </div>
  </main>
</template>


<script setup lang="ts">

  const mbStore = useMegabitStore()
 
  const mbsIn = ref(mbStore.mbs_in)
  const mbsOut = ref(mbStore.mbs_out)

  mbStore.$subscribe((data, state) => {
    mbsIn.value = state.mbs_in
    mbsOut.value = state.mbs_out
  })
 

</script>
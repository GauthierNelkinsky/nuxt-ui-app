<script setup lang="ts">
const columns = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'Name'
}, {
  key: 'date',
  label: 'Date'
},
{
  key: 'actions',
}]

//Create a list of report with different names and dates
const reports = [
    { id: 1, name: "Report Dormagen", date: "20-04-2024"},
    { id: 2, name: "Report Dusseldorf", date: "12-04-2024"},
    { id: 3, name: "Report Koln", date: "10-04-2024"},
    { id: 4, name: "Report Bonn", date: "08-04-2024"},
    { id: 5, name: "Report Berlin", date: "06-04-2024"},
    { id: 6, name: "Report Hamburg", date: "04-04-2024"},
    { id: 7, name: "Report Munich", date: "02-04-2024"},
    { id: 8, name: "Report Frankfurt", date: "01-04-2024"},
    { id: 9, name: "Report Stuttgart", date: "30-03-2024"},
    { id: 10, name: "Report Hannover", date: "28-03-2024"},
    { id: 11, name: "Report Bremen", date: "26-03-2024"},
    { id: 12, name: "Report Leipzig", date: "24-03-2024"},
    { id: 13, name: "Report Dresden", date: "22-03-2024"},
    { id: 14, name: "Report Nuremberg", date: "20-03-2024"},
    { id: 15, name: "Report Duisburg", date: "18-03-2024"},
    { id: 16, name: "Report Toulouse", date: "16-03-2024"},
    { id: 17, name: "Report Lille", date: "14-03-2024"},
    { id: 18, name: "Report Lyon", date: "12-03-2024"},
    { id: 19, name: "Report Marseille", date: "10-03-2024"},
    { id: 20, name: "Report Nice", date: "08-03-2024"},
    { id: 21, name: "Report Paris", date: "06-03-2024"},
    { id: 22, name: "Report Bordeaux", date: "04-03-2024"},
    { id: 23, name: "Report Nantes", date: "02-03-2024"},
    { id: 24, name: "Report Montpellier", date: "01-03-2024"},
    { id: 25, name: "Report Lille", date: "28-02-2024"},
    { id: 26, name: "Report Budapest", date: "26-02-2024"},
    { id: 27, name: "Report Debrecen", date: "24-02-2024"},
    { id: 28, name: "Report Szeged", date: "22-02-2024"},
    { id: 29, name: "Report Pecs", date: "20-02-2024"},
    { id: 30, name: "Report Gyor", date: "18-02-2024"},
    { id: 31, name: "Report Szombathely", date: "16-02-2024"},
    { id: 32, name: "Report Kaposvar", date: "14-02-2024"},
    { id: 33, name: "Report Veszprem", date: "12-02-2024"},
    { id: 34, name: "Report Zalaegerszeg", date: "10-02-2024"},
    { id: 35, name: "Report Salgotarjan", date: "08-02-2024"},
    { id: 36, name: "Report Eger", date: "06-02-2024"},
    { id: 37, name: "Report Sopron", date: "04-02-2024"},
    { id: 38, name: "Report Szekesfehervar", date: "02-02-2024"},
    { id: 39, name: "Report Kecskemet", date: "01-02-2024"},
    { id: 40, name: "Report Szolnok", date: "30-01-2024"},
    { id: 41, name: "Report Szeged", date: "28-01-2024"},
]

const q = ref('')
const page = ref(1)
const pageCount = 5

const rows = computed(() => {
  if (!q.value) {
    return reports
  }
  page.value = 1

  return reports.filter((report) => {
    return Object.values(report).some((value) => {
      return String(value).toLowerCase().includes(q.value.toLowerCase())
    })
  })
})

const filteredRows = computed(() => {
  const start = (page.value - 1) * pageCount
  const end = start + pageCount
  return rows.value.slice(start, end)
})

const toast = useToast()

</script>

<template>
    <UContainer class="p-10 w-full h-full">
        <UCard>
            <template #header>
                <div class="flex flex-col gap-2">
                    <h2 class="text-lg font-semibold">Reports</h2>
                    <UInput v-model="q" placeholder="Filter people..." />
                </div>
            </template>

            <UTable :rows="filteredRows" :columns="columns">
                <template #actions-data="{ filteredRows }">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-arrow-down-tray-20-solid" @click="toast.add({ title: 'Download in progress' })" />
                </template>
            </UTable>

            <template #footer>
                <UPagination :max="2" v-model="page" :page-count="pageCount" :total="rows.length" />
            </template>
        </UCard>
    </UContainer>
</template>
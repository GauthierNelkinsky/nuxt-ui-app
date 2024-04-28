<script setup lang="ts">
const route = useRoute()

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const links = [
  [{
    label: 'Home',
    icon: 'i-heroicons-home',
    to : '/'
  }], [{
    label: 'Real-Time Data',
    icon: 'i-heroicons-cube-transparent',
    to: '/real-time'
  }, {
    label: 'Historical Data Reports',
    icon: 'i-heroicons-archive-box',
    to: '/historical-data'
  }, {
    label: 'Traffic Analysis',
    icon: 'i-heroicons-rectangle-group',
    to: '/traffic-analysis'
  }], [{
    label : "Switch theme",
    icon: 'i-heroicons-moon',
    click : () => {
        isDark.value = !isDark.value
    }
  }]
]
</script>

<template>
  <UVerticalNavigation :links="links"

  :ui="{
      wrapper: 'border-s border-r p-2 border-gray-200 dark:border-gray-800 space-y-2',
      padding: 'p-0 p-2',
      label: 'hidden sm:block',
      rounded: '',
      font: '',
      ring: '',
    }" />
</template>
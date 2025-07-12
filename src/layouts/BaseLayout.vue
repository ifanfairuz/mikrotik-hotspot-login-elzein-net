<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { onBeforeMount } from 'vue'

const mode = useColorMode()

onBeforeMount(() => {
  if (mode.value == 'dark') {
    document.body.classList.add('dark')
  }
})
</script>
<template>
  <div :class="mode == 'dark' ? 'dark' : ''">
    <slot />
  </div>
</template>

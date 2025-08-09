<script setup lang="ts">
import BgParticle from '@/components/BgParticle.vue'
import { cn } from '@/lib/utils'
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
  <div :class="cn(mode == 'dark' ? 'dark' : '', 'relative')">
    <BgParticle
      :color="mode == 'dark' ? '#fb2c36' : '#000000'"
      :line-linked-opacity="mode == 'dark' ? 0.5 : 0.2"
    />
    <div class="relative z-20">
      <slot />
    </div>
  </div>
</template>

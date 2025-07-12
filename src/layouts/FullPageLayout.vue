<script setup lang="ts">
import AppFooter from '@/components/AppFooter.vue'
import BaseLayout from './BaseLayout.vue'
import AppHeader from '@/components/AppHeader.vue'

defineProps({
  noHeader: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <BaseLayout class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="flex flex-col gap-10">
      <AppHeader v-if="!noHeader" />
      <main class="">
        <slot />
      </main>
      <AppFooter />
    </div>
  </BaseLayout>
</template>

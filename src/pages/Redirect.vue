<script setup lang="ts">
import CenterBox from '@/components/CenterBox.vue'
import PageSpinner from '@/components/PageSpinner.vue'
import FullPageLayout from '@/layouts/FullPageLayout.vue'
</script>

<template>
  <FullPageLayout no-header>
    <CenterBox class="max-w-sm">
      <div class="flex flex-col items-center gap-4 my-[25vh]">
        <h3>Sedang menghubungkan ...</h3>
        <PageSpinner />
      </div>
    </CenterBox>
  </FullPageLayout>
</template>

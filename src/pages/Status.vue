<script setup lang="ts">
import CenterBox from '@/components/CenterBox.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import FullPageLayout from '@/layouts/FullPageLayout.vue'
import { useLogoutHandler, useParams, useStatusData, type StatusParams } from '@/lib/mikrotik'

const params = useParams<StatusParams>()
const datas = useStatusData(params)
const onLogout = useLogoutHandler(params)
</script>

<template>
  <FullPageLayout>
    <CenterBox class="max-w-sm">
      <Card class="min-w-[400px]">
        <CardContent class="space-y-4">
          <h1 class="text-xl text-center mb-8">Status Hotspot</h1>
          <div class="flow-root">
            <dl class="divide-y text-sm">
              <div
                v-for="data in datas"
                :key="data.label"
                class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
              >
                <dt class="font-medium">{{ data.label }}</dt>

                <dd class="sm:col-span-2">{{ data.value || '-' }}</dd>
              </div>
            </dl>
          </div>
          <Button type="button" class="w-full" @click="onLogout"> Logout </Button>
        </CardContent>
      </Card>
    </CenterBox>
  </FullPageLayout>
</template>

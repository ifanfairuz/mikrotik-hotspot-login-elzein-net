<script setup lang="ts">
import CenterBox from '@/components/CenterBox.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import FullPageLayout from '@/layouts/FullPageLayout.vue'
import { onMounted, ref } from 'vue'

interface Param {
  'link-logout'?: string
  'link-login-only'?: string
  'link-orig-esc'?: string
  username?: string
  session_time_left?: string
  bytes_in_nice?: string
  bytes_out_nice?: string
  uptime?: string
  mac?: string
  ip?: string
  login_by?: string
  advert_pending?: string
  advert_pending_reason?: string
  advert_pending_time?: string
  error?: string
}

const params = ref<Param>({})

const datas = ref([
  {
    label: 'IP address',
    value: params.value.ip,
  },
  {
    label: 'MAC address',
    value: params.value.mac,
  },
  {
    label: 'Sent',
    value: params.value.bytes_in_nice,
  },
  {
    label: 'Received',
    value: params.value.bytes_out_nice,
  },
  {
    label: 'Online',
    value: params.value.uptime,
  },
  {
    label: 'Sisa Online',
    value: params.value.session_time_left,
  },
])

onMounted(() => {
  params.value = JSON.parse(document.getElementById('params')?.innerHTML || '{}')
})
</script>

<template>
  <FullPageLayout>
    <CenterBox class="max-w-sm">
      <Card class="min-w-[400px]">
        <CardContent class="space-y-4">
          <h1 class="text-xl text-center mb-8">Logout Berhasil</h1>
          <div class="flow-root">
            <dl class="divide-y text-sm">
              <div
                v-for="data in datas"
                :key="data.label"
                class="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4"
              >
                <dt class="font-medium">{{ data.label }}</dt>

                <dd class="sm:col-span-2">{{ data.value }}</dd>
              </div>
            </dl>
          </div>
          <a :href="params['link-login-only']" class="w-full">
            <Button type="button" class="w-full"> Login Lagi </Button>
          </a>
        </CardContent>
      </Card>
    </CenterBox>
  </FullPageLayout>
</template>

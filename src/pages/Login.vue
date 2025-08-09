<script setup lang="ts">
import CenterBox from '@/components/CenterBox.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FullPageLayout from '@/layouts/FullPageLayout.vue'
import { useLoginParams } from '@/lib/mikrotik'
import { computed, ref } from 'vue'

const params = useLoginParams()
const username = ref('')
const error = ref<string | null>()
const display_error = computed(() => params.value.error ?? error.value)
const loading = ref(false)
const login_form = ref<HTMLFormElement>()
const login_username = ref<HTMLInputElement>()
const login_password = ref<HTMLInputElement>()
const login_dst = ref<HTMLInputElement>()

const submit = async (value: string) => {
  if (!login_form.value || !login_username.value || !login_password.value || !login_dst.value) {
    return
  }

  if (!params.value?.['chap-id'] || !params.value['link-login-only']) {
    return
  }

  loading.value = true
  login_username.value.value = value.trim().toUpperCase()
  login_password.value.value = login_username.value.value
  login_dst.value.value = params.value['link-orig-esc'] ?? ''
  login_form.value.action = params.value['link-login-only']

  login_form.value.submit()
}

const onSubmit = () => {
  if (!username.value) {
    alert('Mohon masukkan username')
    return
  }

  submit(username.value)
}
</script>

<template>
  <FullPageLayout>
    <CenterBox class="w-sm">
      <form action="" name="sendin" id="login" ref="login_form" method="post" class="hidden">
        <input type="hidden" name="username" ref="login_username" />
        <input type="hidden" name="password" ref="login_password" />
        <input type="hidden" name="popup" value="true" />
        <input type="hidden" name="dst" ref="login_dst" />
      </form>
      <form @submit.prevent="onSubmit">
        <Card>
          <CardContent class="space-y-4">
            <h1 class="text-xl text-center mb-8">Login Hotspot</h1>
            <p v-if="display_error" class="text-red-500">{{ display_error }}</p>
            <Input
              :disabled="loading"
              id="username"
              type="text"
              placeholder="Username"
              v-model="username"
            />
            <Button :disabled="loading" type="submit" class="w-full"> Login </Button>
          </CardContent>
        </Card>
      </form>
    </CenterBox>
  </FullPageLayout>
</template>

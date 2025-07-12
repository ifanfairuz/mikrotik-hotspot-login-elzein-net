<script setup lang="ts">
import CenterBox from '@/components/CenterBox.vue'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import FullPageLayout from '@/layouts/FullPageLayout.vue'
import { hexMD5 } from '@/lib/md5-module'
import { onMounted, ref } from 'vue'

interface Param {
  'link-login-only': string
  'link-orig-esc': string
  'chap-id'?: string
  'chap-challenge'?: string
  error?: string
  username?: string
}

const params = ref<Param>({
  'link-login-only': location.href.split('?')[0],
  'link-orig-esc': '',
})
const username = ref('')
const login_username = ref('')
const login_password = ref('')
const login_form = ref<HTMLFormElement>()

const submit = (value: string) => {
  if (!params.value?.['chap-id']) {
    return
  }

  login_username.value = value.trim().toUpperCase()
  login_password.value = hexMD5(
    String(params.value['chap-id']) + username.value + String(params.value['chap-challenge']),
  )
  login_form.value?.submit()
}

const onSubmit = () => {
  if (!username.value) {
    alert('Mohon masukkan username')
    return
  }

  submit(username.value)
}

onMounted(() => {
  params.value = JSON.parse(document.getElementById('params')?.innerHTML || '{}')
})
</script>

<template>
  <FullPageLayout>
    <CenterBox class="w-sm">
      <form
        v-if="params['chap-id']"
        ref="login_form"
        :action="params['link-login-only']"
        method="post"
        class="hidden"
      >
        <input type="hidden" name="username" />
        <input type="hidden" name="password" />
        <input type="hidden" name="popup" value="true" />
        <input type="hidden" name="dst" :value="params['link-orig-esc']" />
      </form>
      <form @submit.prevent="onSubmit">
        <Card>
          <CardContent class="space-y-4">
            <h1 class="text-xl text-center mb-8">Login Hotspot</h1>
            <p v-if="params.error" class="text-red-500">{{ params.error }}</p>
            <Input id="username" type="text" placeholder="Username" v-model="username" />
            <Button type="submit" class="w-full"> Login </Button>
            <!-- <div class="flex gap-2 items-center text-muted-foreground">
              <hr class="flex-1" />
              <span>atau</span>
              <hr class="flex-1" />
            </div>
            <Button type="button" class="w-full" variant="secondary" @click="onRonda">
              Login untuk Ronda
            </Button>
            <p class="text-sm text-muted-foreground">
              <i>NB:</i> User <strong>ronda</strong> hanya aktif di jam <strong>21:00</strong> WIB
              s/d <strong>03:00</strong> WIB
            </p> -->
          </CardContent>
        </Card>
      </form>
    </CenterBox>
  </FullPageLayout>
</template>

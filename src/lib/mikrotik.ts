import { computed, onMounted, ref, type Ref } from 'vue'

export interface StatusParams {
  'link-logout'?: string
  'link-login-only'?: string
  'link-orig-esc'?: string
  username?: string
  'session-time-left'?: string
  'bytes-in-nice'?: string
  'bytes-out-nice'?: string
  uptime?: string
  mac?: string
  ip?: string
  'login-by'?: string
  'advert-pending'?: string
  'advert-pending-reason'?: string
  'advert-pending-time'?: string
  error?: string
}

export interface LoginParams {
  'link-login-only'?: string
  'link-orig-esc'?: string
  'chap-id'?: string | null
  'chap-challenge'?: string | null
  error?: string | null
}

export function useParams<T extends LoginParams | StatusParams>() {
  const params = ref<T>({} as T)

  onMounted(() => {
    params.value = JSON.parse(
      document.getElementById('params')?.textContent?.replace('/\\/g', '\\\\') || '{}',
    )
  })

  return params
}

export function useLoginParams() {
  const params = useParams<LoginParams>()
  const login_params = computed(() => {
    return {
      ...params.value,
      'chap-id': (window as any).mikrotik_data['chap-id'] ?? null,
      'chap-challenge': (window as any).mikrotik_data['chap-challenge'] ?? null,
    }
  })

  return login_params
}

export function useStatusData(use_params?: Ref<StatusParams>) {
  const params = use_params ?? useParams<StatusParams>()
  const datas = computed(() => [
    {
      label: 'Username',
      value: params.value.username,
    },
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
      value: params.value['bytes-in-nice'],
    },
    {
      label: 'Received',
      value: params.value['bytes-out-nice'],
    },
    {
      label: 'Online',
      value: params.value.uptime,
    },
    {
      label: 'Sisa Online',
      value: params.value['session-time-left'],
    },
  ])

  return datas
}

export function useLogoutHandler(use_params?: Ref<StatusParams>) {
  const params = use_params ?? useParams<StatusParams>()

  return () => {
    if (params.value['link-logout']) {
      window.location.assign(params.value['link-logout'])
    }
  }
}

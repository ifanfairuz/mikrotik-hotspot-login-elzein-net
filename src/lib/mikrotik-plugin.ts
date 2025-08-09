import type { Plugin } from 'vite'
import path from 'path'

type ParamsObject = { name: string; nullable?: boolean; independent?: boolean }
type Params = string | ParamsObject

function generateScriptData(params: Params | Params[]) {
  const independents: ParamsObject[] = []
  const json_data: string[] = []

  if (!Array.isArray(params)) {
    const gen = (s: string) => {
      return `<script type="text/javascript">if (!window.mikrotik_data) window.mikrotik_data = {};${s}</script>`
    }

    if (typeof params === 'string') {
      return gen(`window.mikrotik_data['${params}'] = '$(${params})';`)
    } else {
      if (params.nullable) {
        return `$(if ${params.name})${gen(`window.mikrotik_data['${params.name}'] = '$(${params.name})';`)}$(endif)`
      }

      return gen(`window.mikrotik_data['${params.name}'] = '$(${params.name})';`)
    }
  }

  for (const p of params) {
    if (typeof p === 'string') {
      json_data.push(`"${p}": "$(${p})"`)
      continue
    }

    if (p.independent) {
      independents.push(p)
      continue
    }

    if (p.nullable) {
      json_data.push(`"${p.name}": $(if ${p.name})"$(${p.name})"$(else)null$(endif)`)
    }

    json_data.push(`"${p.name}": "$(${p.name})"`)
  }

  let script = `<script type="application/json" id="params">{${json_data.join(',')}}</script>`
  if (independents.length) {
    script += independents.map(({ independent, ...p }) => generateScriptData(p)).join('')
  }

  return script
}

function appendScript(html: string, params: Params[]) {
  return html.replace('</head>', `  ${generateScriptData(params)}\n</head>`)
}

const logout_and_status = [
  'link-logout',
  'link-login-only',
  'link-orig-esc',
  'username',
  'session-time-left',
  'bytes-in-nice',
  'bytes-out-nice',
  'uptime',
  'mac',
  'ip',
  'login-by',
  'advert-pending',
  'advert-pending-reason',
  'advert-pending-time',
  'error',
]

interface Datas {
  'login.html': Params[]
  'logout.html': Params[]
  'status.html': Params[]
}

const datas: Datas = {
  'login.html': [
    'link-login-only',
    'link-orig-esc',
    { name: 'chap-id', nullable: true, independent: true },
    { name: 'chap-challenge', nullable: true, independent: true },
    { name: 'error', nullable: true },
  ],
  'logout.html': logout_and_status,
  'status.html': logout_and_status,
}

export default function mikrotik(): Plugin {
  return {
    name: 'mikrotik-plugin',
    transformIndexHtml(content, file) {
      let html = content
      const name = path.basename(file.filename)
      if (name in datas) {
        html = appendScript(content, datas[name as keyof Datas])
      }

      if (name == 'login.html') {
        html = html.replace(
          '<!doctype html>',
          '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
        )
      }

      return html
    },
  }
}

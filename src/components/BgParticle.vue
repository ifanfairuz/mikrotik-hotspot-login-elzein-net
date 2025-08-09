<script setup lang="ts">
import { onMounted } from 'vue'
import { particlesJS } from '@/lib/particle'

const props = defineProps({
  color: {
    type: String,
    default: '#ffffff',
  },
  lineLinkedOpacity: {
    type: Number,
    default: 0.2,
  },
})

onMounted(() => {
  const distance_line_linked = Math.max(window.screen.width / 4, 100)

  particlesJS('bg-effect', {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: Math.max(window.screen.width * 0.7, 400),
        },
      },
      color: {
        value: props.color,
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 1,
          color: props.color,
        },
        polygon: {
          nb_sides: 5,
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 4,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: distance_line_linked,
        color: props.color,
        opacity: props.lineLinkedOpacity,
        width: 1,
      },
      move: {
        enable: true,
        speed: Math.max(Math.min(Math.floor(window.screen.width / 2000), 8), 4),
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab',
        },
        onclick: {
          enable: true,
          mode: 'push',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: Math.min(distance_line_linked * 1.2, 400),
          line_linked: {
            opacity: 1,
          },
        },
        push: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  })
})
</script>
<template>
  <div id="bg-effect" class="absolute inset-0 z-10"></div>
</template>

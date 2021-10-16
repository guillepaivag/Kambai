<template>
  <div class="">
    <inicio-sesion @inicioSesion="inicioSesion($event)" />
  </div>
</template>

<script>
import InicioSesion from '@/components/auth-forms/InicioSesion'
export default {
  name: 'InicioSesion',
  components: {
    'inicio-sesion': InicioSesion
  },
  methods: {
    async inicioSesion(data) {
      const userCredential = await this.$store.dispatch('firebaseLogin', data)
      this.$router.push('/')
    }
  },
}
</script>

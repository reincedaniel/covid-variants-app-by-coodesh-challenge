<template>
  <div class="fullscreen bg-dark text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nada encontrado...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="dark"
        unelevated
        rounded
        size="lg"
        icon="home"
        to="/"
        label="Voltar à página principal"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>

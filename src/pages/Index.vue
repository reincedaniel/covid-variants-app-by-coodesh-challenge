<template>
  <q-page >
    <AppFiltro/>
    <AppGraphic />
  </q-page>
</template>

<script>
import AppGraphic from "src/components/PlanetGraphic.vue";
import AppFiltro from "src/components/AppFiltro.vue";


export default {
  name: "PageIndex",
  components: {
    AppGraphic,
    AppFiltro
  },
};
</script>

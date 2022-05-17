<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-light-blue" elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          size="lg"
          icon="coronavirus"
          aria-label="Menu"
        />
        <q-toolbar-title class="text-bold text-body2">
          Covid Variants
        </q-toolbar-title>

        <div class="text-bold">#Coodesh - challenge</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { QSpinnerGears } from "quasar";
export default {
  name: "MainLayout",

  data() {
    return {};
  },

  async mounted() {
    this.showLoading();
  },
  methods: {
    async showLoading() {
      this.$q.loading.show({
        backgroundColor: "grey-9",
        spinner: QSpinnerGears,
        spinnerColor: "white",
        message:
          'A construção do <b> Mapa Coroplético</b> está em processo.<br/><span class="text-white text-weight-bold">Aguarde ...</span>',
      });
      await this.$store.dispatch("ADD_COVID_VARIANTS");
      await this.$store.dispatch("GET_VARIANTS");
      await this.$store.dispatch("GET_COVID_VARIANTS_FILTER", {date1: this.$route.query.date1, date2:this.$route.query.date2});

      
      // hiding in 3s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
  },
  beforeDestroy() {
    if (this.timer !== void 0) {
      clearTimeout(this.timer);
      this.$q.loading.hide();
    }
  },
};
</script>

<template>
  <div>
    <q-expansion-item
      style="border-radius: 23px"
      class="bg-grey-4 q-mx-md q-mt-md text-bold text-grey-9"
      v-model="expanded"
      icon="policy"
      label="Opções de Pesquisas"
    >
      <q-card>
        <q-card-section class="bg-grey-2">
          <div class="row q-col-gutter-md">
            <div class="col-md-4 q-pr-xs text-subtitle1 text-bold text-grey-7">
              <div class="row">
                <div class>
                  <q-btn icon="event" round color="grey-8">
                    <q-popup-proxy
                      @before-show="updateProxy1"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        color="grey-8"
                        :locale="locale"
                        v-model="proxyDate1"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancelar"
                            color="red"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="Confirmar"
                            color="primary"
                            flat
                            @click="save1"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
                <div class="col q-mt-sm q-ml-xs q-mr-md">
                  <p>
                    De:
                    <span class="text-bold text-grey-9"
                      >{{
                        date1 && date1.split("-")[2]
                          ? date1.split("-")[2]
                          : "--"
                      }}/{{
                        date1 && date1.split("-")[1]
                          ? date1.split("-")[1]
                          : "--"
                      }}/{{
                        date1 && date1.split("-")[0]
                          ? date1.split("-")[0]
                          : "--"
                      }}</span
                    >
                    <q-btn
                      size="sm"
                      rounded
                      @click="date1 = null"
                      icon="label_off"
                      class="q-ml-sm"
                      color="grey-8"
                      label
                    />
                  </p>
                </div>
              </div>
            </div>

            <div class="col-md-4 q-pr-xs text-subtitle1 text-bold text-grey-7">
              <div class="row">
                <div class>
                  <q-btn icon="event" round color="red-9">
                    <q-popup-proxy
                      @before-show="updateProxy2"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        color="red-9"
                        v-model="proxyDate2"
                        id="Data2"
                        mask="YYYY-MM-DD"
                        :locale="locale"
                      >
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn
                            label="Cancelar"
                            color="red"
                            flat
                            v-close-popup
                          />
                          <q-btn
                            label="Confirmar"
                            color="primary"
                            flat
                            @click="save2"
                            v-close-popup
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-btn>
                </div>
                <div class="col q-mt-sm q-ml-xs q-mr-md">
                  <p>
                    Até:
                    <span class="text-bold text-grey-9"
                      >{{
                        date2 && date2.split("-")[2]
                          ? date2.split("-")[2]
                          : "--"
                      }}/{{
                        date2 && date2.split("-")[1]
                          ? date2.split("-")[1]
                          : "--"
                      }}/{{
                        date2 && date2.split("-")[0]
                          ? date2.split("-")[0]
                          : "--"
                      }}</span
                    >
                    <q-btn
                      rounded
                      @click="date2 = null"
                      size="sm"
                      icon="label_off"
                      class="q-ml-sm"
                      color="red-8"
                      label
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="row q-mt-md">
            <span class="text-grey-6 text-weight-light">Resultados: </span>
            <span class="text-light-blue-6 q-ml-sm text-weight-regular">
              {{
                $store.getters.LIST_DATA
                  ? $store.getters.LIST_DATA.length
                  : "--"
              }}
              Dados</span
            >
            <q-space />
            <div class="pull-right">
              <q-btn
                rounded
                size="md"
                color="grey-6"
                class="q-mb-md q-mr-md"
                style="top: 0"
                label="Restaurar"
                icon="restore_page"
                @click="restaurar()"
              />
              <q-btn
                rounded
                size="md"
                color="blue-6"
                class="q-mb-md"
                style="top: 0"
                label="Pesquisar"
                icon="search"
                @click="filtroPesquisa()"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <div class="row flex flex-center">
      <span class="text-grey-6 text-caption text-bold">Evolunção:</span>
      <div class="col-11 q-px-md">
        <q-range
          class="q-mt-xl"
          v-model="model"
          color="grey-9"
          markers
          track-size="10px"
          thumb-color="light-blue"
          :marker-labels="fnMarkerLabel"
          :min="1"
          :max="4"
          @input="getDataBySlider()"
        />
      </div>
    </div>


  </div>
</template>

<script>
import { QSpinnerGears } from "quasar";
export default {
  name: "CovidVariantsAppAppFiltro",

  data() {
    return {
      objMarkerLabel: { 1: "2019", 2: { label: "2020" }, 3: "2021", 4: "2020" },
      locale: {
        days: "Domingo_Segunda_Terça_Quarta_Quinta_Sexta_Sábado".split("_"),
        daysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
        months:
          "Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro".split(
            "_"
          ),
        monthsShort: "Jan_Fev_Mar_Abri_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez".split(
          "_"
        ),
        firstDayOfWeek: 1,
      },
      expanded: true,
      date1: null,
      proxyDate1: "",
      date2: null,
      proxyDate2: "",
      model: {
        min: 1,
        max: 2,
      },
    };
  },

  methods: {
    async getDataBySlider() {
      let min = `${this.model.min + 2018}-01-01`;
      let max = `${this.model.max + 2018}-12-31`;

      this.$router.replace("/");

      this.$q.loading.show({
        backgroundColor: "grey-9",
        spinner: QSpinnerGears,
        spinnerColor: "white",
        message:
          'A construção do <b> Mapa Coroplético</b> está em processo.<br/><span class="text-white text-weight-bold">Aguarde ...</span>',
      });
      await this.$store.dispatch("ADD_COVID_VARIANTS");
      await this.$store.dispatch("GET_VARIANTS");
      await this.$store.dispatch("GET_COVID_VARIANTS_FILTER", {
        date1: min,
        date2: max,
      });
      this.$router.push({
        path: "/",
        query: { date1: min, date2: max },
      });

      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },
    fnMarkerLabel(val) {
      return `${val + 2018}`;
    },
    async restaurar() {
      this.$router.replace("/");
      this.date1 = null;
      this.date2 = null;

      this.$q.loading.show({
        backgroundColor: "grey-9",
        spinner: QSpinnerGears,
        spinnerColor: "white",
        message:
          'A construção do <b> Mapa Coroplético</b> está em processo.<br/><span class="text-white text-weight-bold">Aguarde ...</span>',
      });
      await this.$store.dispatch("ADD_COVID_VARIANTS");
      await this.$store.dispatch("GET_VARIANTS");
      await this.$store.dispatch("GET_COVID_VARIANTS_FILTER", {
        date1: this.date1,
        date2: this.date2,
      });

      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },

    async filtroPesquisa() {
      let isValidDate =
        new Date(this.date1).getTime() <= new Date(this.date2).getTime()
          ? true
          : false;

      if (this.date1 == null && this.date2 == null) {
        this.$q.notify({
          position: "top",
          message: "Atenção:",
          caption: "Pelo menos uma das datas é necessária!",
          color: "orange",
        });
      } else if (this.date1 !== null && this.date2 !== null) {
        if (!isValidDate) {
          this.$q.notify({
            position: "top",
            message: "Atenção:",
            caption: "A data inicial não pode ser maior que a data final!",
            color: "orange",
          });
        } else {
          this.$q.loading.show({
            backgroundColor: "grey-9",
            spinner: QSpinnerGears,
            spinnerColor: "white",
            message:
              'A construção do <b> Mapa Coroplético</b> está em processo.<br/><span class="text-white text-weight-bold">Aguarde ...</span>',
          });
          await this.$store.dispatch("ADD_COVID_VARIANTS");
          await this.$store.dispatch("GET_VARIANTS");
          await this.$store.dispatch("GET_COVID_VARIANTS_FILTER", {
            date1: this.date1,
            date2: this.date2,
          });
          this.$router.replace("/");

          this.$router.push({
            path: "/",
            query: { date1: this.date1, date2: this.date2 },
          });

          this.timer = setTimeout(() => {
            this.$q.loading.hide();
            this.timer = void 0;
          }, 3000);
        }
      } else {
        this.$router.replace("/");

        this.$q.loading.show({
          backgroundColor: "grey-9",
          spinner: QSpinnerGears,
          spinnerColor: "white",
          message:
            'A construção do <b> Mapa Coroplético</b> está em processo.<br/><span class="text-white text-weight-bold">Aguarde ...</span>',
        });
        await this.$store.dispatch("ADD_COVID_VARIANTS");
        await this.$store.dispatch("GET_VARIANTS");
        await this.$store.dispatch("GET_COVID_VARIANTS_FILTER", {
          date1: this.date1,
          date2: this.date2,
        });
        this.$router.push({
          path: "/",
          query: { date1: this.date1, date2: this.date2 },
        });

        this.timer = setTimeout(() => {
          this.$q.loading.hide();
          this.timer = void 0;
        }, 3000);
      }
    },
    getDataForChartTwoDates(date1, date2) {
      try {
      } catch (error) {}
    },
    getDataForChartOneDate(date) {
      try {
      } catch (error) {}
    },
    updateProxy1() {
      this.proxyDate1 = this.date1;
    },

    save1() {
      this.date1 = this.proxyDate1;
    },
    updateProxy2() {
      this.proxyDate2 = this.date2;
    },

    save2() {
      this.date2 = this.proxyDate2;
    },
  },
};
</script>

<style lang="scss" scoped></style>

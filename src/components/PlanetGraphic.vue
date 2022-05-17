<template>
  <div>
    <Graphic :data="data" :options="options" />
  </div>
</template>

<script>
import Graphic from "src/components/Graphic.vue";
export default {
  name: "CovidVariantsAppPlanetGraphic",
  components: { Graphic },
  data() {
    return {};
  },
  computed: {
    countries() {
      return this.$store.getters.countries ?? [];
    },
    allCovidCases() {
      return this.$store.getters.LIST_DATA;
    },
    getDataChart() {
      let data = [];
      if (this.$store.getters.LIST_VARIANTS && this.$store.getters.countries)
        this.$store.getters.LIST_VARIANTS.forEach((element) => {
          data.push({
            label: element,
            data: this.countries.map((country) => ({
              feature: country,
              value: Math.random(),
            })),
          });
        });
      return data;
    },
    data() {
      let _self = this
      return {
        labels: this.countries.map((country) => `${country.properties.name}`),
        datasets: [
          {
            label: `# Covid Variants`,
            data: this.countries.map((country) => ({
              feature: country,
              value: Math.random(),
            })),
          },
        ],
      };
    },
    options() {
      let _self = this;
      return {
        showOutline: false,
        showGraticule: false,
        scales: {
          xy: { projection: "equalEarth" },
        },
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label =
                  context.element.feature.properties.name
                    .toString()
                    .toUpperCase() || "";

                return label;
              },
              beforeTitle: (context) => {},

              afterBody: (context) => {
                return "=======================";
              },
              afterLabel: (context) => {
                let dt = "";
                if (_self.$store.getters.LIST_VARIANTS)
                  _self.$store.getters.LIST_VARIANTS.filter((x) => {
                    let model = _self.getInfoVariants(
                      context.element.feature.properties.name,
                      x
                    );

                    dt = `${dt}\n${x} : ${model.num_sequences_total}`;
                  });
                return dt;
              },
              beforeFooter: (context) => {
                return "=======================";
              },
            },
          },
        },
      };
    },
  },
  mounted() {},

  methods: {
    getInfoVariants(location, variant) {
      let model = {
        num_sequences: 0,
        num_sequences_total: 0,
        perc_sequences: 0,
      };

      if (this.allCovidCases)
        this.allCovidCases.filter((x) => {
          if (x.location == location && x.variant == variant) {
            model.num_sequences += parseFloat(x.num_sequences);
            model.num_sequences_total += parseFloat(x.num_sequences_total);
            model.perc_sequences += parseFloat(x.perc_sequences);
          }
        });

      return model;
    },
  },
};
</script>

<style lang="scss" scoped></style>

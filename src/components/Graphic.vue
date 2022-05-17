<template>
  <div>
    <canvas ref="canvas" id="myChart"></canvas>
  </div>
</template>

<script>
import * as Chartjs from "chart.js";

export default {
    name: "CovidVariantsAppGraphic",
    props: {
        data: {
            type: Object,
            default: () => { },
        },
        options: {
            type: Object,
            default: () => { },
        },
    },
    data() {
        return {

        };
    },

   async mounted() {
      await  new Chartjs.Chart(this.$refs.canvas.getContext('2d') , {
            type: "choropleth",
            data: this.data,
            options: this.options,
        });
    },

    methods: {},
};
</script>

<style lang="scss" scoped></style>

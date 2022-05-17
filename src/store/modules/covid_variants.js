import UseCovidVariant from "src/composables/UseCovidVariant.js";
import axios from "axios";
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

import * as ChartGeo from "chartjs-chart-geo";
import countriesTopoJson from "world-atlas/countries-50m.json";

export default {
  state: {
    data: null,
    covidVariants: null,
    variants: null,
    countries: ChartGeo.topojson.feature(
      countriesTopoJson,
      countriesTopoJson.objects.countries
    ).features,
  },
  getters: {
    countries: (state) => {
      return state.countries;
    },

    LIST_DATA: (state) => {
      return state.data;
    },
    LIST_COVID_VARIANTS: (state) => {
      return state.covidVariants;
    },

    LIST_VARIANTS: (state) => {
      return state.variants;
    },
  },
  mutations: {
    SET_DATA: (state, payload) => {
      state.data = payload;
    },
    SET_COVID_VARIANTS: (state, payload) => {
      state.covidVariants = payload;
    },

    SET_VARIANTS: (state, payload) => {
      state.variants = payload;
    },
  },
  actions: {
    ADD_COVID_VARIANTS(options, payload) {
      const { listAll } = UseCovidVariant();

      return new Promise((resolve, reject) => {
        axios;
        listAll()
          .then(({ data: data, status }) => {
            options.commit("SET_COVID_VARIANTS", data);
            /*  localStorage.setItem('LIST_COUNTRIES',data) */

            resolve({ data: data, status });
          })
          .catch((error) => {
            var err = error.toString().split("code");
            reject(err[1].toString().trim());
          });
      });
    },
    GET_COVID_VARIANTS_TWO_DATES(options, payload) {
      let startDate = new Date(payload.date1);
      let endDate = new Date(payload.date2);

      let res = options.getters.LIST_COVID_VARIANTS.filter((a) => {
        let date = new Date(a.date);
        return date >= startDate && date <= endDate;
      });

      options.commit("SET_DATA", res);
    },
    GET_COVID_VARIANTS_ONE_DATE(options, payload) {
      let startDate = payload;
      let res = [];

      if (payload !== null)
        res = options.getters.LIST_COVID_VARIANTS.filter(
          (a) => a.date === startDate
        );
      else res = options.getters.LIST_COVID_VARIANTS;

      options.commit("SET_DATA", res);
    },
    GET_COVID_VARIANTS_FILTER(options, payload) {
      if (payload && payload.date1 && payload.date2)
        options.dispatch("GET_COVID_VARIANTS_TWO_DATES", payload);
      else if (
        payload == undefined ||
        (payload.date1 == null && payload.date2 == null)
      )
        options.commit("SET_DATA", options.getters.LIST_COVID_VARIANTS);
      else {
        if (payload.date1 || payload.date2) {
          let dt = payload.date1 ?? payload.date2;
          options.dispatch("GET_COVID_VARIANTS_ONE_DATE", dt);
        }
      }

    },
    GET_VARIANTS(options) {
      const groupByVariants = [
        ...new Set(options.getters.LIST_COVID_VARIANTS.map((x) => x.variant)),
      ];
      options.commit("SET_VARIANTS", groupByVariants);
      localStorage.setItem("LIST_VARIANTS", JSON.stringify(groupByVariants));
    },
  },
};

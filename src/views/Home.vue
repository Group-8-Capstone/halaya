<template>
  <v-col sm='12'>
    <v-row>
      <v-col sm="7">
        <v-row>
          <v-col
            sm="4"
            v-for="(element, index) in returnFirstIngredient"
            :key="index"
          >
            <v-card
              class="mx-auto"
              max-width="344"
              outlined
            >
              <v-card-title v-bind:class="element.colorHeader + ' FontSize'">{{element.name}}</v-card-title>
              <v-card-text v-bind:class="element.colorText + ' FontSizeText'">{{element.amount}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="5">
        <v-row>
          <v-col
            sm="6"
            color="red"
            v-for="(element, index) in returnSecondIngredient"
            :key="index"
          >
            <v-card
              class="mx-auto"
              outlined
            >
              <v-card-title v-bind:class="element.colorHeader + ' FontSize'">{{element.name}}</v-card-title>
              <v-card-text v-bind:class="element.colorText  + ' FontSizeText'">{{element.amount}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        sm="6"
        class="d-flex filter"
      >
        <v-select
          :items="Dates"
          v-model="filterBy"
          @change="filtering"
          label=" Filter by"
          dense
          class="dropdownFilter"
        ></v-select>
        <v-select
          :items="Yearly"
          label=" Date"
          dense
          class="dropdownFilter"
        ></v-select>
      </v-col>
      <v-col sm="12">
        <v-card>
          <Graph
            type="area"
            height="400px"
            :options="chartOptions"
            :series="series"
          ></Graph>
        </v-card>
      </v-col>
      <v-col>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="10"
            :total-visible="7"
            circle
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import Graph from "vue-apexcharts";
import axios from "axios";
export default {
  data() {
    return {
      page: 8,
      ingredients: [
        {
          name: "Ube",
          amount: "1 kg",
          colorHeader: "cardTitle1",
          colorText: "cardText1",
        },
        {
          name: "Condence Milk",
          amount: "1 kg",
          colorHeader: "cardTitle2",
          colorText: "cardText2",
        },
        {
          name: "Evap Milk ",
          amount: "1 kg",
          colorHeader: "cardTitle3",
          colorText: "cardText3",
        },
        {
          name: "Butter",
          amount: "1 kg",
          colorHeader: "cardTitle4",
          colorText: "cardText4",
        },
        {
          name: "Sugar",
          amount: "1 kg",
          colorHeader: "cardTitle5",
          colorText: "cardText5",
        },
      ],
      Dates: ["Daily", "Weekly", "Monthly", "Yearly"],
      Yearly: [],
      series: [],
      chartOptions: {},
      filterBy: "",
      dailyData: null,
    };
  },
  mounted() {
    axios.get("http://localhost:8000/api/sales").then((response) => {
      this.dailyData = response.data;
    });
  },
  components: {
    Graph,
  },
  computed: {
    returnFirstIngredient() {
      return this.ingredients.filter((element, index) => index < 3);
    },
    returnSecondIngredient() {
      return this.ingredients.filter((element, index) => index > 2);
    },
  },
  methods: {
    initializeData(category, series) {
      this.series = [
        {
          name: "Sales",
          data: series, // serries
          color: "rgb(177, 117, 235)",
        },
      ];

      this.chartOptions = {
        chart: {
          height: 350,
          type: "area",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 6,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          align: "left",
          text: "Sold Jars",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        yaxis: {
          title: {
            text: "T o t a l",
          },
        },
        xaxis: {
          categories: category, // categories,
        },
      };
    },

    daily(data) {
      let category = [];
      let series = [];

      data.forEach((element) => {
        category.push(element.delivery_date);

        series.push(element.total);
      });
      console.log(category, series);
      this.initializeData(category, series);
    },
    filtering() {
      let graphFilter = this.filterBy;
      switch (graphFilter) {
        case "Daily":
          this.daily(this.dailyData);
          break;
      }
    },
  },
};
</script>

<style scoped>
.filter {
  padding-bottom: 0px !important;
  margin-bottom: 0px !important;
}
.dropdownFilter {
  margin-bottom: 0px !important;
  height: 43px;
  margin-left: 2%;
}
.FontSize {
  font-size: 18px;
  color: white !important;
}
.FontSizeText {
  font-size: 15px;
  color: white !important;
  height: 70px;
}
.cardTitle1,
.cardText1 {
  background-color: #03a9f4 !important;
}
.cardTitle2,
.cardText2 {
  background-color: #8bc34a !important;
}
.cardTitle3,
.cardText3 {
  background-color: #e84e40 !important;
}
.cardTitle4,
.cardText4 {
  background-color: #9c27b0 !important;
}
.cardTitle5,
.cardText5 {
  background-color: #ffc107 !important;
}
</style>

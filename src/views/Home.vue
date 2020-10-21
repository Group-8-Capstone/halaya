<template>
  <v-col sm='12'>
    <v-row>
      <v-col>
        <v-row>
          <v-col
            v-for="(element, index) in IngredientsArray"
            :key="index"
          >
            <v-card
              class="mx-auto"
              min-height="190"
              outlined
            >
              <v-card-title >{{element.ingredients_name}}</v-card-title>
              <v-card-text >{{element.ingredients_remaining}}</v-card-text>
              <v-card-text >{{element.ingredients_status}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col sm="5">
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
      </v-col> -->
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
          label=" Date"
          v-model="filterByDate"
          @change="filtering"
          :items="Years"
          dense
          class="dropdownFilter"
          :disabled="(filterBy.toLowerCase() === 'yearly' ) ? true : false "
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
            :length="12"
            :total-visible="7"
            circle
            v-if="filterBy !== 'Yearly' && filterBy !== 'Monthly'"
            @input="pageChange"
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
      page: new Date().getMonth() + 1,
      IngredientsArray: [], 
      // ingredients: [
      //   {
      //     name: "Ube",
      //     amount: "1 kg",
      //     colorHeader: "cardTitle1",
      //     colorText: "cardText1",
      //   },
      //   {
      //     name: "Condence Milk",
      //     amount: "1 kg",
      //     colorHeader: "cardTitle2",
      //     colorText: "cardText2",
      //   },
      //   {
      //     name: "Evap Milk ",
      //     amount: "1 kg",
      //     colorHeader: "cardTitle3",
      //     colorText: "cardText3",
      //   },
      //   {
      //     name: "Butter",
      //     amount: "1 kg",
      //     colorHeader: "cardTitle4",
      //     colorText: "cardText4",
      //   },
      //   {
      //     name: "Sugar",
      //     amount: "1 kg",
      //     colorHeader: "cardTitle5",
      //     colorText: "cardText5",
      //   },
      // ],
      Dates: ["Daily", "Weekly", "Monthly", "Yearly"],
      Years: [],
      series: [],
      chartOptions: {},
      filterBy: "Daily",
      filterByDate: new Date().getFullYear(),
    };
  },
  mounted() {
    this.filterByYear();
    this.daily();
  },
  components: {
    Graph,
  },
  created(){
    this.fetchIngredients();
  },
  computed: {
    // returnFirstIngredient() {
    //   return this.ingredients.filter((element, index) => index < 3);
    // },
    // returnSecondIngredient() {
    //   return this.ingredients.filter((element, index) => index > 2);
    // },
  },
  methods: {
    fetchIngredients(){
      axios.get("http://127.0.0.1:8000/api/fetch/stock").then(response => {
        let results = [];
        for (var i = 0; i < response.data.length; i++) {
          if (this.containsObject(results,response.data[i].id)) {
            console.log("good");
          } else {
            results.push(response.data[i]);
            this.IngredientsArray = results;
          }
          continue;
        }
        console.log("ingredients array: ", this.IngredientsArray);
      });
    },
    containsObject(arr,id) {
      return arr.some(function(el) {
        return el.id === id;
      }); 
    },
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
          title: {
            text: this.clickTitle(),
          },
        },
      };
    },
    daily() {
      /**
       * get the necessary DAILY DATA on mounted
       */
      let parameter = {
        year: this.filterByDate,
        month: this.page,
      };
      axios
        .post("http://localhost:8000/api/sales/daily", parameter)
        .then((response) => {
          let category = [];
          let series = [];
          if (response.data.length > 0) {
            response.data.forEach((element) => {
              category.push(element.delivery_date);
              series.push(element.total);
            });
            // console.log(category, series);
            this.initializeData(category, series);
          } else {
            let year = this.filterByDate;
            let month = String(this.page);
            let days = "";
            let lastday = Number(
              new Date(new Date(year, month, 1) - 1).getDate()
            );
            if (month.length === 1) {
              month = "0" + month;
            }
            console.log(month);
            for (var i = 1; i < lastday + 1; i++) {
              let days = String(i);
              if (days.length === 1) {
                days = "0" + days;
              }
              category.push(year + "-" + month + "-" + days);
              series.push(0);
              console.log(year + "-" + month + "-" + days);
            }
            this.initializeData(category, series);
          }
        });
    },
    filtering() {
      /**
       * when the filter by is clicked this method is called
       */
      let graphFilter = this.filterBy;
      switch (graphFilter) {
        case "Daily":
          this.daily();
          break;
        case "Weekly":
          this.weekly();
          break;
        case "Monthly":
          this.monthly();
          break;
        case "Yearly":
          this.yearly();
          break;
      }
    },
    weekly() {
      // 'w' + (index + 1)
      let parameter = {
        year: this.filterByDate,
      };
      axios
        .post("http://localhost:8000/api/sales/weekly", parameter)
        .then((response) => {
          let weeklyCategory = [];
          let weeklySeries = [];
          let data = response.data;
          if (data.length > 0) {
            data.forEach((element, index) => {
              if (element[0].totals === null) {
                weeklySeries.push(0);
                weeklyCategory.push("Week" + (index + 1));
              } else {
                weeklyCategory.push("Week" + (index + 1));
                weeklySeries.push(element[0].totals);
              }
            });
            this.initializeData(weeklyCategory, weeklySeries);
          }
        });
    },
    monthly() {
      let parameter = {
        year: this.filterByDate,
      };
      axios
        .post("http://localhost:8000/api/sales/monthly", parameter)
        .then((response) => {
          let monthlyCategory = [];
          let monthlySeries = [];
          let WordMonths = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];
          let data = response.data;
          if (data.length > 0) {
            data.forEach((element) => {
              let ConverttoNumber = Number(element.months) - 1;
              monthlyCategory.push(WordMonths[ConverttoNumber]);
              monthlySeries.push(element.totals);
            });
            this.initializeData(monthlyCategory, monthlySeries);
          }
        });
    },
    yearly() {
      axios.get("http://localhost:8000/api/sales/yearly").then((response) => {
        let yearlyCategory = [];
        let yearlySeries = [];
        let data = response.data;
        console.log(data);
        if (data.length > 0) {
          data.forEach((element) => {
            yearlyCategory.push(element.years);
            yearlySeries.push(element.totals);
          });
          this.initializeData(yearlyCategory, yearlySeries);
        }
      });
    },
    filterByYear() {
      axios
        .get("http://localhost:8000/api/sales/filterYear")
        .then((response) => {
          let tempYears = [];
          response.data.forEach((element) => {
            tempYears.push(element.years);
          });
          this.Years = tempYears;
        });
    },
    pageChange() {
      console.log("page number: ", this.page);
      this.filtering();
    },
    clickTitle() {
      if (this.filterBy == "Daily") {
        return "Days";
      } else if (this.filterBy == "Monthly") {
        return "Months";
      } else if (this.filterBy == "Weekly") {
        return "Weeks";
      } else if (this.filterBy == "Yearly") {
        return "Years";
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

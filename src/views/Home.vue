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
              id="cards"
              class="mx-auto text-center"
              min-height="220"
              max-height="240"
              min-width="200"
              max-width="2000"
              
            >
              <v-card-title class="deep-purple lighten-5" id="title">{{element.ingredients_name}}</v-card-title>
              <hr>
              <v-spacer/>
              <v-card-text id="qty">{{element.ingredients_remaining + ' kg/cans'}}</v-card-text>
              <v-chip outlined :color="getColor(element.ingredients_status)">{{element.ingredients_status}}</v-chip>
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
  methods: {
    getColor (status) {
        if (status ==='Alert! Very Low') return 'red'
        else if (status ==='Warning! Running Low') return 'orange'
        else if (status ==='Calculating...') return 'blue'
        else return 'green'
    }, 
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
#title{
  justify-content: center;
}
#qty{
  font-weight: bold;
}
#cards{
  border: 1px solid;
  border-color: purple;
  border-radius: 10px;
}
</style>

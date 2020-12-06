<template>
  <div id="app">
    <v-spacer></v-spacer>
    <v-btn class="mr-5" outlined float-right small color="purple" @click="toolbarClick">
      <v-icon>mdi-download</v-icon>Export as CSV
    </v-btn>
    <ejs-grid
      ref="grid"
      id="Grid"
      :dataSource="data"
      :toolbar="toolbarOptions"
      height="272px"
      :allowExcelExport="true"
      :toolbarClick="toolbarClick"
    >
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" textAlign="Right" width="120"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
        <e-column field="ShipCity" headerText="Ship City" width="150"></e-column>
        <e-column field="ShipName" headerText="Ship Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>
<script>
import Vue from "vue";
import { GridPlugin, Toolbar, ExcelExport } from "@syncfusion/ej2-vue-grids";
import { DataManager, ODataAdaptor } from "@syncfusion/ej2-data";

Vue.use(GridPlugin);

export default {
  data() {
    let SERVICE_URI =
      "https://js.syncfusion.com/demos/ejServices/Wcf/Northwind.svc/Orders?$top=7";
    return {
      data: new DataManager({
        url: SERVICE_URI,
        adaptor: new ODataAdaptor()
      }),
      toolbarOptions: ["ExcelExport"]
    };
  },
  methods: {
    toolbarClick: function(args) {
      if (args.item.id === "Grid_excelexport") {
        // 'Grid_excelexport' -> Grid component id + _ + toolbar item name
        this.$refs.grid.excelExport();
      }
    }
  },
  provide: {
    grid: [Toolbar, ExcelExport]
  }
};
</script>
<style>
@import "../../node_modules/@syncfusion/ej2-vue-grids/styles/material.css";
</style>
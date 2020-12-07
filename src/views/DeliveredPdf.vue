<template>
  <div class="mt-5">
    <v-spacer></v-spacer>
    <!-- <v-btn class="mr-5" outlined float-right small color="purple" @click="generateReport">
      <v-icon>mdi-download</v-icon>Export as PDF
    </v-btn>-->

    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn outlined small color="purple" v-bind="attrs" v-on="on">
            <v-icon>mdi-download</v-icon>EXPORT
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, index) in dropdown" :key="index">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>

    <vue-html2pdf
      :show-layout="false"
      :float-layout="true"
      :enable-download="true"
      :preview-modal="false"
      :paginate-elements-by-height="5000"
      :filename="'Delivered Orders'"
      :pdf-quality="2"
      :manual-pagination="false"
      pdf-format="a4"
      pdf-orientation="portrait"
      pdf-content-width="800px"
      ref="html2Pdf"
    >
      <section slot="pdf-content">
        <section class="pdf-item" justify="center">
          <center>
            <div>
              <br>
              <img class="logo" width="50" :src="require('@/assets/wawens.png')">
            </div>
            <div>
              <h4>WAWEN'S UBE HALAYA</h4>
              <h6>DELIVERED ORDERS</h6>
              <h6></h6>
              <br>
            </div>
          </center>
          <div style="margin:1px" class="pa-0">
            <div>
              <v-data-table
                :headers="headers"
                :items="deliveredOrder"
                hide-default-footer
                disable-pagination
              >
                <template v-slot:item.preferred_delivery_date="{ item }">
                  <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
                </template>
                <template v-slot:item.order_status="{ item }">
                  <v-chip color="green">{{ item.order_status }}</v-chip>
                </template>
              </v-data-table>
              <br>
            </div>
          </div>
        </section>
      </section>
    </vue-html2pdf>
  </div>
</template>
<script src="https://code.jquery.com/jquery-1.12.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>
<script>
import VueHtml2pdf from "vue-html2pdf";
export default {
  name: "DeliveredPdf",
  props: ["headers", "deliveredOrder"],
  components: {
    VueHtml2pdf
  },
  data() {
    return {
      dropdown: [{ title: "Export as PDF" }, { title: "Export as CSV" }]
    };
  },
  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    }
  }
};
</script>

<style scoped>
.logo {
  border-radius: 50%;
  width: 10%;
  height: 10%;
  margin-left: auto;
  margin-right: auto;
}
v-data-table {
  width: 100%;
}
</style>
<template>
  <div>
    <v-btn class="mr-5" text float-right small @click="generateReport">Export as PDF</v-btn>
    <center>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="false"
        :paginate-elements-by-height="1100"
        :filename="'Delivered Orders'"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="1100px"
        ref="html2Pdf"
      >
        <section slot="pdf-content" justify="center" class="pa-5 mx-20">
          <section class="pdf-item" justify="center">
            <center>
              <div>
                <br>
                <img class="logo" width="50" :src="require('@/assets/wawens.png')">
              </div>
              <div>
                <h4>WAWEN'S UBE HALAYA</h4>
                <h6>DELIVERED ORDERS</h6>
                <br>
              </div>
            </center>
            <div>
              <div>
                <v-data-table
                  :headers="headers"
                  :items="deliveredOrder"
                  :hide-default-footer="true"
                  :disable-pagination="true"
                >
                  <template v-slot:item.preferred_delivery_date="{ item }">
                    <span>{{new Date(item.preferred_delivery_date).toISOString().substring(0,10)}}</span>
                  </template>
                  <template v-slot:item.order_status="{ item }">
                    <v-chip color="green" text-color="white">{{ item.order_status }}</v-chip>
                  </template>
                </v-data-table>
                <br>
              </div>
            </div>
          </section>
        </section>
      </vue-html2pdf>
    </center>
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
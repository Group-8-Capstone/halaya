<template>
  <div class="mt-5">
    <v-spacer></v-spacer>
    <v-btn class="mr-5" outlined float-right small color="purple" @click="generateReport">
      <v-icon>mdi-download</v-icon>Export as PDF
    </v-btn>
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
        <section class="pdf-item">
          <center style="margin:50px">
            <div>
              <img class="logo" width="50" :src="require('@/assets/wawens.png')">
            </div>
            <div>
              <h4>WAWEN'S UBE HALAYA</h4>
              <h6>DELIVERED ORDERS</h6>
            </div>
          </center>
          <div style="margin:50px" class="pa-5">
            <div class="border border-2 mx-auto p-3 rounded">
              <div>
                <v-data-table :headers="headers" :items="deliveredOrder">
                  <template v-slot:item.order_status="{ item }">
                    <v-chip color="green">{{ item.order_status }}</v-chip>
                  </template>
                </v-data-table>
              </div>
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

<style>
v-simple-table {
  width: 100%;
}
.title {
  text-align: center;
  margin-top: 20px;
}
.divider {
  margin-top: 80px;
}
.logo {
  border-radius: 50%;
  width: 10%;
  length: 10%;
  margin-left: auto;
  margin-right: auto;
}
.table {
  text-align: left;
}
.v-text-field {
  padding: 0px;
  margin: 0px;
}
.col {
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0px;
}
p,
b {
  letter-spacing: 1px;
  font-size: 14px;
}
h3,
b {
  letter-spacing: 1px;
}
.v-input__slot {
  margin-bottom: 0px;
}
.date_picker {
  height: 40px !important;
}
.v-text-field__slot {
  height: 40px !important;
}
.v-application p {
  margin-bottom: 0px;
}
</style>
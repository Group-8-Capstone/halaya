<template>
  <div>
    <v-card flat class="ma-5 mb-12 pa-5">
      <v-card-title>
        Deliveries For Today
        <v-spacer></v-spacer>
      </v-card-title>
      <v-tabs v-model="tabs" right color="deep-purple accent-4">
        <v-tab>Grouped</v-tab>
        <v-tab>Tabulated</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <div>
            <SortLocation/>
          </div>
          <br>
          <Batch/>
        </v-tab-item>
        <v-tab-item>
          <Tabulated/>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>
<style scoped>
</style>
<script>
import SortLocation from "../components/SortLocation.vue";
import Batch from "../components/BatchToDeliver.vue";
import Tabulated from "../components/TabulatedToDeliver.vue";
export default {
  components: {
    SortLocation,
    Batch,
    Tabulated
  },
  data() {
    return {
      tabs: null
    };
  }
};
</script>



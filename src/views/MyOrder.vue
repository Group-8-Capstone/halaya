<template>
    <div>
        <v-tabs v-model="tabs" right color="deep-purple accent-4">
            <v-tab>On Order</v-tab>
            <v-tab>Past</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tabs">
            <v-tab-item>
                <v-card>
                    <v-data-table :headers="headers" :items="myOrders" :search="search">
                    </v-data-table>
                </v-card>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'MyOrders',
    data() {
        return {
            myOrders: [],
            search: '',
            headers: [
                {text: "Product Name", value: "", sortable: false},
                {text: "Quantity", value: "", sortable: false},
                {text: "Delivery Address", value: "", sortable: false},
                {text: "Delivery Date", value: "", sortable: false},
                ]
        }
    }
}
</script>
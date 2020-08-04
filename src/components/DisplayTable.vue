<template>
  <div>
    <div>
      <b-button @click="getBiller">Get Biller</b-button>
    </div>
    <div id="DisplayTable" class="container">
      <b-table :data="BillerList" :columns="columns"></b-table>
    </div>
    <div>
      <vue-json-pretty :data="BillerList"></vue-json-pretty>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJsonPretty from "vue-json-pretty";
const baseURL = process.env.VUE_APP_BASE_URL;
export default {
  name: "DisplayTable",
  components: {
    VueJsonPretty
  },
  data() {
    return {
      BillerList: [],
      columns: [
        {
          field: "id",
          label: "ID"
        },
        {
          field: "email",
          label: "EMAIL"
        },
        {
          field: "phoneNumber",
          label: "PHONE NUMBER"
        }
      ]
    };
  },
  methods: {
    getBiller() {
      console.log(this.baseURL, "base");
      axios
        .get(baseURL + "getAll")
        .then(response => (this.BillerList = response.data));
    }
  }
};
</script>

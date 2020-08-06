<template>
  <div>
    <section class="section">
      <div class="container box">
        <div id="DisplayTable">
          <b-table :data="BillerList" :hoverable="isHoverable">
            <template slot-scope="props">
              <b-table-column field="name.fName" label="First Name">{{ props.row.name.fName }}</b-table-column>

              <b-table-column field="name.lName" label="Last Name">{{ props.row.name.lName }}</b-table-column>

              <b-table-column field="email" label="Email">{{ props.row.email }}</b-table-column>

              <b-table-column field="phoneNumber" label="Phone Number">{{ props.row.phoneNumber }}</b-table-column>

              <b-table-column label="Actions">
                <fa-icon class="mr1" @click.prevent="updateBiller(props.row.id)" icon="edit"></fa-icon>
                <fa-icon @click.prevent="deleteBiller(props.row.id)" icon="trash" size="is-small"></fa-icon>
              </b-table-column>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container box">
        <vue-json-pretty :data="BillerList"></vue-json-pretty>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import VueJsonPretty from "vue-json-pretty";
const baseURL = process.env.VUE_APP_BASE_URL;
export default {
  name: "DisplayTable",
  components: {
    VueJsonPretty,
  },
  data() {
    return {
      BillerList: [],
      columns: [
        {
          field: "name.fname",
          label: "First Name",
        },
        {
          field: "name.lname",
          label: "Last Name",
        },
        {
          field: "email",
          label: "EMAIL",
        },
        {
          field: "phoneNumber",
          label: "PHONE NUMBER",
        },
      ],
      isHoverable: false,
      isFocusable: true,
    };
  },
  mounted() {
    this.getBiller();
  },
  methods: {
    getBiller() {
      console.log(this.baseURL, "base");
      axios
        .get(baseURL + "getAll")
        .then((response) => (this.BillerList = response.data));
    },

    updateBiller(billerId) {
      console.log(billerId);
    },

    async deleteBiller(billerId) {
      try {
        await axios.delete(baseURL + "delete/" + billerId);
        alert("Deleted Successfully!");
        this.getBiller();
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
  },
};
</script>

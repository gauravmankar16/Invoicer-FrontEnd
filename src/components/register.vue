<template>
  <div>
    <section class="section has-background-white-ter" style="height: 100vh">
      <div class="container box">
        <div class="columns">
          <div class="column">
            <form action @submit.prevent="registerForm">
              <vue-form-generator tag="div" :schema="schema" :model="model"></vue-form-generator>
              <b-button @click="registerForm" type="is-primary">Register</b-button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import registerSchema from "../assets/registerSchema";
import axios from "axios";
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";

Vue.use(VueFormGenerator);

const baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "register",
  components: {
    "vue-form-generator": VueFormGenerator.component,
  },
  mounted() {},
  data() {
    return {
      model: {
        name: {
          fName: "",
          lName: "",
        },
        email: "",
        phoneNumber: "",
      },
      schema: registerSchema,
    };
  },
  methods: {
    async registerForm() {
      try {
        await axios.post(baseURL + "saveBiller", {
          ...this.model,
        });
        alert("Registered Successfully!");
      } catch (e) {
        console.log(e);
        alert(e.message);
      }
    },
    // registerForm() {
    //   console.log(this.model, "MODElForm");
    //   axios
    //     .post(baseURL + "saveBiller", { ...this.model })
    //     .then(alert("Saved Successfully!"));
    // },
  },
};
</script>
<style>
.vue-form-generator > div {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-grow: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 2%;
  width: 50%;
}

.field-wrap,
.wrapper {
  width: 100%;
}
</style>
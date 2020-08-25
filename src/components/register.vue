<template>
  <div class="bgColor">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box box-background-color mt5">
            <div class="columns">
              <div class="column is-three-fifths">
                <div align="center" class="mt5">
                  <img src="../assets/images/invoicerLogin.jpg" />
                </div>
              </div>
              <div class="column loginCard">
                <form action @submit.prevent="registerForm">
                  <vue-form-generator tag="div" :schema="schema" :model="model"></vue-form-generator>
                  <b-field label="Password">
                    <password placeholder="Password" v-model="model.password" />
                  </b-field>
                  <b-button
                    class="registerBtn"
                    expanded
                    @click="registerForm"
                    type="is-dark"
                  >{{buttonMsg}}</b-button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import registerSchema from "../assets/registerSchema";
import axios from "axios";
import Vue from "vue";
import VueFormGenerator from "vue-form-generator";
import Password from "vue-password-strength-meter";

Vue.use(VueFormGenerator);

const baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "register",
  components: {
    "vue-form-generator": VueFormGenerator.component,
    Password,
  },
  mounted() {
    if (localStorage?.billerId) {
      this.getBillerById(localStorage.billerId);
      this.buttonMsg = "Update";
    } else {
      this.buttonMsg = "Register";
    }
  },
  beforeDestroy() {
    localStorage.removeItem("billerId");
  },
  data() {
    return {
      model: {
        name: {
          fName: "",
          lName: "",
        },
        email: "",
        phoneNumber: "",
        password: "",
      },
      schema: registerSchema,
      formOptions: {
        validateAfterChanged: true,
      },
      buttonMsg: "",
    };
  },
  methods: {
    getBillerById(billerId) {
      axios.get(baseURL + "getBillerById/" + billerId).then((response) => {
        this.model = response.data;
      });
    },

    async registerForm() {
      try {
        if (localStorage?.billerId) {
          await axios.put(baseURL + "update/" + localStorage.billerId, {
            ...this.model,
          });
          localStorage.removeItem("billerId");
          alert("Updated Successfully!");
          this.model = {};
        } else {
          await axios.post(baseURL + "api/registerBiller", {
            ...this.model,
          });
          alert("Registered Successfully!");
          this.model = {};
        }
      } catch (e) {
        alert(e.message);
      }
    },
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
  padding: 0 4%;
  width: 50%;
}

.field-wrap,
.wrapper {
  width: 100%;
}
input {
  width: 24rem;
  margin-bottom: 20px;
}
label {
  font-weight: bold;
}
.registerBtn {
  width: 91.7% !important;
  margin-left: 1rem;
  border-radius: 5px;
}
.bgColor {
  background-color: maroon !important;
  height: 102vh !important;
}
.form-group {
  width: 100%;
}
.Password__field {
  background-color: white !important;
  border: 1px solid black !important;
  border-radius: 5px !important;
  height: 2.2rem !important;
}
.field {
  width: 92%;
  margin-left: 1rem;
}
</style>
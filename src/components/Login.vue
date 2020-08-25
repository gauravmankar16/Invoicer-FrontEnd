<template>
  <div class="bgColor">
    <div class="container">
      <div class="columns">
        <div class="column">
          <div class="box box-background-color mt5">
            <div class="columns is-gapless">
              <div class="column is-three-fifths">
                <div align="center" class="mt4">
                  <img src="../assets/images/invoicerLogin.jpg" />
                </div>
              </div>
              <div class="column loginCard">
                <div class="pd1">
                  <div>
                    <b-field
                      label="Username"
                      :type="{ 'is-danger': hasError }"
                      :message="{ 'Username is not available': hasError }"
                    >
                      <b-input placeholder="Email" v-model="model.username" maxlength="30"></b-input>
                    </b-field>
                    <b-field
                      label="Password"
                    >
                      <b-input placeholder="Password" v-model="model.password" maxlength="30"></b-input>
                    </b-field>
                  </div>

                  <div class="buttons">
                    <b-button @click="login()" type="is-dark" expanded>Login</b-button>
                  </div>
                  <div class="buttons mt1">
                    <p class="ml2">Don't have an account? Register below.</p>
                    <b-button @click="$router.push('register')" type="is-dark" expanded>Register</b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

Vue.use(Buefy);

// const baseURL = process.env.VUE_APP_BASE_URL;
export default {
  name: "login",
  data() {
    return {
      hasError: Boolean,
      model: {
        username: "",
        password: "",
      },
      password1: null,
    };
  },
  methods: {
    login: function () {
      this.$store
        .dispatch("login", this.$data.model)
        .then(() => this.$router.push("/dashboard"))
        .catch((err) => console.log(err));
    },
    // async userAuthentication() {
    //   try{
    //     axios({
    //       method: 'post',
    //       url: baseURL + 'api/userAuth',
    //       data: this.$data.model
    //     })
    //     .then(response => {
    //       console.log(response);
    //       if(response){
    //         localStorage.
    //       this.$router.push('/billerList')
    //     }
    //     else{
    //       this.hasError = true;
    //     }
    //     })
    //   //   await axios.get(baseURL + "userAuth", {...this.$data.model}).then( (response) => {
    //   //   var resp = response;
    //   //   if(resp){
    //   //     this.$router.push('/billerList')
    //   //   }
    //   //   else{
    //   //     this.hasError = true;
    //   //   }
    //   // });
    //   }
    //   catch (e){
    //     console.log(e);
    //   }
    // },
  },
};
</script>
<style>
.title {
  font-family: "Times New Roman", Times, serif;
}
.Password__field {
  background-color: white !important;
  border: 1px solid black !important;
  border-radius: 5px !important;
  height: 2.2rem !important;
}
.field{
  width: 100% !important;
  margin-left: 0rem !important;;
}
.Password {
  max-width: none !important;
}
input {
  border: 2px solid black !important;
  border-radius: 7px !important;
  height: 2.6rem !important;
  font-size: 1rem !important;
}
.button {
  border-radius: 7px !important;
}
.bgColor {
  background-color: maroon;
  height: 102vh !important;
}
.loginCard {
  background-color: white;
  border-radius: 0px 6px 6px 0px;
}
.box {
  padding: 0 !important;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.input {
  border-width: 1px;
}
</style>
<template>
  <div>
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box box-background-color">
            <div>
              <h1 class="title" centered>Welcome to Invoicer</h1>
            </div>
            <div class="buttons">
              <b-button @click="$router.push('register')" type="is-primary" expanded>Register</b-button>
            </div>
            <div class="buttons">
              <b-button @click="$router.push('billerList')" type="is-primary" expanded>Biller List</b-button>
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
export default {
  name: "home",
};
</script>
<style>
</style>
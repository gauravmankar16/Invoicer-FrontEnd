<template>
  <section>
    <div class="columns">
      <div class="column is-full">
        <nav class="navbar" role="navigation" aria-label="main navigation">
          <div class="navbar-brand">
            <a class="navbar-item" href="https://bulma.io">
              <img src="../assets/images/navLogo.jpg" width="112" height="28" />
            </a>

            <a
              role="button"
              class="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbarBasicExample"
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item">Home</a>

              <a class="navbar-item">Documentation</a>

              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">More</a>

                <div class="navbar-dropdown">
                  <a class="navbar-item">About</a>
                  <a class="navbar-item">Jobs</a>
                  <a class="navbar-item">Contact</a>
                  <hr class="navbar-divider" />
                  <a class="navbar-item">Report an issue</a>
                </div>
              </div>
            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <a href="#" class="btn" @click="logout()">Log out</a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="columns">
      <div class="column is-2" style="100vh">
        <side-bar></side-bar>
      </div>
      <div class="column has-background-white-ter" style="height:100%">
        <router-view></router-view>
      </div>
    </div>
  </section>
</template>
<script>
import SideBar from "./SideBar.vue";
export default {
  name: "dashboard",
  components: {
    SideBar,
  },
  methods: {
    logout: function() {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    }
  }
};
</script>
<style scoped>
.navbar-brand img {
  height: 50px;
  float: left;
  margin-right: 40px;
  margin-left: 40px;
}
.navbar-item img {
  max-height: 2.5rem;
}
.column {
  padding-bottom: 0 !important;
}
</style>
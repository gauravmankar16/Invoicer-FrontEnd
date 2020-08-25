<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar position="static" :mobile="mobile" type="is-light" open>
        <div class="p-1">
          <b-menu>
            <b-menu-list label="Menu">
              <b-menu-item label="Invoices">
                <b-menu-item tag="router-link" to="/addInvoice" label="Add Invoices"></b-menu-item>
                <b-menu-item label="List Invoices"></b-menu-item>
              </b-menu-item>
              <b-menu-item label="Products">
                <b-menu-item label="Add Products"></b-menu-item>
                <b-menu-item label="List Products"></b-menu-item>
              </b-menu-item>
              <b-menu-item label="Payers">
                <b-menu-item label="Add Payers"></b-menu-item>
                <b-menu-item label="List Payers"></b-menu-item>
              </b-menu-item>
            </b-menu-list>
            <b-menu-list label="Actions">
              <b-menu-item label="Logout" @click="logout()"></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "SideBar",
      mobile: "reduce",
    };
  },
  methods: {
    logout: function () {
      this.$store
        .dispatch("logout")
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.p-1 {
  padding: 1em;
}
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
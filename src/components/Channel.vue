<template>
  <section class="section">
    <b-collapse class="card" animation="slide" aria-id="contentIdForA11y3">
      <div
        slot="trigger"
        slot-scope="props"
        class="card-header"
        role="button"
        aria-controls="contentIdForA11y3"
      >
        <p class="card-header-title">Mail</p>
        <a class="card-header-icon">
          <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
        </a>
      </div>
      <div class="card-content">
        <div class="content">
          <div class="columns">
            <div class="column is-half">
              <p>
                <strong>
                  Payer will receive the mail shown in preview from :
                  <span
                    style="color: #c80815;"
                  >no-reply@invoicer.com</span>
                </strong>
              </p>
              <b-field label="Payer Email">
                <b-input v-model="invoice.payerEmail" readonly="true"></b-input>
              </b-field>
              <b-field label="Mail Subject">
                <b-input v-model="preferences.mail.subject"></b-input>
              </b-field>
              <b-field label="Mail Message">
                <b-input type="textarea" v-model="preferences.mail.message"></b-input>
              </b-field>
            </div>
            <div class="column is-half has-background-white-ter">
              <div class="columns">
                <div class="column">
                  <p class="box" style=" border-radius: 1px!important;">
                    <span class="has-text-weight-bold">Subject :</span>
                    {{ preferences.mail.subject }}
                  </p>
                </div>
              </div>
              <div class="columns">
                <div class="column">
                  <EmailPreview :invoiceInfo="invoice" :channelInfo="preferences"></EmailPreview>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <a class="card-footer-item">Save</a>
        <a class="card-footer-item">Edit</a>
        <a class="card-footer-item">Delete</a>
      </footer>
    </b-collapse>
  </section>
</template>
<script>
import EmailPreview from "./EmailPreview";
import axios from "axios";
const baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "Channel",
  components: {
    EmailPreview,
  },
  data() {
    return {
      preferences: {
        mail: {
          emailId: "",
          subject: "Invoicer : ",
          message: "Updated Invoice.",
        },
      },
      invoice: {
          payerEmail: '',
          payerName: ''
      }
    };
  },
  mounted() {
      this.getInvoiceData();
  },
  methods: {
      getInvoiceData(){
          axios.get(baseURL + 'api/getInvoiceData/' + this.$route.query.invoiceid).then(response => {
              this.invoice = response.data;
              console.log(response,"invoicedataS")
          })
      }
  }
};
</script>
<style>
.box {
  border: 1px solid black;
  padding: 6px !important;
  box-shadow: none;
  color: #363636;
  border-radius: 5px !important;
}
.section {
  padding: 0rem 0.7rem 0.6rem 0rem;
}
</style>
<template>
  <section>
    <div class="box">
      <div class="columns">
        <div class="column">
          <img src="../assets/images/emailLogo.jpg" alt />
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <p>Hi {{invoiceInfo.payerName}} ,</p>
          <p>{{channelInfo.mail.message}}</p>
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column">
          <h5>Total: Rs. {{invoiceInfo.total}}</h5>
          <p>Due Date - {{invoiceInfo.dueDate | moment}}</p>
        </div>
      </div>
      <hr />
      <div class="columns">
        <div class="column">
          <h6>Invoice Information :</h6>
          <p>Invoice Number :  {{invoiceInfo.invoiceNo}}</p>
          <p>Date of Creation : {{invoiceInfo.createdOn | moment}}</p>
          <p>Number of Products : {{invoiceInfo.invoiceList.length}}</p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment';

export default {
  name: "EmailPreview",
  props: ["channelInfo", "invoiceInfo"],
  data() {
    return {};
  },
  filters: {
  moment: function (date) {
    return moment.unix(date).format("DD-MM-YYYY");
  }
}
};
</script>
<template>
  <section>
    <div class="container">
      <div class="columns">
        <div class="column is-offset-2">
          <div>
            <img class="imgBox" @click="selectTemplate(1)" src="../assets\images\invoice_with_free_text.png" alt />
          </div>
        </div>
        <div class="column">
          <img class="imgBox" @click="selectTemplate(2)" src="../assets\images\invoice_without_free_text.png.png" alt />
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
    name: "AddInvoice",
    methods: {
        selectTemplate(templateNo) {
            this.$router.push('/invoiceForm?template='+ templateNo)
        }
    }
};
</script>
<style>
.imgBox:hover {
  -moz-box-shadow: 0 0 10px #ccc;
  -webkit-box-shadow: 0 0 10px #ccc;
  box-shadow: 0 0 10px #ccc;
  cursor: pointer;
}
</style>
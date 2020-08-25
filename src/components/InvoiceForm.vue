<template>
  <section class="section">
    <div style="text-align:center;">
      <h1>
        <b>{{ timestamp }}</b>
      </h1>
    </div>
    <section>
      <div class="columns box date">
        <div class="column is-4">
          <b-field label="Payer Name">
            <b-input v-model="invoice.payerName"></b-input>
          </b-field>
          <b-field label="Payer Email">
            <b-input v-model="invoice.payerEmail"></b-input>
          </b-field>
        </div>
        <div class="column is-4">
          <b-field label="Due Date">
            <b-datepicker
              :show-week-number="false"
              placeholder="Due Date"
              icon="calendar-today"
              size="is-small"
              trap-focus
            />
          </b-field>
          <b-field label="Invoice Number">
            <b-input v-model="invoice.invoiceNo" placeholder="INV-001" disabled></b-input>
          </b-field>
        </div>
        <div class="column">
          <div id="app" class="container">
            <section>
              <b-field>
                <b-upload v-model="dropFiles" multiple drag-drop>
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <b-icon icon="upload" size="is-large"></b-icon>
                      </p>
                      <p>Upload logo for Invoice</p>
                    </div>
                  </section>
                </b-upload>
              </b-field>

              <div class="tags">
                <span v-for="(file, index) in dropFiles" :key="index" class="tag is-dark">
                  {{file.name}}
                  <button
                    class="delete is-small"
                    type="button"
                    @click="deleteDropFile(index)"
                  ></button>
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
    <!--  Free text 1  -->
    <section v-if="templateNo===1">
      <div class="columns box mt2">
        <div class="column is-full">
          <b-field label="Free Text">
            <b-input maxlength="200" type="textarea"></b-input>
          </b-field>
        </div>
      </div>
    </section>
    <!-- Table -->
    <section>
      <div class="columns box mt2">
        <div class="column">
          <div class="columns is-full">
            <div class="column">
              <b-table :data="invoice.invoiceList" :hoverable="isHoverable">
                <template slot-scope="props">
                  <b-table-column field="id" label="Id">{{ props.row.id }}</b-table-column>

                  <b-table-column field="name" label="Name">
                    <b-input v-model="props.row.name" placeholder="Name" />
                  </b-table-column>

                  <b-table-column field="descr" label="Description">
                    <b-input v-model="props.row.descr" placeholder="Description" />
                  </b-table-column>

                  <b-table-column field="price" label="Price">
                    <b-input
                      @input="calculateTotal"
                      v-model="props.row.price"
                      placeholder="Price"
                      type="number"
                    />
                  </b-table-column>

                  <b-table-column field="quantity" label="Quantity">
                    <b-input
                      @input="calculateTotal"
                      v-model="props.row.quantity"
                      placeholder="Quantity"
                      type="number"
                    />
                  </b-table-column>

                  <b-table-column field="productTotal" label="Total" numeric>
                    <b-input v-model="props.row.productTotal" />
                  </b-table-column>

                  <b-table-column label="Actions">
                    <fa-icon
                      @click.prevent="deleteEntry(props.row.id)"
                      icon="trash"
                      size="is-small"
                    ></fa-icon>
                  </b-table-column>
                </template>
              </b-table>
            </div>
          </div>
          <div class="columns">
            <div class="column has-text-right">
              <button class="is-primary button" @click="addProduct">
                <fa-icon icon="plus" size="md" />
                <span class="ml1">Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!--  Free text 2  -->
    <section v-if="templateNo===1">
      <div class="columns box mt2">
        <div class="column is-full">
          <b-field label="Free Text">
            <b-input maxlength="200" type="textarea"></b-input>
          </b-field>
        </div>
      </div>
    </section>
    <!-- Footer and Total -->
    <section>
      <div class="columns mt2">
        <div class="column pd0 is-8">
          <b-field label="Footer" class="box footerBox pd1">
            <b-input maxlength="200" type="textarea"></b-input>
          </b-field>
        </div>
        <div class="column box ml1">
          <div class="columns pd1">
            <div class="column">
              <label>Discount :</label>
            </div>
            <div class="column">
              <b-select
                size="is-small"
                placeholder="Select discount percent"
                @input="discountTotal($event)"
              >
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="15">15%</option>
              </b-select>
            </div>
          </div>
          <hr style="height: 2px;margin: 12px 16px" class="has-background-primary" />

          <div class="columns pd1">
            <div class="column">
              <label>
                <h1>Total :</h1>
              </label>
            </div>
            <div class="column">{{invoice.total}}</div>
          </div>
        </div>
      </div>
    </section>
    <section class="mt3">
      <footer class="footer1">
        <div class="has-text-right">
          <b-button class="btn1" @click="continueInvoice">Continue</b-button>
        </div>
      </footer>
    </section>
  </section>
</template>
<script>
import axios from "axios";

const baseURL = process.env.VUE_APP_BASE_URL;

export default {
  name: "InvoiceForm",
  data() {
    return {
      dropFiles: [],
      templateNo: 1,
      timestamp: "",
      invoice: {
        invoiceList: [],
        total: 0,
        selectedDiscount: "",
        payerName: "",
        payerEmail: "",
        invoiceNo: "",
      },
      columns: [
        {
          field: "id",
          label: "Id",
        },
        {
          field: "name",
          label: "Name",
        },
        {
          field: "descr",
          label: "Description",
        },
        {
          field: "price",
          label: "Price",
        },
        {
          field: "quantity",
          label: "Quantity",
        },
        {
          field: "productTotal",
          label: "Total",
        },
      ],
      isHoverable: false,
      isFocusable: true,
      count: 0,
      dTotal: 0
    };
  },
  mounted() {
    this.addProduct();
    this.checkTemplateNumber();
  },
  created() {
    setInterval(this.getNow, 1000);
    this.getInvoiceNo();
  },
  methods: {
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    checkTemplateNumber() {
      this.$data.templateNo = parseInt(this.$route.query.template);
    },
    getInvoiceNo() {
      axios.get(baseURL + "api/getInvoiceNo").then((res) => {
        this.$data.invoice.invoiceNo = res.data;
      });
    },
    addProduct() {
      this.invoice.invoiceList.push({
        id: this.$data.invoice.invoiceList.length + 1,
        name: "",
        descr: "",
        price: "",
        quantity: "",
        productTotal: "",
      });
    },
    calculateTotal() {
      let temp = 0;
      this.$data.invoice.invoiceList.forEach((element) => {
        element.productTotal = element.price * element.quantity;
        temp = element.price * element.quantity + temp;
      });
      this.$data.invoice.total = temp;
    },
    deleteEntry(id) {
      this.invoice.invoiceList.splice(id - 1, 1);
    },
    getNow: function () {
      const today = new Date();
      const date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      const time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      const dateTime = date + " " + time;
      this.timestamp = dateTime;
    },
    continueInvoice() {
      axios
        .post(baseURL + "api/saveInvoice", { ...this.$data.invoice })
        .then((response) => {
          console.log(response);
        });
      this.$router.push("/channel");
      console.log(this.$data.invoice);
    },
    discountTotal(e) {
      if (this.count > 0) {
        this.$data.invoice.total = this.dTotal;
      } else {
        this.count += 1;
        this.dTotal = this.$data.invoice.total;        
      }
      this.$data.invoice.total = this.$data.invoice.total - ((this.$data.invoice.total * e) / 100);
    },
  },
};
</script>

<style>
input {
  border: 1px solid black !important;
  border-radius: 5px !important;
  height: 2.2rem !important;
  font-size: 1rem !important;
  width: 100% !important;
}
.section {
  padding: 2rem 4.5rem;
}
.mdi-calendar-today {
  font-size: 19px !important;
  padding: 7px 0px 0px 10px;
}
.textarea {
  border: 1px solid black !important;
  border-radius: 5px !important;
}
label {
  font-weight: 600 !important;
  color: #363636 !important;
}
.footerBox {
  padding: 11px !important;
}
.date {
  padding-top: 2rem !important;
  margin-top: -2rem;
}
.footer1 {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #5dade2;
  color: white;
  text-align: center;
  height: 3rem;
}
.btn1 {
  margin: 6px 58px;
}
</style>
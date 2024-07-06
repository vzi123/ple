<template>
  <div class="row mb-40">
    <div class="col-xxl-10 col-lg-8 pe-xxl-8">
<!--      <div class="row">-->
<!--        <div class="col-md-6">-->
<!--          <div class="form-group mb-25">-->
<!--            <label class="d-block fs-14 text-black mb-2">Discount</label>-->
<!--            <input-->
<!--              v-model="discount"-->
<!--              type="number"-->
<!--              class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"-->
<!--              placeholder="0"-->
<!--            />-->
<!--            <span-->
<!--              class="percent-sign position-absolute rounded-1 text-center d-flex flex-column justify-content-center fw-semibold fs-16"-->
<!--            >-->
<!--              {{ currncySymbol }}-->
<!--            </span>-->
<!--          </div>-->
<!--        </div>-->
<!--&lt;!&ndash;        <div class="col-md-6">&ndash;&gt;-->
<!--&lt;!&ndash;          <div class="form-group mb-25">&ndash;&gt;-->
<!--&lt;!&ndash;            <label class="d-block fs-14 text-black mb-2">Status</label>&ndash;&gt;-->
<!--&lt;!&ndash;            <select v-model="status" class="bg-white border-0 rounded-1 fs-14 text-optional">&ndash;&gt;-->
<!--&lt;!&ndash;              <option value="Packed">Packed</option>&ndash;&gt;-->
<!--&lt;!&ndash;              <option value="Delivered">Delivered</option>&ndash;&gt;-->
<!--&lt;!&ndash;              <option value="Cancelled">Cancelled</option>&ndash;&gt;-->
<!--&lt;!&ndash;            </select>&ndash;&gt;-->
<!--&lt;!&ndash;          </div>&ndash;&gt;-->
<!--&lt;!&ndash;        </div>&ndash;&gt;-->
<!--      </div>-->
    </div>
    <div class="col-xxl-2 col-lg-4">
      <div class="card border-0 rounded-1 w-xxl-5 pt-12 pb-12 mb-md-25">
        <table id="submitSales" class="table style-two">
          <tbody>
<!--            <tr>-->
<!--              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">-->
<!--                DISCOUNT :-->
<!--              </th>-->
<!--              <td class="fs-14 fw-semibold lh-1 text-optional text-end">-->
<!--                {{ currncySymbol }}{{ discount }}-->
<!--              </td>-->
<!--            </tr>-->
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-semibold">
                GRAND TOTAL:
              </th>
              <td class="fs-14 fw-bold lh-1 text-purple text-end">{{ currncySymbol }}{{ calculateGrandTotal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-12">
      <div class="form-group mb-25">
        <label class="d-block fs-14 text-black mb-2">Notes</label>
        <textarea
          v-model="notes"
          cols="30"
          rows="10"
          placeholder="Add a note"
          class="d-block w-100 bg-white border-0 rounded-1 resize-none fs-14 text-title"
        ></textarea>
      </div>
    </div>
    <div class="col-xl-4">
      <button
        class="btn style-one d-inline-block transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16 mb-20"
        type="submit" @click="submit" id="submitButton" :disabled="loading"
      >
         <span v-if="loading">Loading...</span>
                <span v-else>Submit Entry</span>
      </button>

    </div>

  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import EventBus from '@/events/event-bus';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "SubmitPurchase",
  props: {
      filteredList: {
        type: Array,
        required: true,
         default: () => [],
      },
      filteredAccessoriesList: {
              type: Array,
              required: true,
               default: () => [],
            },

       filteredServicesList: {
                     type: Array,
                     required: true,
                      default: () => [],
                   },
       loading: {
            type: Boolean,
            default: false
          },
    },
  data() {
    return {
      discount: 0,
      total:0,
      status: "Packed",
      notes: "",
      currncySymbol: "₹",
      loading: false,
    };
  },
  computed: {
     calculateGrandTotal() {
       console.log("calculateGrandTotal:");
        let total =0;
       let filteredListtotal = 0;
       let filteredAccessoriesListtotal = 0;
       let filteredServicesListtotal = 0;
console.log("calculateGrandTotal: this.total ",this.total );
console.log("calculateGrandTotal: this.total ",total );
       if (this.filteredList && Array.isArray(this.filteredList)) {
         filteredListtotal += this.filteredList.reduce((acc, product) => {
           console.log("calculateGrandTotal: filteredList value",product.subTotal );
           return acc + (parseFloat(product.subTotal) || 0);
         }, 0);
         console.log("filteredList: this.total ",this.total );
         console.log("filteredList: this.total ",filteredListtotal );
       }

       if (this.filteredAccessoriesList && Array.isArray(this.filteredAccessoriesList)) {
         filteredAccessoriesListtotal += this.filteredAccessoriesList.reduce((acc, accessory) => {
           console.log("calculateGrandTotal: filteredAccessoriesList value");
           return acc + ( parseFloat(accessory.subTotal) || 0);
         }, 0);
         console.log("filteredAccessoriesList: this.total ",this.total );
                  console.log("filteredAccessoriesList: this.total ",filteredAccessoriesListtotal );

       }
       if (this.filteredServicesList && Array.isArray(this.filteredServicesList)) {
                filteredServicesListtotal += this.filteredServicesList.reduce((ser, service) => {
                  console.log("calculateGrandTotal: filteredServicesList value");
                  return ser + (parseFloat(service.subTotal) || 0);
                }, 0);
                console.log("filteredServicesList: this.total ",this.total );
                                  console.log("filteredServicesList: this.total ",filteredServicesListtotal );
        }

     console.log("final: this.total ",this.filteredListtotal );
     console.log("final: this.total ",this.filteredAccessoriesListtotal );
       console.log("final: this.total ",this.filteredServicesListtotal );
                                  console.log("final: total ",total );
      this.total = filteredListtotal + filteredAccessoriesListtotal + filteredServicesListtotal;
       this.total = this.total - (this.discount || 0);
       this.total = parseFloat(this.total).toFixed(2);
       console.log("final: this.total ",this.total );

       return this.total;
     }
,
  },
  methods: {
    submit() {
    document.getElementById('submitButton').disabled = true;
        this.loading = true;
      this.$emit("submit", {
        discount: this.discount,
        status: this.status,
        notes: this.notes,
        total: this.total,
      });

    },
    mounted() {
         EventBus.on('loadingCompleted', () => {
              this.loading = false; // Update allProducts with the emitted value
              console.log("emiiteed Loading:");
            });

      },
  },
};
</script>

<style scoped>
.percent-sign {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}
</style>

<template>
  <div class="row mb-40">
    <div class="col-xxl-10 col-lg-8 pe-xxl-8">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group mb-25">
            <label class="d-block fs-14 text-black mb-2">Discount</label>
            <input
              v-model="discount"
              type="number"
              class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
              placeholder="0"
            />
            <span
              class="percent-sign position-absolute rounded-1 text-center d-flex flex-column justify-content-center fw-semibold fs-16"
            >
              {{ currncySymbol }}
            </span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group mb-25">
            <label class="d-block fs-14 text-black mb-2">Status</label>
            <select v-model="status" class="bg-white border-0 rounded-1 fs-14 text-optional">
              <option value="Packed">Packed</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="col-xxl-2 col-lg-4">
      <div class="card border-0 rounded-1 w-xxl-5 pt-12 pb-12 mb-md-25">
        <table id="submitSales" class="table style-two">
          <tbody>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-normal">
                DISCOUNT :
              </th>
              <td class="fs-14 fw-semibold lh-1 text-optional text-end">
                {{ currncySymbol }}{{ discount }}
              </td>
            </tr>
            <tr>
              <th scope="row" class="fs-14 text-title lh-1 ls-1 fw-semibold">
                GRAND TOTAL :
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
        type="submit" @click="submit"
      >
        Submit Sales
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitPurchase",
  props: {
      filteredList: {
        type: Array,
        required: true,
         default: () => [],
      },
    },
  data() {
    return {
      discount: 0,
      status: "Packed",
      notes: "",
      currncySymbol: "₹",
    };
  },
  computed: {
     calculateGrandTotal() {
      console.log("calculateGrandTotal:");
       if (!this.filteredList || !Array.isArray(this.filteredList)) {
       console.log("calculateGrandTotal: 00");
              return 0;
            }

            const total = this.filteredList.reduce((acc, product) => {
              console.log("calculateGrandTotal:value" );
              return acc + (product.subTotal || 0);

            }, 0);

            return total - this.discount;

        },
  },
  methods: {
    submit() {
      this.$emit("submit", {
        discount: this.discount,
        status: this.status,
        notes: this.notes,
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

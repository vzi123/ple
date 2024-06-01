<template>
  <div class="card border-0 shadow-none rounded-1 mb-30">
    <div class="card-body p-xl-40">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
        Selected Products For Sales
      </h6>
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
                PRODUCT
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                CODE
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                UNIT COST
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                STOCK
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                QUANTITY
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                DISCOUNT
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                TAX
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                SUBTOTAL
              </th>
              <th
                scope="col"
                class="text-title fw-normal fs-14 pt-0 ls-1 text-end pe-0"
              >
                DELETE
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in filteredList" :key="product.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
                {{ product.product }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ product.code }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                $ {{ product.cost }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <span class="badge badge-success fw-semibold fs-14">
                  {{ product.stock }}
                </span>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <QuantityCounter />
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ product.discount }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ product.tax }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ product.subTotal }}
              </td>
              <td class="shadow-none lh-1 text-end pe-0">
                <div
                  class="button-group style-two ms-auto d-flex flex-wrap align-items-center"
                >
                  <a
                    class="delete-btn"
                    data-bs-toggle="offcanvas"
                    href="#deletePopup"
                    role="button"
                    aria-controls="deletePopup"
                    @click.prevent="$emit('remove-product', index)"
                  >
                    <img
                      src="../../../assets/img/icons/close.svg"
                      alt="Image"
                    />
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import QuantityCounter from "./QuantityCounter.vue";
import EventBus from '@/events/event-bus';

export default defineComponent({
  name: "SelectedProducts",
  components: {
    QuantityCounter,
  },
  data() {
    return {
      currncySymbol:"₹",
      selectedProduct: "",
    };
  },
  
  setup() {
    const allProducts = ref([
        {
          id: 1,
          product: "Smartphone",
          code: "87305928",
          stock: "200",
          cost: "200.00",
          discount: "00.00",
          tax: "00.00",
          subTotal: "200.00",
        },
        {
          id: 2,
          product: "Smart Watch",
          code: "56305954",
          stock: "151",
          cost: "100.00",
          discount: "00.00",
          tax: "00.00",
          subTotal: "100.00",
        },
        {
          id: 3,
          product: "Laptop",
          code: "32305954",
          stock: "100",
          cost: "600.00",
          discount: "00.00",
          tax: "00.00",
          subTotal: "600.00",
        },
        {
          id: 4,
          product: "Headphone",
          code: "56305945",
          stock: "250",
          cost: "900.00",
          discount: "00.00",
          tax: "00.00",
          subTotal: "900.00",
        },
      ]);
    const searchTerm = ref([]);

    const submitFilteredList = async () => {
          try {
            const response = await axios.post("http://localhost:8080/freezy/quotations/save", {
              products: filteredList.value,
            }, {
              headers: {
                "Content-Type": "application/json",
              },
            });
            console.log("Response:", response.data);
          } catch (error) {
            console.error("Error submitting the list:", error);
          }
        };

    const filteredList = computed({
      // getter
      get() {
        return searchTerm.value?.length ? allProducts.value.filter((item: any) => {
          return searchTerm.value?.some((sItem: string) => item.product.toLowerCase().includes(sItem.toLowerCase()))
        }) : [];
      },
      // setter
      set(newValue: any) {
        allProducts.value = newValue;
      }
    })

    onMounted(() => {
      EventBus.on('onUpdateProducts', (products: any) => {
        searchTerm.value = products;
      });
    });
    return {

            allProducts,
            filteredList,
            submitFilteredList,
    };
  },
});
</script>
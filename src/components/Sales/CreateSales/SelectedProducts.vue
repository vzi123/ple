<template>
  <div class="card border-0 shadow-none rounded-1 mb-30 pb-40 table-responsive">
    <div class="card-body p-xl-40">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
        Selected Products For Entry
      </h6>
      <table class="table text-nowrap align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
              Product
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Product Code
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Unit Cost
            </th>

            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              IDU Serial Number
            </th>

            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              ODU Serial Number
            </th>

            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              GST-%
            </th>
            <th v-if="showDiscounts" scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
            <th>DISCOUNT</th>
            </th>


            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Sub Total
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1 text-end pe-0">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in filteredList" :key="filteredList.productId">
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
              {{ product.product }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ product.productId }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="number" v-model.number="product.unitPrice" @input="calculateSubtotal(index)"
                class="form-control" />

            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="text" v-model.number="product.iduSerialNo" class="form-control" />
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="text" v-model.number="product.oduSerialNo" class="form-control" />
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph" style="width: 18%;">
              <v-select v-model="product.gstValue" :options="gst" label="gstRate" v-on:change="calculateSubtotal(index)"
                v-on:input="calculateSubtotal(index)" v-on:select="calculateSubtotal(index)"
                v-on:search="calculateSubtotal(index)" class="bg-white border-0 rounded-1 fs-14 text-optional"
                placeholder="Select gstRate" @update:modelValue="calculateSubtotal(index)" />




            </td>
            <td v-if="showDiscounts" class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="number" v-model.number="product.discountAmount" @input="calculateSubtotal(index)"
                class="form-control" />
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph text-center">
              {{ currncySymbol }} {{ product.subTotal }}
            </td>
            <td class="shadow-none lh-1 text-end pe-0">
              <div class="button-group style-two ms-auto d-flex flex-wrap align-items-center">
                <a class="delete-btn" data-bs-toggle="offcanvas" href="#deletePopup" role="button"
                  aria-controls="deletePopup" @click.prevent="$emit('remove-product', index)">
                  <img src="../../../assets/img/icons/close.svg" alt="Image" />
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import axios from "axios";
import QuantityCounter from "./QuantityCounter.vue";
import EventBus from '@/events/event-bus';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import stateStore from "@/utils/store";
import { BASE_URL } from "@/utils/utils";


interface Product {
  productId: string;
  product: string;
  description: string;
  quantity: number;
  cost: number | null;
  unitPrice: number;
  discountAmount: number;
  subTotal: string | null;
  effectivePrice: number;
  iduSerialNo: string;
  oduSerialNo: string;
  gstValue: { gstValue: number };
}


export default defineComponent({
  name: "SelectedProducts",
  props: {
    showDiscounts: {
      type: Boolean,
      default: true
    },
    products: {
      type: Array as () => Product[],
      required: true
    }
  },
  components: {
    QuantityCounter,
    vSelect,

  },
  data() {
    return {
      currncySymbol: "₹",
      selectedProduct: "",
      gst: [
        { gstRate: "GST18P", gstValue: 0.18 },
        { gstRate: "GST28P", gstValue: 0.28 }
      ],
    };
  },

  setup(props) {
    const allProducts = ref([]);


    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/freezy/v1/products/all`);

        allProducts.value = response.data.map((product: any) => ({
          productId: product.id || '',
          product: product.name || '',
          description: product.description || '',
          quantity: 1,
          cost: product.cost || 0,
          unitPrice: product.cost || 0,
          discountAmount: 0,
          subTotal: (product.cost || 0) * 1,
          effectivePrice: (product.cost || 0) * 1,
          iduSerialNo: "",
          oduSerialNo: "",
          gstValue: 0
        }));

        EventBus.emit('onAllProducts', allProducts.value);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };


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

    const filteredList = computed(() => {
      // Ensure that 'products' is not null or undefined
      if (!props.products) return [];

      // Filter products based on the presence of 'product' and 'productId'
      return props.products.filter(p => p.product && p.productId);
    });


    const updateQuantity = ({ index, quantity }: { index: number, quantity: number }) => {
      console.log(index, 'Finished successfully!');
      if (index >= 0 && index < filteredList.value.length) {

        console.log(index, 'Finished successfully inside!');
        filteredList.value[index].quantity = quantity;
        calculateSubtotal(index);
        EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
      }
    };

    // const updateCost = (index: number, cost: number) => {
    //   if (index >= 0 && index < filteredList.value.length) {
    //     filteredList.value[index].cost = cost;
    //     calculateSubtotal(index);
    //     EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
    //     console.log(index, 'Finished successfully inside!');
    //   }
    // };

    const updateDiscount = (index: number, discount: number) => {
      if (index >= 0 && index < filteredList.value.length) {
        filteredList.value[index].discountAmount = discount;
        calculateSubtotal(index);
        EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
      }
    };


    const calculateSubtotal = (index: number) => {
      if (index >= 0 && index < filteredList.value.length) {
        const product = filteredList.value[index];

        // Ensure unitPrice and discountAmount are valid numbers
        const unitPrice = parseFloat(product.unitPrice?.toString() || '0');
        const discountAmount = parseFloat(product.discountAmount?.toString() || '0');

        // Calculate effective price after discount
        product.effectivePrice = unitPrice - discountAmount;

        // Ensure gstValue is a valid number
        let gstValue = product.gstValue?.gstValue;
        gstValue = typeof gstValue === 'number' && !isNaN(gstValue) ? gstValue : 0;

        // Apply GST if applicable
        if (gstValue > 0) {
          product.effectivePrice += product.effectivePrice * gstValue;
        }

        // Calculate subtotal
        const quantity = product.quantity || 1;
        product.subTotal = (product.effectivePrice * quantity).toFixed(2);

      }
    };

    onMounted(async () => {
      await fetchProducts();
      
      EventBus.on('onUpdateProducts', (products: any) => {
        searchTerm.value = products;
        EventBus.emit('onFilteredProducts', filteredList.value); // Emit the detailed product data
        
      });
      
      // Emit the allProducts list when the component is mounted
      EventBus.emit('onAllProducts', allProducts.value);

    });

    EventBus.on('requestAllProducts', () => {
      // Emit the allProducts list when a request is received
      EventBus.emit('onAllProducts', allProducts.value);
    });


    return {

      allProducts,
      filteredList,
      submitFilteredList,
      updateQuantity,
      // updateCost,
      updateDiscount,
      calculateSubtotal,
    };
  },
});
</script>
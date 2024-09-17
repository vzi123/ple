<template>
  <div class="card border-0 shadow-none rounded-1 mb-30 pb-40 table-responsive">
    <div class="card-body p-xl-40">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
        Selected Accessories For Entry
      </h6>
      <table class="table text-nowrap align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
              Accessory
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Accessory Code
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Unit Cost
            </th>

            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              Quantity
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
          <!-- <tr v-for="(accessory, index) in filteredAccessoriesList" :key="accessory.accessoryId"> -->
            <tr v-for="(accessory, index) in filteredAccessoriesList" :key="accessory.accessoryId + '-' + index">
            
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
              {{ accessory.accessory }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ accessory.accessoryId }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="number" v-model.number="accessory.unitPrice" @input="calculateAccessoriesSubtotal(index)"
                class="form-control" />
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">  
              <QuantityCounter :initialQuantity="accessory.quantity ?? 1" :index="index"
                @quantity-change="updateAccessoriesQuantity" @input="calculateAccessoriesSubtotal(index)" />
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <v-select v-model="accessory.gstValue" :options="gst" label="gstRate"
                v-on:change="calculateAccessoriesSubtotal(index)" v-on:input="calculateAccessoriesSubtotal(index)"
                v-on:select="calculateAccessoriesSubtotal(index)" v-on:search="calculateAccessoriesSubtotal(index)"
                class="bg-white border-0 rounded-1 fs-14 text-optional" placeholder="Select gstRate"
                @update:modelValue="calculateAccessoriesSubtotal(index)" />
            </td>
            <td v-if="showDiscounts" class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              <input type="number" v-model.number="accessory.discountAmount"
                @input="calculateAccessoriesSubtotal(index)" class="form-control" />
            </td>

            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ currncySymbol }} {{ accessory.subTotal }}
            </td>
            <td class="shadow-none lh-1 text-end pe-0">
              <div class="button-group style-two ms-auto d-flex flex-wrap align-items-center">
                <a class="delete-btn" data-bs-toggle="offcanvas" href="#deletePopup" role="button"
                  aria-controls="deletePopup" @click.prevent="$emit('remove-accessory', index)">
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
import { BASE_URL } from "@/utils/utils";

interface Accessory {
  accessoryId: string;
  accessory: string;
  description: string;
  quantity: number;
  cost: number;
  unitPrice: number;
  discountAmount: number; // Update to reflect the correct property
  discount: number; // Update to reflect the correct property
  subTotal: number;
  effectivePrice: number;
  iduSerialNo: string;
  oduSerialNo: string;
  gstValue: { gstValue: number };
}

export default defineComponent({
  name: "SelectedAccessories",
  props: {
    showDiscounts: {
      type: Boolean,
      default: true
    },
    accessories: {
      type: Array as () => Accessory[],
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
      selectedAccessory: "",
      gst: [
        {
          gstRate: "GST18P",
          gstValue: 0.18,
        },
        {
          gstRate: "GST28P",
          gstValue: 0.28,
        },
      ],
    };
  },

  setup(props) {
    const allAccessories = ref([]);


    const fetchAccessories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/freezy/v1/accessories/all`);
        // Transform the response data
        allAccessories.value = response.data.map((accessory: any) => ({
          accessoryId:  accessory.id || '',
          accessory: accessory.name || '',
          description: accessory.description || '',
          quantity: 1,
          unitPrice: 0,
          discountAmount: 0,
          subTotal: 0,
          effectivePrice: 0,
          gstValue: {
            gstRate: "",
            gstValue: 0
          },
          iduSerialNo: "",
          oduSerialNo: "",
          type: "ACCESSORY",
          productId: "",
          product: "",
          serviceId: "",
          service: "",
          gstPercent: 0
        }));
        EventBus.emit('onAllAccessories', allAccessories.value);
      } catch (error) {
        console.error("Error fetching Accessories:", error);
      }
    };
    const searchTerm = ref([]);

    const submitAccessoriesFilteredList = async () => {
      try {
        const response = await axios.post("http://localhost:8080/freezy/quotations/save", {
          accessories: filteredAccessoriesList.value,
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

    const filteredAccessoriesList = computed(() => {
      // Ensure that 'accessories' is not null or undefined
      if (!props.accessories) return [];

      // Filter accessories based on the presence of 'accessory' and 'accessoryId'
      return props.accessories.filter(p => p.accessory && p.accessoryId);
    });


    const updateAccessoriesQuantity = ({ index, quantity }: { index: number, quantity: number }) => {
      console.log(index, 'Finished successfully!');
      if (index >= 0 && index < filteredAccessoriesList.value.length) {

        console.log(index, 'Finished successfully inside!');
        filteredAccessoriesList.value[index].quantity = quantity;
        calculateAccessoriesSubtotal(index);
        EventBus.emit('onFilteredAccessories', filteredAccessoriesList.value); // Emit the updated filteredAccessoriesList data
      }
    };

    const updateAccessoriesCost = (index: number, cost: number) => {
      if (index >= 0 && index < filteredAccessoriesList.value.length) {
        filteredAccessoriesList.value[index].cost = cost;
        calculateAccessoriesSubtotal(index);
        EventBus.emit('onFilteredAccessories', filteredAccessoriesList.value); // Emit the updated filteredAccessoriesList data
      }
    };

    const updateAccessoriesDiscount = (index: number, discount: number) => {
      if (index >= 0 && index < filteredAccessoriesList.value.length) {
        filteredAccessoriesList.value[index].discount = discount;
        calculateAccessoriesSubtotal(index);
        EventBus.emit('onFilteredAccessories', filteredAccessoriesList.value); // Emit the updated accessory data
      }
    };

    const calculateAccessoriesSubtotal = (index: number) => {
      if (index >= 0 && index < filteredAccessoriesList.value.length) {
        const accessory = filteredAccessoriesList.value[index];

        // Ensure cost, discountAmount, and quantity are valid numbers
        const cost = parseFloat(accessory.unitPrice?.toString() || '0');
        const discountAmount = parseFloat(accessory.discountAmount?.toString() || '0');
        const quantity = parseFloat(accessory.quantity?.toString() || '1');

        // Calculate effective price after discount
        let effectivePrice = cost - discountAmount;

        // Ensure gstValue is a valid number
        let gstRate = accessory.gstValue?.gstValue;
        gstRate = typeof gstRate === 'number' && !isNaN(gstRate) ? gstRate : 0;

        // Apply GST if applicable
        if (gstRate > 0) {
          effectivePrice += effectivePrice * gstRate;
        }

        // Calculate subtotal
        accessory.subTotal = parseFloat((effectivePrice * quantity).toFixed(2));
        accessory.effectivePrice = effectivePrice;
        accessory.unitPrice = cost; // Ensure this is updated correctly
      }
    };



    onMounted(async () => {
      await fetchAccessories();
      EventBus.on('onUpdateAccessories', (accessories: any) => {
        searchTerm.value = accessories;
        EventBus.emit('onFilteredAccessories', filteredAccessoriesList.value); // Emit the detailed accessory data
      });

      // Emit the accessory list when the component is mounted
      EventBus.emit('onAllAccessories', allAccessories.value);
    });
    EventBus.on('requestAllAccessories', () => {
      // Emit the allAccessories list when a request is received
      EventBus.emit('onAllAccessories', allAccessories.value);
    });


    return {

      allAccessories,
      filteredAccessoriesList,
      submitAccessoriesFilteredList,
      updateAccessoriesQuantity,
      updateAccessoriesCost,
      updateAccessoriesDiscount,
      calculateAccessoriesSubtotal,

    };
  },
});
</script>
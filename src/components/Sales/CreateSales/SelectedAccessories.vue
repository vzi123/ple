<template>
  <div class="card border-0 shadow-none rounded-1 mb-30">
    <div class="card-body p-xl-40">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
        Selected Accessories For Entry
      </h6>
      <div class="table-responsive">
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
                <th >DISCOUNT</th>
              </th>


              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                Sub Total
              </th>
              <th
                scope="col"
                class="text-title fw-normal fs-14 pt-0 ls-1 text-end pe-0"
              >
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(accessory, index) in filteredAccessoriesList" :key="accessory.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
                {{ accessory.accessory }}
              </td>
               <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ accessory.accessoryId }}
              </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="accessory.cost"
                              @input="calculateAccessoriesSubtotal(index)"
                              class="form-control"
                            />
            </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <QuantityCounter :initialQuantity="accessory.quantity ?? 1" :index="index" @quantity-change="updateAccessoriesQuantity" @input="calculateAccessoriesSubtotal(index)" />
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                                       <v-select
                                                v-model="accessory.gstValue"
                                                :options="gst"
                                                label="gstRate"
                                                v-on:change="calculateAccessoriesSubtotal(index)"
                                                v-on:input="calculateAccessoriesSubtotal(index)"
                                                v-on:select="calculateAccessoriesSubtotal(index)"
                                                v-on:search="calculateAccessoriesSubtotal(index)"
                                                class="bg-white border-0 rounded-1 fs-14 text-optional"
                                                placeholder="Select gstRate"
                                                @update:modelValue="calculateAccessoriesSubtotal(index)"
                                         />
                                      </td>
              <td v-if="showDiscounts" class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="accessory.discountAmount"
                              @input="calculateAccessoriesSubtotal(index)"
                              class="form-control"
                            />
              </td>

              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ accessory.subTotal }}
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
                    @click.prevent="$emit('remove-accessory', index)"
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default defineComponent({
  name: "SelectedAccessories",
   props: {
      showDiscounts: {
        type: Boolean,
        default: true
      },
      accessories: {
        type: Array,
        required: true
      }
    },
  components: {
    QuantityCounter,
    vSelect,
  },
  data() {
    return {
      currncySymbol:"₹",
      selectedAccessory: "",
      gst :[
      {
       gstRate: "IGST-14%",
       gstValue: 0.14,
      },
       {
             gstRate: "IGST-28%",
             gstValue: 0.28,
            },
             {
                   gstRate: "CGST-14%",
                   gstValue: 0.14,
                  },
                   {
                         gstRate: "CGST-28%",
                         gstValue: 0.28,
                        },

      ],
    };
  },

  setup() {
    const allAccessories = ref([]);


        const fetchAccessories = async () => {
              try {
                const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/v1/accessories/all");
                // Transform the response data
                allAccessories.value = response.data.map((accessory: any) => ({
                  accessoryId: accessory.id,
                  accessory: accessory.name, // Change 'name' to 'accessory'
                  description: accessory.description,
                  quantity: 1, // Default quantity
                  cost: accessory.cost,
                  unitPrice:accessory.cost,
                  discountAmount: 0,
                  subTotal: (accessory.cost - 0) * 1,
                  effectivePrice: (accessory.cost - 0) * 1,
                  serialNo: "",
                   gstValue:0
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

    const filteredAccessoriesList = computed({
      // getter
      get() {
        return searchTerm.value?.length ? allAccessories.value.filter((item: any) => {
          return searchTerm.value?.some((sItem: string) => item.accessory.toLowerCase().includes(sItem.toLowerCase()))
        }) : [];
      },
      // setter
      set(newValue: any) {
        allAccessories.value = newValue;
      }
    })

    const updateAccessoriesQuantity = ({ index, quantity }: { index: number, quantity: number }) => {
          console.log(index, 'Finished successfully!');
          if (index >= 0 && index < filteredAccessoriesList.value.length) {

          console.log(index , 'Finished successfully inside!');
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

      const calculateAccessoriesSubtotal =  (index: number) => {
       console.log(index, 'calculateAccessoriesSubtotal successfully!');
                    if (index >= 0 && index < filteredAccessoriesList.value.length) {
                           const accessory = filteredAccessoriesList.value[index];
                          	 accessory.subTotal = (accessory.cost - accessory.discountAmount) * accessory.quantity;
				accessory.effectivePrice = accessory.cost - accessory.discountAmount;
                             if (  accessory.gstValue !== undefined && accessory.gstValue !== null && accessory.gstValue.gstValue !== undefined && accessory.gstValue.gstValue !== null) {
                                        console.log("before:", accessory.effectivePrice);
                                       const gstRate = parseFloat(accessory.gstValue.gstValue) || 0;
                                       accessory.effectivePrice = accessory.effectivePrice + ( gstRate * accessory.effectivePrice);

                                      console.log("after:", accessory.effectivePrice);
                             }
                            accessory.subTotal = (accessory.effectivePrice) * accessory.quantity ;
                             accessory.subTotal = parseFloat(accessory.subTotal).toFixed(2);
                           accessory.unitPrice = accessory.cost;
                           accessory.effectivePrice = accessory.cost - accessory.discountAmount;
                           accessory.unitPrice = accessory.cost;
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
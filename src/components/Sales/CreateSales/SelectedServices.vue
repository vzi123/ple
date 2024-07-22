<template>
  <div class="card border-0 shadow-none rounded-1 mb-30">
    <div class="card-body p-xl-40">
      <h6 class="fs-18 mb-35 text-title fw-semibold">
        Selected Services For Entry
      </h6>
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
                Service
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                Service Code
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
            <tr v-for="(service, index) in filteredServiceList" :key="service.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
                {{ service.service }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ service.serviceId }}
              </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="service.cost"
                              @input="calculateServicesSubtotal(index)"
                              class="form-control"
                            />
            </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <QuantityCounter :initialQuantity="service.quantity ?? 1" :index="index" @quantity-change="updateServicesQuantity" @input="calculateServicesSubtotal(index)" />
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                         <v-select
                                  v-model="service.gstValue"
                                  :options="gst"
                                  label="gstRate"
                                  v-on:change="calculateServicesSubtotal(index)"
                                  v-on:input="calculateServicesSubtotal(index)"
                                  v-on:select="calculateServicesSubtotal(index)"
                                  v-on:search="calculateServicesSubtotal(index)"
                                  class="bg-white border-0 rounded-1 fs-14 text-optional"
                                  placeholder="Select gstRate"
                                  @update:modelValue="calculateServicesSubtotal(index)"
                           />
                        </td>
              <td v-if="showDiscounts" class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="service.discountAmount"
                              @input="calculateServicesSubtotal(index)"
                              class="form-control"
                            />
              </td>



              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ service.subTotal }}
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
                    @click.prevent="$emit('remove-service', index)"
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
  name: "SelectedServices",
   props: {
      showDiscounts: {
        type: Boolean,
        default: true
      },
      services: {
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
      selectedService: "",
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
    const allServices = ref([]);


        const fetchServices = async () => {
              try {
                const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/v1/services/all");
                // Transform the response data
                allServices.value = response.data.map((service: any) => ({
                  serviceId: service.id,
                  service: service.name, // Change 'name' to 'service'
                  description: service.description,
                  quantity: 1, // Default quantity
                  cost: service.cost,
                  unitPrice:service.cost,
                  discountAmount: 0,
                  subTotal: (service.cost - 0) * 1,
                  effectivePrice: (service.cost - 0) * 1,
		  serialNo: "",
                  gstValue:0
                }));
                EventBus.emit('onAllServices', allServices.value);
              } catch (error) {
                console.error("Error fetching services:", error);
              }
            };
    const searchTerm = ref([]);

    const submitfilteredServiceList = async () => {
          try {
            const response = await axios.post("http://localhost:8080/freezy/quotations/save", {
              services: filteredServiceList.value,
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

    const filteredServiceList = computed({
      // getter
      get() {
        return searchTerm.value?.length ? allServices.value.filter((item: any) => {
          return searchTerm.value?.some((sItem: string) => item.service.toLowerCase().includes(sItem.toLowerCase()))
        }) : [];
      },
      // setter
      set(newValue: any) {
        allServices.value = newValue;
      }
    })

    const updateServicesQuantity = ({ index, quantity }: { index: number, quantity: number }) => {
          console.log(index, 'Finished successfully!');
          if (index >= 0 && index < filteredServiceList.value.length) {

          console.log(index , 'Finished successfully inside!');
            filteredServiceList.value[index].quantity = quantity;
            calculateServicesSubtotal(index);
            EventBus.emit('onFilteredServices', filteredServiceList.value); // Emit the updated service data
          }
        };

     const updateServicesCost = (index: number, cost: number) => {
          if (index >= 0 && index < filteredServiceList.value.length) {
            filteredServiceList.value[index].cost = cost;
            calculateServicesSubtotal(index);
            EventBus.emit('onFilteredServices', filteredServiceList.value); // Emit the updated service data
          }
        };

     const updateServicesDiscount = (index: number, discount: number) => {
               if (index >= 0 && index < filteredServiceList.value.length) {
                 filteredServiceList.value[index].discount = discount;
                 calculateServicesSubtotal(index);
                 EventBus.emit('onFilteredServices', filteredServiceList.value); // Emit the updated service data
               }
             };

      const calculateServicesSubtotal =  (index: number) => {
       console.log(index, 'calculateServicesSubtotal successfully!');
                    if (index >= 0 && index < filteredServiceList.value.length) {
                           const service = filteredServiceList.value[index];
                           service.subTotal = (service.cost - service.discountAmount) * service.quantity;
				service.effectivePrice = service.cost - service.discountAmount;
                             if (  service.gstValue !== undefined && service.gstValue !== null && service.gstValue.gstValue !== undefined && service.gstValue.gstValue !== null) {
                                        console.log("before:", service.effectivePrice);
                                       const gstRate = parseFloat(service.gstValue.gstValue) || 0;
                                       service.effectivePrice = service.effectivePrice + ( gstRate * service.effectivePrice);

                                      console.log("after:", service.effectivePrice);
                             }
                            service.subTotal = (service.effectivePrice) * service.quantity ;
                             service.subTotal = parseFloat(service.subTotal).toFixed(2);
                           service.unitPrice = service.cost;

                         }
                };

    onMounted(async () => {
                    await fetchServices();
      EventBus.on('onUpdateServices', (services: any) => {
              searchTerm.value = services;
              EventBus.emit('onFilteredServices', filteredServiceList.value); // Emit the detailed service data
            });

            // Emit the allServices list when the component is mounted
            EventBus.emit('onAllServices', allServices.value);
    });
EventBus.on('requestAllServices', () => {
      // Emit the allServices list when a request is received 
      EventBus.emit('onAllServices', allServices.value);
    });


    return {

            allServices,
            filteredServiceList,
            submitfilteredServiceList,
            updateServicesQuantity,
            updateServicesCost,
            updateServicesDiscount,
            calculateServicesSubtotal,

    };
  },
});
</script>
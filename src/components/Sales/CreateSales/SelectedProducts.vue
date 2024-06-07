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
                QUANTITY
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
                DISCOUNT
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
            <tr v-for="(product, index) in filteredList" :key="product.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph ps-0">
                {{ product.product }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ product.productId }}
              </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="product.cost"
                              @input="calculateSubtotal(index)"
                              class="form-control"
                            />
                          </td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <QuantityCounter :initialQuantity="product.quantity ?? 1" :index="index" @quantity-change="updateQuantity" @input="calculateSubtotal(index)" />
                          </td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                            <input
                              type="number"
                              v-model.number="product.discount"
                              @input="calculateSubtotal(index)"
                              class="form-control"
                            />
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
    const allProducts = ref([]);


        const fetchProducts = async () => {
              try {
                const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/products/all");
                // Transform the response data
                allProducts.value = response.data.map((product: any) => ({
                  productId: product.id,
                  product: product.name, // Change 'name' to 'product'
                  description: product.description,
                  quantity: 1, // Default quantity
                  cost: product.cost,
                  discount: 0,
                  subTotal: (product.cost - 0) * 1,
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

    const updateQuantity = ({ index, quantity }: { index: number, quantity: number }) => {
          console.log(index, 'Finished successfully!');
          if (index >= 0 && index < filteredList.value.length) {

          console.log(index , 'Finished successfully inside!');
            filteredList.value[index].quantity = quantity;
            calculateSubtotal(index);
            EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
          }
        };

     const updateCost = (index: number, cost: number) => {
          if (index >= 0 && index < filteredList.value.length) {
            filteredList.value[index].cost = cost;
            calculateSubtotal(index);
            EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
          }
        };

     const updateDiscount = (index: number, discount: number) => {
               if (index >= 0 && index < filteredList.value.length) {
                 filteredList.value[index].discount = discount;
                 calculateSubtotal(index);
                 EventBus.emit('onFilteredProducts', filteredList.value); // Emit the updated product data
               }
             };

      const calculateSubtotal =  (index: number) => {
       console.log(index, 'calculateSubtotal successfully!');
                    if (index >= 0 && index < filteredList.value.length) {
                           const product = filteredList.value[index];
                           product.subTotal = (product.cost - product.discount) * product.quantity;
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
            updateCost,
            updateDiscount,
            calculateSubtotal,

    };
  },
});
</script>
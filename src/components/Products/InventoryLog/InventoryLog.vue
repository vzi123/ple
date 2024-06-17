<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Date
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Product ID
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Product Name
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                IN/OUT
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Quantity
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Updated Stock
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Amount
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Comments
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="inventoryLog in allProducts" :key="inventoryLog.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ formatDate(inventoryLog.createdAt) }}
              </td>

              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.inventory.product.id }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.inventory.product.name }}
              </td>

              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.inOut }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.quantity }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.updatedStock }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.amount }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ inventoryLog.comments }}
              </td>


            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div
    class="delete-popup offcanvas offcanvas-end border-0"
    tabindex="-1"
    id="deletePopup"
  >
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { formatDate, BASE_URL } from "@/utils/utils"; 
import EventBus from '../../../events/event-bus';
import stateStore from "../../../utils/store";

export default defineComponent({
  name: "ProductsList",
  data() {
    return {
      currncySymbol:"₹"
    };
  },
  setup() {
    const allProducts = ref([]); // Use ref to make it reactive
    const loading = ref(false);
    const searchTerm = ref('');

    // Function to fetch products using Axios
    const fetchProducts = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/v1/inventoryLog/all`);
        allProducts.value = response.data; // Assuming your API returns an array of products
        
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    // const filteredList = computed({
    //   // getter
    //   get() {
    //     return allProducts.value.filter((productItem: any) => {
    //       const userName = productItem?.user.first_name + " " + productItem?.user.last_name;
    //       return userName.toLowerCase().includes(searchTerm.value.toLowerCase());
    //     });
    //   },
    //   // setter
    //   set(newValue: any) {
    //     // Note: we are using destructuring assignment syntax here.
    //     allProducts.value = newValue;
    //   }
    // })

    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchProducts();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
    });

    // Return reactive variables and function
    return {
      allProducts,
      loading
      // filteredList
    };
  },
  methods: {
    formatDate,
    getUserName(user: any) {
      return user.first_name + " " + user.last_name;
    },
    getProjectName(project: any) {
      return project.name;
    },
    onViewPurchase(stock: any) {
      stateStore.productDetails = stock;
    },
  },
});
</script>
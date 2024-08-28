<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Product ID

              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Product Name
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Category Name
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Stock in Hand(UOM)
              </th>

            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr v-for="item in filteredList" :key="item.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <a href="javascript:void(0)" title="View" data-bs-toggle="modal" data-bs-target="#productdetails"
                    @click="onViewProduct(item)">
                    {{ item.product?.id || item.accessory?.id }}
                  </a>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ item.product?.name || item.accessory?.name }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ item.product?.category?.name || item.accessory?.category?.name }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ item.inventory || 0 }} ({{ item.uom }})
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-center py-5">
                <div class="custom-spinner"></div>
                <p>Loading Products and Stocks...</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="delete-popup offcanvas offcanvas-end border-0" tabindex="-1" id="deletePopup">
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
import '@/assets/css/CustomSpinner.css';

interface ProductItem {
  product?: {
    name: string;
  };
  accessory?: {
    name: string;
  };
}

export default defineComponent({
  name: "ProductsList",
  data() {
    return {
      currncySymbol: "₹",
    };
  },
  setup() {
    const allProducts = ref<ProductItem[]>([]); // Use ref with type annotation
    const loading = ref<boolean>(false);
    const searchTerm = ref<string>('');

    // Function to fetch products using Axios
    const fetchProducts = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get<ProductItem[]>(`${BASE_URL}/freezy/v1/inventory/all`);
        allProducts.value = response.data; // Assuming your API returns an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    const filteredList = computed({
      get() {
        return allProducts.value.filter((productItem) => {
          const productName = productItem.product?.name || productItem.accessory?.name; // Safely accessing product and name
          return productName
            ? productName.toLowerCase().includes(searchTerm.value.toLowerCase())
            : false;
        });
      },
      set(newValue: ProductItem[]) {
        allProducts.value = newValue;
      }
    });

    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchProducts();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: unknown) => {
        searchTerm.value = (updatedSearchTerm as string).trim();
      });
    });

    // Return reactive variables and function
    return {
      allProducts,
      loading,
      searchTerm,
      filteredList
    };
  },
  methods: {
    formatDate,
    getUserName(user: { first_name: string; last_name: string }) {
      return `${user.first_name} ${user.last_name}`;
    },
    getProjectName(project: { name: string }) {
      return project.name;
    },
    onViewProduct(stock: any) {
      stateStore.productDetails = stock;
      console.log(stateStore.productDetails);
      
    },
  },
});
</script>

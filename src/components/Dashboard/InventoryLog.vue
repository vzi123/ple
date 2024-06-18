<template>
  <div class="card-body p-xl-40">
    <h6 class="card-title fw-semiBold fs-18 mb-30">Product Inventory Log</h6>
    <div class="table-responsive style-four" style="max-height: 400px; overflow-y: auto;">
      <table class="table text-nowrap align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
              REF. CODE
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              PRODUCT NAME
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              IN-OUT
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              COMMENTS
            </th>
          </tr>
        </thead>
        <tbody v-for="(purchaseItem, index) in allProducts" :key="index">
                  <tr>
                    <td class="shadow-none fw-normal text-black title ps-0">
                      <span class="text-optional fs-14">{{ purchaseItem.productId }}</span>
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{ purchaseItem.productName }}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{ purchaseItem.inOut }}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ purchaseItem.comments }}</td>

                  </tr>

        </tbody>
      </table>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { formatDate, BASE_URL } from "@/utils/utils";

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

    // Function to fetch products using Axios
    const fetchProducts = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/dashboard/inventoryLog`);
        allProducts.value = response.data; // Assuming your API returns an array of products
        console.log("Products fetched:", allProducts.value);

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchProducts();
    });

    // Return reactive variables and function
    return {
      allProducts,
      loading,
    };
  },
  methods: {
    formatDate,
    getProductName(product: any) {
      return product.name;
    },
    getProjectName(project: any) {
      return project.name;
    },
  },
});
</script>
<template>
  <div class="card-body p-xl-40">
    <h6 class="card-title fw-semiBold fs-18 mb-30">openQuotations</h6>
    <div class="table-responsive style-four" style="max-height: 200px; overflow-y: auto;">
      <table class="table text-nowrap align-middle mb-0">
        <thead>
          <tr>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0 ls-1">
              USER NAME
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              PROJECT ID
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              PROJECT NAME
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              AMOUNT
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              QUOTATION ID
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 ls-1">
              STATUS
            </th>
          </tr>
        </thead>
        <tbody v-if="!loading">
          <tr v-for="(purchaseItem, index) in allProducts" :key="index">
            <td class="shadow-none fw-normal text-black title ps-0">
              <span class="text-optional fs-14">{{ purchaseItem.userId }}</span>
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ purchaseItem.projectId }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ purchaseItem.projectName }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ purchaseItem.budget }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ purchaseItem.quotationId }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ purchaseItem.status }}
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="7" class="text-center py-5">
              <div class="custom-spinner"></div>
              <p>Loading...</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination controls -->
    <div class="col-sm-6 text-sm-end text-center mt-3">
      <ul class="page-nav list-style">
        <li :class="{ disabled: currentPage === 1 }">
          <a href="#" @click.prevent="prevPage" :disabled="currentPage === 1">
            <img src="./../../assets/img/icons/left-arrow-purple.svg" alt="Image" />
          </a>
        </li>
        <li v-for="page in pageNumbers" :key="page" :class="{ active: currentPage === page }">
          <a href="#" @click.prevent="goToPage(page)" v-if="page !== '...'">{{ page }}</a>
          <span class="page-link" v-else>...</span>
        </li>
        <li :class="{ disabled: currentPage === totalPages }">
          <a href="#" @click.prevent="nextPage" :disabled="currentPage === totalPages">
            <img src="./../../assets/img/icons/right-arrow-purple.svg" alt="Image" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { formatDate, BASE_URL } from "@/utils/utils";
import '@/assets/css/CustomSpinner.css'; 

export default defineComponent({
  name: "ProductsList",
  data() {
    return {
      currncySymbol: "₹",
    };
  },
  setup(props, { emit }) {
    const allProducts = ref([]); // Use ref to make it reactive
    const loading = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Function to fetch products using Axios
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/freezy/dashboard/openQuotations`);
        allProducts.value = response.data; // Assuming your API returns an array of products
        console.log("Products fetched:", allProducts.value);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        emit('loading-complete'); // Emit event when loading is complete
      }
    };

    // Call fetchProducts when the component is mounted
    onMounted(async() => {
      await fetchProducts();
    });
    
    // Computed properties for pagination
    const totalPages = computed(() => {
      return Math.ceil(allProducts.value.length / itemsPerPage.value);
    });

    const paginatedProducts = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return allProducts.value.slice(start, end);
    });

    // Function to calculate visible page numbers
    const pageNumbers = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const delta = 2; // How many numbers to show on each side of the current page

      const range: (number | string)[] = [];
      for (
        let i = Math.max(2, current - delta);
        i <= Math.min(total - 1, current + delta);
        i++
      ) {
        range.push(i);
      }

      if (current - delta > 2) {
        range.unshift("...");
      }
      if (current + delta < total - 1) {
        range.push("...");
      }

      range.unshift(1);
      if (total > 1) range.push(total);

      return range;
    });

    const goToPage = (page: number | string) => {
      if (typeof page === "number") {
        currentPage.value = page;
      }
    };

    // Functions to handle page navigation
    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    // Return reactive variables and function
    return {
      allProducts,
      loading,
      currentPage,
      itemsPerPage,
      totalPages,
      paginatedProducts,
      pageNumbers,
      goToPage,
      prevPage,
      nextPage,
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
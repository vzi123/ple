<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Category ID
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Category Name
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Description
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="category in filteredList" :key="category.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ category.id }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ category.name }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ category.description }}
              </td>
              <td class="shadow-none lh-1 text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center">
                  <router-link to="/product-details" class="" title="View">
                    <img src="../../../assets/img/icons/eye.svg" alt="View" />
                  </router-link>
                  <router-link to="/edit-product" class="" title="Edit">
                    <img src="../../../assets/img/icons/edit.svg" alt="Edit" />
                  </router-link>
                  <a
                    class="delete-btn"
                    data-bs-toggle="offcanvas"
                    href="#deletePopup"
                    role="button"
                    aria-controls="deletePopup"
                  >
                    <img
                      src="../../../assets/img/icons/close.svg"
                      alt="Delete"
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
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import eventBus from "@/events/event-bus";
import { BASE_URL } from "@/utils/utils";

export default defineComponent({
  name: "CategoryList",
  setup() {
    const allProducts = ref<any[]>([]);
    const searchTerm = ref('');
    const loading = ref(false);

    const fetchProducts = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/freezy/categories/all`);
        allProducts.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false;
      }
    };

    const filteredList = computed(() => {
      return allProducts.value.filter((product: any) => {
        return product.name.toLowerCase().includes(searchTerm.value.toLowerCase());
      });
    });

    onMounted(() => {
      fetchProducts();
      eventBus.on('searchTermUpdated', (newSearchTerm: unknown) => {
        console.log('Received search term:', newSearchTerm); // Debug log
        searchTerm.value = (newSearchTerm as string).trim();;
      });
    });

    return {
      filteredList
    };
  },
});
</script>

<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else class="table-responsive style-three">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0">
                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" id="test_1" />
                  <label class="form-check-label" for="test_1">
                    Created Date
                    <img
                      class="ms-2"
                      src="../../../assets/img/icons/up-down-aroow.svg"
                      alt="Image"
                    />
                  </label>
                </div>
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Id
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Customer
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Project
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Status
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Total
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(quotationItem, index) in filteredList" :key="index">
              <td class="shadow-none fw-normal text-black title ps-0">
                <div class="d-flex align-items-center">
                  <div class="form-check checkbox style-three">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="test_2"
                    />
                    <label class="form-check-label text-optional" for="test_2">
                    </label>
                  </div>
                  <span class="text-optional fs-14 ms-2">{{
                      formatDate(quotationItem.createdAt)
                  }}</span>
                </div>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ quotationItem.id }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ getUserName(quotationItem.user) }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ quotationItem.project?.name }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <span class="badge badge-success fs-14 fw-normal">
                  {{ quotationItem.status }}
                </span>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{currncySymbol}} {{ quotationItem.budget }}
              </td>
              <td class="shadow-none lh-1 text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center">
                  <a
                    href="javascript:void(0)"
                    title="View"
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                    @click="onViewQuotation(quotationItem)"
                  >
                    <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                  </a>
                  <router-link to="/edit-quotation" title="Edit">
                    <img src="../../../assets/img/icons/edit.svg" alt="Image" />
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
import { defineComponent } from "vue";
import { ref, computed, onMounted } from 'vue';
import axios from "axios";
import stateStore from "../../../utils/store";
import { formatDate, BASE_URL } from '@/utils/utils';
import EventBus from '../../../events/event-bus';

export default defineComponent({
  name: "QuotationList",
  data() {
    return {
      currncySymbol:"₹",
    };
  },

  setup() {
    const loading = ref(false);
    const searchTerm = ref('');
    const quotationListData = ref([]);

    // Function to fetch products using Axios
    const fetchPurchageOrders = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/quotations/all`);
        quotationListData.value = response.data; // Assuming your API returns an array of products

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    const filteredList = computed({
      // getter
      get() {
        return quotationListData.value.filter((quotationItem: any) => {
          const userName = quotationItem?.user.first_name + " " + quotationItem?.user.last_name;
          return userName.toLowerCase().includes(searchTerm.value.toLowerCase());
        });
      },
      // setter
      set(newValue: any) {
        // Note: we are using destructuring assignment syntax here.
        quotationListData.value = newValue;
      }
    })
    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchPurchageOrders();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
    });

    return {
      quotationListData,
      filteredList
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
    onViewQuotation(quotationItem: any) {
      stateStore.quotationDetails = quotationItem;
    },
  },
});
</script>

<style>
.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
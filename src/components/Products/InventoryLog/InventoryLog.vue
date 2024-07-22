<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Date</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">ID</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Name</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Category</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">IN/OUT</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Quantity</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Updated Stock</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Amount</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Comments</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="log in allLogs" :key="log.id">
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ formatDate(log?.createdAt) }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.item?.id }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.item?.name }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.category }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.inOut }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.quantity }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.updatedStock }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.amount }}</td>
                          <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.comments }}</td>
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
        <span class="text-white fw-medium">Your item is deleted from the list.</span>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import { formatDate, BASE_URL } from "@/utils/utils";
import EventBus from '../../../events/event-bus';
import stateStore from "../../../utils/store";

export default defineComponent({
  name: "ItemsList",
  setup() {
    const allLogs = ref([]); // Use ref to make it reactive
    const loading = ref(false);
    const searchTerm = ref('');

    // Function to fetch items (products, accessories, services) using Axios
    const fetchItems = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/v1/inventoryLog/all`);
        allLogs.value = response.data; // Assuming your API returns an array of logs

      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    // Call fetchItems when the component is mounted
    onMounted(() => {
      fetchItems();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
    });

    // Return reactive variables and function
    return {
      allLogs,
      loading
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

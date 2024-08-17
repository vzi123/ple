<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Date</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">ID</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Customer</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Category</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">IN/OUT</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Quantity</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Updated Stock</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Amount</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Comments</th>
            </tr>
          </thead>
          <tbody v-if="!loading">
            <tr v-for="log in filteredList" :key="log.id">
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ formatDate(log?.createdAt) }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.id }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.consignment.createdFor.first_name }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.inventory?.accessory?.category?.name
                || log?.inventory?.product?.category?.name || log?.inventory?.service?.category?.name}}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.inOut }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.quantity }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.updatedStock }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.amount }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ log?.comments }}</td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td colspan="7" class="text-center py-5">
                <div class="custom-spinner"></div>
                <p>Loading Inventories...</p>
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
        <span class="text-white fw-medium">Your item is deleted from the list.</span>
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

interface LogItem {
  id: string; // Define the expected structure
  // Add other properties if they exist in your API response
}

export default defineComponent({
  name: "ItemsList",
  setup() {
    const allLogs = ref<LogItem[]>([]); // Use ref with type annotation
    const loading = ref<boolean>(false);
    const searchTerm = ref<string>('');

    // Function to fetch items (products, accessories, services) using Axios
    const fetchItems = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get<LogItem[]>(`${BASE_URL}/freezy/v1/inventoryLog/all`);
        allLogs.value = response.data; // Assuming your API returns an array of logs

      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    const filteredList = computed({
      get() {
        return allLogs.value.filter((logItem) => {
          const logName = logItem?.id; // Safely accessing log and name
          return logName
            ? logName.toLowerCase().includes(searchTerm.value.toLowerCase())
            : false;
        });
      },
      set(newValue: LogItem[]) {
        allLogs.value = newValue;
      }
    });

    // Call fetchItems when the component is mounted
    onMounted(() => {
      fetchItems();
      console.log(filteredList);

      EventBus.on('searchTermUpdated', (updatedSearchTerm: unknown) => {
        searchTerm.value = (updatedSearchTerm as string).trim(); // Type assertion
      });
    });

    // Return reactive variables and function
    return {
      allLogs,
      loading,
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
    onViewPurchase(stock: any) {
      stateStore.productDetails = stock;
    },
  },
});
</script>

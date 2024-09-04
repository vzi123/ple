<template>
  <FilterContent @update:searchTerm="updateSearchTerm" />
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">

      <div class="table-responsive style-three">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">User Id</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Name</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Email</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Phone</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">GSTNumber</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">PinCode</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">Address</th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">Action</th>
            </tr>
          </thead>

          <tbody v-if="!loading" v-for="(userItem, index) in filteredList" :key="index">
            <tr>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.id }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.first_name }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <span class="badge badge-success fs-14 fw-normal">{{ userItem.email }}</span>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.phone_number }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.gstId }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.pincode }}</td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ userItem.address }}</td>
              <td class="shadow-none lh-1 text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center w-100">
                  <a href="javascript:void(0)" data-bs-target="#createModal" data-bs-toggle="modal" @click="onEditCustomer(userItem)" >
                    <img src="../../../assets/img/icons/edit.svg" alt="Image" />
                  </a>
                  <a class="delete-btn" data-bs-toggle="offcanvas" href="#deletePopup" role="button"
                    aria-controls="deletePopup">
                    <img src="../../../assets/img/icons/close.svg" alt="Image" />
                  </a>
                </div>
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

  <div class="row pb-45 align-items-center">
    <div class="col-sm-6">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start page-unit">
        <span class="fs-13">Showing product per page</span>
        <select class="text-title border-0 fs-14 bg-transparent">
          <option value="0">10</option>
          <option value="1">20</option>
          <option value="2">30</option>
        </select>
      </div>
    </div>
    <div class="col-sm-6 text-sm-end text-center">
      <ul class="page-nav list-style">
        <li>
          <a href="#">
            <img src="../../../assets/img/icons/left-arrow-purple.svg" alt="Image" />
          </a>
        </li>
        <li><a href="#" class="active">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li>
          <a href="#">
            <img src="../../../assets/img/icons/right-arrow-purple.svg" alt="Image" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, defineComponent } from 'vue';
import axios from "axios";
import stateStore from "../../../utils/store";
import { formatDate, BASE_URL } from '@/utils/utils';
import EventBus from '../../../events/event-bus';
import FilterContent from './FilterContent.vue'; // Assuming the file is in the same directory
import '@/assets/css/CustomSpinner.css';

export default defineComponent({
  name: "CustomerList",
  components: {
    FilterContent
  },
  data() {
    return {
      currncySymbol: "₹",
    };
  },
  setup() {
    const loading = ref(false);
    const searchTerm = ref('');
    const purchaseListData = ref([]);

    const updateSearchTerm = (term: string) => {
      searchTerm.value = term;
    };

    const fetchPurchageOrders = async () => {
      try {
        loading.value = true;
        const response = await axios.get(`${BASE_URL}/freezy/v1/users/filter?type=customer`);
        purchaseListData.value = response.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false;
      }
    };

    const filteredList = computed({
      // getter 
      get() {
        return purchaseListData.value.filter((purchaseItem: any) => {
          const userName = `${purchaseItem?.first_name || ''} ${purchaseItem?.last_name || ''} || ${purchaseItem?.pincode || ''} || ${purchaseItem?.phone_number || ''}`;
          const searchLower = searchTerm.value.toLowerCase();
          return (
            userName.toLowerCase().includes(searchLower)
          );
        });
      },
      // setter
      set(newValue: any) {
        // Note: we are using destructuring assignment syntax here.
        purchaseListData.value = newValue;
      }
    })

    onMounted(() => {
      fetchPurchageOrders();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
      EventBus.on('customerCreated', fetchPurchageOrders);
    });

    return {
      loading,
      purchaseListData,
      filteredList,
      updateSearchTerm,
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
    onViewPurchase(purchaseItem: any) {
      stateStore.purchaseDetails = purchaseItem;
    },
    onEditCustomer(userItem: any) {
      stateStore.customerList = userItem;
      console.log(stateStore.customerList);
      // Emit an event with the consignment details
      EventBus.emit('customerSelected', userItem);
    },
  },
});
</script>

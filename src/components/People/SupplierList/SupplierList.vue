<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive style-three">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
          <tr>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              User Id
              <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
              />
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Name
              <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
              />
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Email
              <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
              />
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Phone
              <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
              />
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
                          GSTNumber
                          <img
                              class="ms-2"
                              src="../../../assets/img/icons/up-down-aroow.svg"
                              alt="Image"
                          />
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 pt-0">
                                      PinCode
                                      <img
                                          class="ms-2"
                                          src="../../../assets/img/icons/up-down-aroow.svg"
                                          alt="Image"
                                      />
                                    </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Address
              <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
              />
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">
              Action
            </th>
          </tr>
          </thead>

          <tbody v-for="(userItem, index) in purchaseListData" :key="index">
          <tr>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ userItem.id }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ userItem.first_name }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <span class="badge badge-success fs-14 fw-normal"
                > {{ userItem.email }}</span
                >
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{userItem.phone_number }}
            </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{userItem.gstId }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                                      {{userItem.pincode }}
                                    </td>
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{userItem.address }}
            </td>
            <td class="shadow-none lh-1 text-end pe-0">
              <div class="button-group d-flex flex-wrap align-items-center">
                <!--                <a-->
                <!--                    href="javascript:void(0)"-->
                <!--                    title="View"-->
                <!--                    data-bs-toggle="modal"-->
                <!--                    data-bs-target="#detailsModal"-->
                <!--                    @click="onViewPurchase(purchaseItem)"-->
                <!--                >-->
                <!--                  <img src="../../../assets/img/icons/eye.svg" alt="Image" />-->
                <!--                </a>-->
                <router-link to="/edit-purchase" title="Edit">
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

  <div class="row pb-45 align-items-center">
    <div class="col-sm-6">
      <div
          class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start page-unit"
      >
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
            <img
                src="../../../assets/img/icons/left-arrow-purple.svg"
                alt="Image"
            />
          </a>
        </li>
        <li><a href="#" class="active">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li>
          <a href="#">
            <img
                src="../../../assets/img/icons/right-arrow-purple.svg"
                alt="Image"
            />
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

export default defineComponent({
  name: "SupplierList",
  data() {
    return {
      currncySymbol:"₹",
    };
  },
  setup() {
    const loading = ref(false);
    const searchTerm = ref('');
    const purchaseListData = ref([]);

    // Function to fetch products using Axios
    const fetchPurchageOrders = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/v1/users/filter?type=supplier`);
        purchaseListData.value = response.data; // Assuming your API returns an array of products

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    const filteredList = computed({
      // getter
      get() {
        return purchaseListData.value.filter((purchaseItem: any) => {
          const userName = purchaseItem?.user.first_name + " " + purchaseItem?.user.last_name;
          return userName.toLowerCase().includes(searchTerm.value.toLowerCase());
        });
      },
      // setter
      set(newValue: any) {
        // Note: we are using destructuring assignment syntax here.
        purchaseListData.value = newValue;
      }
    })
    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchPurchageOrders();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
      EventBus.on('supplierCreated', fetchPurchageOrders);
    });

    return {
      purchaseListData,
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
    onViewPurchase(purchaseItem: any) {
      stateStore.purchaseDetails = purchaseItem;
    },
  },
});



</script>
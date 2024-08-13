<template>
  <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-xxl modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content modal-dialog-scrollable">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="detailsModalLabel">
            Details
          </h5>
          <button type="button" class="btn-close p-0" data-bs-dismiss="modal" aria-label="Close">
            <img src="../../../assets/img/icons/close-circle-2.svg" alt="Image" />
          </button>
        </div>
        <div class="modal-body pb-40">
          <ul class="nav nav-tabs" id="detailsTab" role="tablist">
            <li class="nav-item" role="presentation">
              <a class="nav-link active" id="Product-tab" data-bs-toggle="tab" href="#Product" role="tab"
                aria-controls="Product" aria-selected="false" @click="currentTab = 'Product'">Product
                Details</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="accessories-tab" data-bs-toggle="tab" href="#accessories" role="tab"
                aria-controls="accessories" aria-selected="false" @click="currentTab = 'accessories'">Accessory
                Details</a>
            </li>
            <li class="nav-item" role="presentation">
              <a class="nav-link" id="Service-tab" data-bs-toggle="tab" href="#Service" role="tab"
                aria-controls="Service" aria-selected="false" @click="currentTab = 'Service'">Service Details</a>
            </li>
          </ul>
          <div class="tab-content" id="detailsTabContent">

            <div class="tab-pane fade active  pt-2"
              :class="{ show: currentTab === 'Product', active: currentTab === 'Product' }" id="Product" role="tabpanel"
              aria-labelledby="Product-tab" v-show="currentTab === 'Product'">
              <!-- Product Details Content Here -->
              <div class="row ps-2">
                <div class="row mb-20"></div>
                <div class="col-lg-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      DATE :<span class="text-optional ms-1">{{ formatDate(consignmentDetail?.createdAt) }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      STATUS :<span class="text-optional ms-1">{{
                        consignmentDetail?.inOut }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      ID :<span class="text-optional ms-1">{{ consignmentDetail?.products[0]?.id }}</span>
                    </li>
                    
                  </ul>
                </div>
                <div class="col-lg-4 ps-xxl-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      PERSONA :<span class="text-optional ms-1">{{ consignmentDetail?.products[0]?.category?.name
                        }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      BUDGET :<span class="text-optional ms-1">{{ currncySymbol }}
                        {{ consignmentDetail?.products[0]?.cost }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="table-responsive pb-75">
                <table class="table table-bordered table-hover text-nowrap align-middle mb-0">
                  <thead>
                    <tr class="bg_mild">
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Product ID
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Product Name
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Unit Price
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        HSN No.
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Category
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Type
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prod, index) in consignmentDetail?.products" :key="index"
                      class="br-s-1">
                      <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                        {{ prod?.id }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.name }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.cost }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.hsnNo }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                        <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {{ prod?.category?.name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.category?.id }}</label >
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.category?.name }}</label >
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.category?.description }}</label >
                        </ul>
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                        <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {{ prod?.brand?.name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.brand?.id }}</label >
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.brand?.name }}</label >
                          <label class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.brand?.description }}</label >
                        </ul>
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.description }}
                      </td>
                    </tr>


                  </tbody>
                </table>
              </div>
            </div>

            <div class="tab-pane fade active pt-2"
              :class="{ show: currentTab === 'accessories', active: currentTab === 'accessories' }" id="accessories"
              role="tabpanel" aria-labelledby="accessories-tab" v-show="currentTab === 'accessories'">
              <!-- accessories Details Content Here -->
              <div class="row ps-2">
                <div class="row mb-20"></div>
                <div class="col-lg-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      DATE :<span class="ms-1 text-optional">{{ formatDate(consignmentDetail?.createdAt) }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Accessory :<span class=" ms-1 text-optional fs-14">{{
                        consignmentDetail?.accessories[0]?.name }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Accessory Code :<span class="ms-1 text-optional">{{ consignmentDetail?.accessories[0]?.id }}</span>
                    </li>
                    
                  </ul>
                </div>
                <div class="col-lg-4 ps-xxl-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Description :<span class="ms-1 text-optional">{{ consignmentDetail?.accessories[0]?.description
                        }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Unit Cost :<span class="ms-1 text-optional">{{ currncySymbol }}
                        {{ consignmentDetail?.accessories[0]?.cost }}</span>
                    </li>
                  </ul>
                </div>
            
                <div class="table-responsive pb-75">
                  <table class="table text-nowrap table-bordered table-hover align-middle mb-0">
                    <thead>
                      <tr class="bg_mild">
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Accessory ID
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Accessory Name
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Description
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Unit Price
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Category
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(prod, index) in consignmentDetail?.accessories" :key="index"
                        class="br-s-1">
                        <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                          {{ prod?.id }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.name }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.description }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.cost }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                          <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ prod?.category?.name }}
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.category?.id }}</li>
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.category?.name }}</li>
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.category?.description }}</li>
                          </ul>
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                          <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ prod?.brand?.name }}
                          </button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.brand?.id }}</li>
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.brand?.name }}</li>
                            <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.brand?.description }}</li>
                          </ul>
                        </td>
                      </tr>
  
  
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div class="tab-pane fade active pt-2"
              :class="{ show: currentTab === 'Service', active: currentTab === 'Service' }" id="Service" role="tabpanel"
              aria-labelledby="Service-tab" v-show="currentTab === 'Service'">
              <!-- Service Details Content Here -->

              <div class="row ps-2">
                <div class="row mb-20"></div>
                <div class="col-lg-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      DATE :<span class="ms-1 text-optional">{{ formatDate(consignmentDetail?.createdAt) }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Service :<span class="ms-1 text-optional">{{
                        consignmentDetail?.services[0]?.name }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Service Code :<span class="ms-1 text-optional">{{ consignmentDetail?.services[0]?.id }}</span>
                    </li>
                   
                  </ul>
                </div>
                <div class="col-lg-4 ps-xxl-6">
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Description :<span class="ms-1 text-optional">{{ consignmentDetail?.services[0]?.description
                        }}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      Unit Cost :<span class="ms-1 text-optional">{{ currncySymbol }}
                        {{ consignmentDetail?.services[0]?.cost }}</span>
                    </li>
                  </ul>
                </div>
               
              </div>
              <div class="table-responsive pb-75">
                <table class="table text-nowrap table-bordered table-hover align-middle mb-0">
                  <thead>
                    <tr class="bg_mild">
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Service ID
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Service Name
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Description
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Unit Price
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Category
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prod, index) in consignmentDetail?.services" :key="index"
                      class="br-s-1">
                      <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                        {{ prod?.id }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.name }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.description }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.cost }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                        <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {{ prod?.category?.name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.category?.id }}</li>
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.category?.name }}</li>
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.category?.description }}</li>
                        </ul>
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph dropdown">
                        <button class="btn dropdown-toggle shadow-none lh-1 fs-14 fw-normal text-paragraph" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          {{ prod?.serviceTier?.name }}
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">ID: {{ prod?.serviceTier?.id }}</li>
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Name: {{ prod?.serviceTier?.name }}</li>
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Description: {{ prod?.serviceTier?.description }}</li>
                          <li class="dropdown-item shadow-none lh-1 fs-14 fw-normal text-paragraph">Type: {{ prod?.serviceTier?.type }}</li>
                        </ul>
                      </td>
                    </tr>


                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import stateStore from "../../../utils/store";
import { formatDate, BASE_URL } from '@/utils/utils';
export default {
  name: "consignmentListDetails",
  data() {
    return {
      currncySymbol: "₹",
      stateStore,
      loading: true, // Add this line
      currentTab: 'Product'
    };
  },
  computed: {
    getCustomerName() {
      return this.stateStore.consignmentDetails.createdFor?.first_name + " " + this.stateStore.consignmentDetails.createdFor?.last_name;
    },
    getCreatedByName() {
      return this.stateStore.consignmentDetails.user?.first_name + " " + this.stateStore.consignmentDetails.user?.last_name;
    },
    consignmentDetail() {
      return stateStore.consignmentDetails;
    },
  },
  methods: {
    formatDate
  }
};
</script>
<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
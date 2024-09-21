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
        <!-- Product Details Content Here -->
        <div class="row ms-5">
          <div class="row mb-20"></div>
          <div class="col">
            <ul class="details-title list-style mb-2">
              <li class="fs-14 fw-semibold text-title lh-1">
                DATE :<span class="text-optional ms-1">{{ formatDate(consignmentDetail?.createdAt) }}</span>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul class="details-title list-style mb-2">
              <li class="fs-14 fw-semibold text-title lh-1">
                STATUS :<span class="text-optional ms-1">{{ consignmentDetail?.inOut }}</span>
              </li>
            </ul>
          </div>
          <div class="col">
            <ul class="details-title list-style mb-2">
              <li class="fs-14 fw-semibold text-title lh-1">
                TOTAL AMOUNT :<span class="text-optional ms-1"> ₹ {{ consignmentDetail?.totalAmount }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="modal-body pb-40">
          <ul class="nav nav-tabs" id="detailsTab" role="tablist">
            <li class="nav-item" role="presentation" v-if="showProductDetailsTab">
              <a :class="{ 'nav-link': true, active: currentTab === 'Product' }" id="Product-tab" data-bs-toggle="tab"
                href="#Product" role="tab" aria-controls="Product" aria-selected="false"
                @click="currentTab = 'Product'">Product
                Details</a>
            </li>
            <li class="nav-item" role="presentation" v-if="showAccessoryDetailsTab">
              <a :class="{ 'nav-link': true, active: currentTab === 'accessories' }" id="accessories-tab"
                data-bs-toggle="tab" href="#accessories" role="tab" aria-controls="accessories" aria-selected="false"
                @click="currentTab = 'accessories'">Accessory
                Details</a>
            </li>
            <li class="nav-item" role="presentation" v-if="showServiceDetailsTab">
              <a :class="{ 'nav-link': true, active: currentTab === 'Service' }" id="Service-tab" data-bs-toggle="tab"
                href="#Service" role="tab" aria-controls="Service" aria-selected="false"
                @click="currentTab = 'Service'">Service Details</a>
            </li>
          </ul>
          <div class="tab-content" id="detailsTabContent">

            <div class="tab-pane fade active pt-2"
              :class="{ show: currentTab === 'Product', active: currentTab === 'Product' }" id="Product" role="tabpanel"
              aria-labelledby="Product-tab" v-show="currentTab === 'Product'">

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
                        IDU Serial No.
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        ODU Serial No.
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
                    <tr v-for="(prod, index) in consignmentDetail?.products" :key="index" class="br-s-1">
                      <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                        {{ prod?.productId === "" || prod?.productId == null ? "-" : prod?.productId }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.product === "" || prod?.product == null ? "-" : prod?.product }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.unitPrice === "" || prod?.unitPrice == null ? "-" : prod?.unitPrice }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.iduSerialNo === "" || prod?.iduSerialNo == null ? "-" : prod?.iduSerialNo }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.oduSerialNo === "" || prod?.oduSerialNo == null ? "-" : prod?.oduSerialNo }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.type === "" || prod?.type == null ? "-" : prod?.type }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.description === "" || prod?.description == null ? "-" : prod?.description }}
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
                          Quantity
                        </th>
                        <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(prod, index) in consignmentDetail?.accessories" :key="index" class="br-s-1">
                        <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                          {{ prod?.accessoryId === "" || prod?.accessoryId == null ? "-" : prod?.accessoryId }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.accessory === "" || prod?.accessory == null ? "-" : prod?.accessory }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.description === "" || prod?.description == null ? "-" : prod?.description }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.unitPrice === "" || prod?.unitPrice == null ? "-" : prod?.unitPrice }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.quantity === "" || prod?.quantity == null ? "-" : prod?.quantity }}
                        </td>
                        <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                          {{ prod?.type === "" || prod?.type == null ? "-" : prod?.type }}
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
                        Quantity
                      </th>
                      <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prod, index) in consignmentDetail?.services" :key="index" class="br-s-1">
                      <td class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1">
                        {{ prod?.serviceId === "" || prod?.serviceId == null ? "-" : prod?.serviceId }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.service === "" || prod?.service == null ? "-" : prod?.service }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.description === "" || prod?.description == null ? "-" : prod?.description }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.unitPrice === "" || prod?.unitPrice == null ? "-" : prod?.unitPrice }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.quantity === "" || prod?.quantity == null ? "-" : prod?.quantity }}
                      </td>
                      <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                        {{ prod?.type === "" || prod?.type == null ? "-" : prod?.type }}
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
import { ref, onMounted } from 'vue';
import stateStore from "../../../utils/store";
import { formatDate, BASE_URL } from '@/utils/utils';
import EventBus from '../../../events/event-bus'; // Make sure EventBus is properly set up

export default {
  name: "ConsignmentListDetails",
  data() {
    return {
      currncySymbol: "₹",
      loading: true,
      currentTab: '',
      showProductDetailsTab: false,
      showAccessoryDetailsTab: false,
      showServiceDetailsTab: false,
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
    formatDate,

    updateTabVisibility(consignmentItem) {
      // Ensure properties are arrays and check if they have items
      this.showProductDetailsTab = Array.isArray(consignmentItem.products) && consignmentItem.products.length > 0;
      this.showAccessoryDetailsTab = Array.isArray(consignmentItem.accessories) && consignmentItem.accessories.length > 0;
      this.showServiceDetailsTab = Array.isArray(consignmentItem.services) && consignmentItem.services.length > 0;

      if (this.showProductDetailsTab) {
        this.currentTab = 'Product'
      } else if (this.showAccessoryDetailsTab) {
        this.currentTab = 'accessories'
      } else {
        this.currentTab = 'Service'
      }

    },

  },
  mounted() {
    EventBus.on('consignmentSelected', (consignmentItem) => {
      this.updateTabVisibility(consignmentItem);
    });

    // Optionally, if you want to handle cases where the consignmentDetails might change on the fly
    this.$watch(
      () => this.stateStore?.consignmentDetails,
      (newDetails) => {
        if (newDetails) {
          this.updateTabVisibility(newDetails);
        }
      },
      { immediate: true }
    );
  },
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
<template>
  <div
      class="modal fade"
      id="detailsModal"
      tabindex="-1"
      aria-labelledby="detailsModalLabel"
      aria-hidden="true"
  >
    <div
        class="modal-dialog modal-lg modal-xxl modal-dialog-centered modal-dialog-scrollable"
    >
      <div class="modal-content modal-dialog-scrollable">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="detailsModalLabel">
            Details
          </h5>
          <button
              type="button"
              class="btn-close p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
          >
            <img
                src="../../../assets/img/icons/close-circle-2.svg"
                alt="Image"
            />
          </button>
        </div>
        <div class="modal-body pb-40">
          <ul class="nav nav-tabs" id="detailsTab" role="tablist">
            <li class="nav-item" role="presentation">
              <a
                  class="nav-link active"
                  id="purchase-tab"
                  data-bs-toggle="tab"
                  href="#purchase"
                  role="tab"
                  aria-controls="purchase"
                  aria-selected="true"
                  @click="currentTab = 'purchase'"
              >Purchase Details</a>
            </li>
            <li class="nav-item" role="presentation">
              <a
                  class="nav-link"
                  id="sales-tab"
                  data-bs-toggle="tab"
                  href="#sales"
                  role="tab"
                  aria-controls="sales"
                  aria-selected="false"
                  @click="currentTab = 'sales'"
              >Sales Order Details</a>
            </li>
          </ul>
          <div class="tab-content" id="detailsTabContent">
            <div
                class="tab-pane fade"
                :class="{ show: currentTab === 'purchase', active: currentTab === 'purchase' }"
                id="purchase"
                role="tabpanel"
                aria-labelledby="purchase-tab"
                v-show="currentTab === 'purchase'"
            >
              <!-- Purchase Details Content Here -->
              <div class="row">
                <div class="row mb-20"></div>
                <div class="col-lg-4">
                  <h6 class="fs-16 fw-bold text-title mb-20">Purchase info:</h6>
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-medium text-title lh-1">
                      DATE :<span class="fw-semibold ms-1">{{formatDate(stateStore.purchaseDetails.createdAt)}}</span>
                    </li>
                    <li class="fs-14 fw-medium text-title lh-1">
                      STATUS :<span
                        class="badge badge-outline-purple fw-semibold ms-1 fs-14"
                    >{{stateStore.purchaseDetails.status}}</span
                    >
                    </li>
                    <li class="fs-14 fw-medium text-title lh-1">
                      ID :<span class="fw-semibold ms-1">{{stateStore.purchaseDetails.id}}</span>
                    </li>
                    <li class="fs-14 fw-medium text-title lh-1">
                      PERSONA :<span class="fw-semibold ms-1">{{stateStore.purchaseDetails.userPersona}}</span>
                    </li>
                    <li class="fs-14 fw-medium text-title lh-1">
                      BUDGET :<span class="fw-semibold ms-1">{{ currncySymbol }} {{stateStore.purchaseDetails.budget}}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-4 ps-xxl-6">
                  <h6 class="fs-16 fw-bold text-title mb-20">Customer info:</h6>
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      NAME :<span class="ms-1 text-optional">{{getCustomerName}}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      MAIL :<span class="text-optional ms-1"
                    >{{stateStore.purchaseDetails.user.email}}</span
                    >
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      PHONE :<span class="text-optional ms-1">{{stateStore.purchaseDetails.user.phone_number}}</span>
                    </li>
                  </ul>
                </div>
                <div class="col-lg-4 ps-xxl-6">
                  <h6 class="fs-16 fw-bold text-title mb-20">Order Created By:</h6>
                  <ul class="details-title list-style mb-40">
                    <li class="fs-14 fw-semibold text-title lh-1">
                      NAME :<span class="ms-1 text-optional">{{getCreatedByName}}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      MAIL :<span class="text-optional ms-1">{{stateStore.purchaseDetails.createdBy.email}}</span>
                    </li>
                    <li class="fs-14 fw-semibold text-title lh-1">
                      PHONE :<span class="text-optional ms-1">{{stateStore.purchaseDetails.createdBy.phone_number}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="table-responsive style-two">
                <table class="table text-nowrap align-middle mb-0 border-0">
                  <thead>
                  <tr class="bg_mild">
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      ID
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Product ID
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Product Name
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Unit Price
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Quantity
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Discount
                    </th>
                    <th
                        scope="col"
                        class="text-title fw-normal fs-14 lh-1 bg_mild"
                    >
                      Sub Total
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="(orderItems, index) in stateStore.purchaseDetails.purchaseOrderItems" :key="index" class="br-s-1">
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1"
                    >
                      {{orderItems.id}}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.product.id}}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.product.name}}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.price || 0 }}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.quantity }}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.discount || 0 }}
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{orderItems.price * orderItems.quantity || 0 }}
                    </td>
                  </tr>

                  <tr>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <!-- <td
                      class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1"
                    >
                      PAID
                    </td>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      {{currncySymbol}} 200.00
                    </td> -->
                  </tr>
                  <tr>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>
                    <td
                        class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"
                    ></td>

                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
                class="tab-pane fade"
                :class="{ show: currentTab === 'sales', active: currentTab === 'sales' }"
                id="sales"
                role="tabpanel"
                aria-labelledby="sales-tab"
                v-show="currentTab === 'sales'"
            >
              <!-- Sales Order Details Content Here -->
              <div class="modal-body pb-40 border-0">
<!--                <div class="table-responsive style-two">-->
                  <div v-for="(soItems, index) in stateStore.salesOrderDetails" :key="index"class="table-responsive style-two pb-40 border-0">
<!--                   <ol v-for="(soItems, index) in stateStore.salesOrderDetails" :key="index" class="table text-nowrap align-middle mb-0 border-0">-->
                          <div class="row">
                            <div class="col-lg-4">
                              <h6 class="fs-16 fw-bold text-title mb-20">Sales info:</h6>
                                <ul class="details-title list-style mb-40">
                                  <li class="fs-14 fw-medium text-title lh-1">
                                    DATE :<span class="fw-semibold ms-1">{{formatDate(soItems.createdAt)}}</span>
                                  </li>
                                  <li class="fs-14 fw-medium text-title lh-1">
                                    STATUS :<span
                                      class="badge badge-outline-purple fw-semibold ms-1 fs-14"
                                  >{{soItems.status}}</span
                                  >
                                  </li>
                                  <li class="fs-14 fw-medium text-title lh-1">
                                    ID :<span class="fw-semibold ms-1">{{soItems.id}}</span>
                                  </li>
                              </ul>
                            </div>
                            <div class="col-lg-4 ps-xxl-6">
                              <h6 class="fs-16 fw-bold text-title mb-20">Customer info:</h6>
                              <ul class="details-title list-style mb-40">
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  NAME :<span class="ms-1 text-optional">{{getCustomerName}}</span>
                                </li>
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  MAIL :<span class="text-optional ms-1"
                                >{{stateStore.purchaseDetails.user.email}}</span
                                >
                                </li>
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  PHONE :<span class="text-optional ms-1">{{stateStore.purchaseDetails.user.phone_number}}</span>
                                </li>
                              </ul>
                            </div>
                            <div class="col-lg-4 ps-xxl-6">
                              <h6 class="fs-16 fw-bold text-title mb-20">Order Created By:</h6>
                              <ul class="details-title list-style mb-40">
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  NAME :<span class="ms-1 text-optional">{{getCreatedByName}}</span>
                                </li>
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  MAIL :<span class="text-optional ms-1">{{stateStore.purchaseDetails.createdBy.email}}</span>
                                </li>
                                <li class="fs-14 fw-semibold text-title lh-1">
                                  PHONE :<span class="text-optional ms-1">{{stateStore.purchaseDetails.createdBy.phone_number}}</span>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div class="bg-mild">
                            <table class="table text-nowrap align-middle mb-0 border-0">
                              <thead>
                              <tr class="bg_mild">
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Sales Order ID
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Product ID
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Product Name
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Unit Price
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Quantity
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Discount
                                </th>
                                <th
                                    scope="col"
                                    class="text-title fw-normal fs-14 lh-1 bg_mild"
                                >
                                  Sub Total
                                </th>
                              </tr>
                              </thead>
                              <tr v-for="(soiItem, subIndex) in soItems.salesOrderItems" :key="subIndex">
                                <td
                                    class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1 border-bottom"
                                >
                                  {{soiItem?.id || NA}}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem?.product?.id || NA}}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem?.product?.name || NA}}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem?.price || 0 }}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem?.quantity || 0 }}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem.discount || 0 }}
                                </td>
                                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph border-bottom">
                                  {{soiItem.price * soiItem.quantity || 0 }}
                                </td>

                              </tr>
    <!--                          <tr>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->
    <!--                            <td-->
    <!--                                class="shadow-none lh-1 fs-14 fw-semibold text-paragraph border-0"-->
    <!--                            ></td>-->

    <!--                          </tr>-->
                            </table>
                          </div>
    <!--                    </table>-->

                        <!--                </tbody>-->
    <!--                  </div>-->
<!--                   </ol>-->
            </div>
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
  name: "PurchaseDetails",
  data() {
    return {
      currncySymbol:"₹",
      stateStore,
      loading: true, // Add this line
      currentTab: 'purchase'
    };
  },
  computed: {
    getCustomerName() {
      return this.stateStore.purchaseDetails.user?.first_name + " " + this.stateStore.purchaseDetails.user?.last_name;
    },
   getCreatedByName() {
      return this.stateStore.purchaseDetails.createdBy?.first_name + " " + this.stateStore.purchaseDetails.createdBy?.last_name;
    }
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
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
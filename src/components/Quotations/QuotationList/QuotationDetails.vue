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
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="detailsModalLabel">
            Quotation Details
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
          <div class="row">
            <div class="col-lg-4">
              <h6 class="fs-16 fw-bold text-title mb-20">Quotation info:</h6>
              <ul class="details-title list-style mb-40">
                <li class="fs-14 fw-medium text-title lh-1">
                  DATE :<span class="fw-semibold ms-1">{{formatDate(stateStore.quotationDetails.createdAt)}}</span>
                </li>
                <!-- <li class="fs-14 fw-medium text-title lh-1">
                  TIME :<span class="fw-semibold ms-1">20:31</span>
                </li> -->
                <li class="fs-14 fw-medium text-title lh-1">
                  STATUS :<span
                    class="badge badge-outline-purple fw-semibold ms-1 fs-14"
                >{{stateStore.quotationDetails.status}}</span
                >
                </li>
                <li class="fs-14 fw-medium text-title lh-1">
                  ID :<span class="fw-semibold ms-1">{{stateStore.quotationDetails.id}}</span>
                </li>
                <li class="fs-14 fw-medium text-title lh-1">
                  PERSONA :<span class="fw-semibold ms-1">{{stateStore.quotationDetails.userPersona}}</span>
                </li>
                <li class="fs-14 fw-medium text-title lh-1">
                  BUDGET :<span class="fw-semibold ms-1">{{ currncySymbol }} {{stateStore.quotationDetails.budget}}</span>
                </li>
                <!-- <li class="fs-14 fw-medium text-title lh-1">
                  PAYMENT STATUS :<span
                    class="badge badge-outline-green fw-semibold ms-1 fs-14"
                    >Paid</span
                  >
                </li> -->
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
                >{{stateStore.quotationDetails.user.email}}</span
                >
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  PHONE :<span class="text-optional ms-1">{{stateStore.quotationDetails.user.phone_number}}</span>
                </li>
                <!-- <li class="fs-14 fw-semibold text-title lh-1">
                  ADDRESS :<span class="text-optional ms-1"
                    >2750 Quadra Street, Canada</span
                  >
                </li> -->
              </ul>
            </div>
            <div class="col-lg-4 ps-xxl-6">
              <h6 class="fs-16 fw-bold text-title mb-20">Quotation Created By:</h6>
              <ul class="details-title list-style mb-40">
                <li class="fs-14 fw-semibold text-title lh-1">
                  NAME :<span class="ms-1 text-optional">{{getCreatedByName}}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  MAIL :<span class="text-optional ms-1">{{stateStore.quotationDetails.createdBy.email}}</span>
                </li>
                <li class="fs-14 fw-semibold text-title lh-1">
                  PHONE :<span class="text-optional ms-1">{{stateStore.quotationDetails.createdBy.phone_number}}</span>
                </li>
                <!-- <li class="fs-14 fw-semibold text-title lh-1">
                  ADDRESS :<span class="text-optional ms-1"
                    >413 North Las Vegas, NV 89032</span
                  >
                </li> -->
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
                  Effective Price
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
              <tr v-for="(quotationItem, index) in stateStore.quotationDetails.quotationItems" :key="index" class="br-s-1">
                <td
                    class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-s-1"
                >
                  {{quotationItem.id}}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.product.id}}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.product.name}}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.unitPrice || 0 }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.quantity }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.discountAmount || 0 }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.effectivePrice || 0 }}
                </td>
                <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                  {{quotationItem.effectivePrice * quotationItem.quantity || 0 }}
                </td>
              </tr>
              <div>
                <tr>
                  <th
                      scope="col"
                      class="text-title fw-normal fs-14 lh-1 bg_mild text-right"
                      colspan="4"
                  >
                    Total
                  </th>
                  <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph" colspan="4">
                    {{stateStore.quotationDetails.budget}}
                  </td>
                </tr>
              </div>

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
                <!-- <td
                  class="shadow-none lh-1 fs-14 fw-normal text-title float-right br-s-1 br-1"
                >
                  DUE
                </td>
                <td
                  class="shadow-none lh-1 fs-14 fw-semibold text-paragraph br-1"
                >
                  {{currncySymbol}} 0.00
                </td> -->
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div
          class="modal-footer pt-25 pb-35 d-flex flex-wrap justify-content-end"
        >
          <button class="btn style-six">SMS</button>
          <button class="btn style-seven">EMAIL</button>
          <a href="#" class="btn style-eight"> pdf </a>
          <a
            class="btn style-five upload-btn px-xxl-6"
            onclick="window.print();"
          >
            Print
            <img src="../../../assets/img/icons/download.svg" alt="Image" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import stateStore from "../../../utils/store";
import { formatDate, BASE_URL } from '@/utils/utils';
export default {
  name: "QuotationDetails",
  data() {
    return {
      currncySymbol:"₹",
      stateStore
    };
  },
  computed: {
    getCustomerName() {
      return this.stateStore.quotationDetails.user?.first_name + " " + this.stateStore.quotationDetails.user?.last_name;
    },
    getCreatedByName() {
      return this.stateStore.quotationDetails.createdBy?.first_name + " " + this.stateStore.quotationDetails.createdBy?.last_name;
    }
  },
  methods: {
    formatDate
  }
};
</script>
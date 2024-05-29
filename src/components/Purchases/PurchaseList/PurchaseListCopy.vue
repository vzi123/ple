<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive style-three">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
            <tr>
              <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0">
                <div class="form-check checkbox">
                  <input class="form-check-input" type="checkbox" id="test_1" />
                  <label class="form-check-label" for="test_1">
                    DATE
                    <img
                      class="ms-2"
                      src="../../../assets/img/icons/up-down-aroow.svg"
                      alt="Image"
                    />
                  </label>
                </div>
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                REFERENCE
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                CUSTOMER
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                WAREHOUSE
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                STATUS
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                GRAND TOTAL
                <img
                  class="ms-2"
                  src="../../../assets/img/icons/up-down-aroow.svg"
                  alt="Image"
                />
              </th>
              <th scope="col" class="text-title fw-normal fs-14 pt-0">
                Phone Number
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
          
         <tbody v-for="(purchaseItem, index) in filteredPurchaseList" :key="index">
         
            

            <tr>
              <td class="shadow-none fw-normal text-black title ps-0">
                <div class="d-flex align-items-center">
                  <div class="form-check checkbox style-three">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="test_7"
                    />
                    <label class="form-check-label text-optional" for="test_7">
                    </label>
                  </div>
                  <span class="text-optional fs-14 ms-2">{{ purchaseItem.date }}</span>
                </div>
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ purchaseItem.reference }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
               {{ purchaseItem.customer}}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ purchaseItem.warehouse }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                <span class="badge badge-success fs-14 fw-normal"
                  >{{ purchaseItem.status }}</span
                >
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ currncySymbol }} {{ purchaseItem.grandTotal }}
              </td>
              <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                {{ purchaseItem.phoneNumber }}
              </td>
              <td class="shadow-none lh-1 text-end pe-0">
                <div class="button-group d-flex flex-wrap align-items-center">
                  <a
                    href="javascript:void(0)"
                    title="View"
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                  >
                    <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                  </a>
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

<script>

import { ref, computed } from 'vue';
import { useEventBus } from '../../../events/searchEvent'; // Import the event bus

export default {
  name: "PurchaseList",
  setup() {
    const { on } = useEventBus();
    const searchTerm = ref('');
    const purchaseListData = ref([
      {
        date: "1/09/2023",
        reference: "5389607",
        customer: "Eeza Corporation",
        warehouse: "Warehouse 02",
        status: "Received",
        grandTotal: "15300.00",
        phoneNumber: "91+1234567890",
        action: {
          view: "eye.svg",
          edit: "edit.svg",
          close: "close.svg"
        }
      },
      {
        date: "11/09/2023",
        reference: "5389610",
        customer: " Corporation 1",
        warehouse: "Warehouse 01",
        status: "sent",
        grandTotal: "15100.00",
        phoneNumber: "91+111456123",
        action: {
          view: "eye.svg",
          edit: "edit.svg",
          close: "close.svg"
        }
      },
      {
        date: "17/09/2023",
        reference: "5389117",
        customer: " Corporation 3",
        warehouse: "Warehouse 03",
        status: "pending",
        grandTotal: "11100.00",
        phoneNumber: "91+9876543211",
        action: {
          view: "eye.svg",
          edit: "edit.svg",
          close: "close.svg"
        }
      }
    ]);

    on('searchTermUpdated', (updatedSearchTerm) => {
      console.log('updatedSearchTerm' + updatedSearchTerm);
      searchTerm.value = updatedSearchTerm; // Update the searchTerm value
    
    });

    const filteredPurchaseList = computed(() => {
      return purchaseListData.value.filter(purchase => {
        return purchase.customer.toLowerCase().includes(searchTerm.value.toLowerCase());
      });
    });

    return {
      searchTerm,
      filteredPurchaseList
    };
  }
};



</script>
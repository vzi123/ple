<template>
  <MainHeader />
  <MainSidebar />
  <div class="main-content bg_gray d-flex flex-column transition overflow-hidden">
    <BreadcrumbMenu pageTitle="Outward Inventory Details" />
    <div class="row mb-40">
      <div class="col-lg-4" v-if="prods.id !== ''">
        <div class="form-group mb-25">
          <h6 class="fs-18 mb-35 text-title fw-semibold aligned:left">Customer</h6>
          <v-select v-model="prods.createdFor.first_name" :options="customers" :reduce="customer => customer.code"
            label="name" class="bg-white border-0 rounded-1 fs-14 text-optional" placeholder="Select Customer"
            :disabled="true" />

        </div>
        <div class="form-group mb-25">
          <h6 class="fs-18 mb-35 text-title fw-semibold aligned:left">Consignment ID</h6>
          <label class="bg-white border-0 rounded-1 fs-14 text-optional p-4 w-50">{{ prods.id }}</label>
        </div>
      </div>
      <div class="col-lg-4" v-else>
        <div class="form-group mb-25">
          <h6 class="fs-18 mb-35 text-title fw-semibold aligned:left">Customer</h6>
          <v-select v-model="form.customer" :options="customers" :reduce="customer => customer.code" label="name"
            class="bg-white border-0 rounded-1 fs-14 text-optional" placeholder="Select Customer" />
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group mb-25">

        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label class="d-block fs-14 text-black mb-2">Choose Product</label>
          <div class="search-area style-two position-relative w-100">
            <Typeahead @update:modelValue="onUpdateProducts" :minInputLength="0" :requestDelay="0"
              placeholder="Search by product" :items="allProducts.map(product => product.product)" />
            <div class="mt-2" v-show="products.length > 0">
              <span :class="{
                badge: true,
                'rounded-pill': true,
                'bg-dark': true,
                'ms-2': index > 0
              }" style="font-size:inherit" v-for="(product, index) in products" :key="index">
                {{ product.product }}
              </span>
            </div>

            <!-- <input
              type="text"
              placeholder="Scan / Search product by code"
              class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white"
            /> -->
          </div>
        </div>
      </div>
    </div>
    <SelectedProducts @remove-product="removeProduct" :products="products" :showDiscounts="false" />
    <div class="row mb-20">
      <div class="col-12">
        <div class="form-group">
          <label class="d-block fs-14 text-black mb-2">Choose Accessory</label>
          <div class="search-area style-two position-relative w-100">
            <Typeahead @update:modelValue="onUpdateAccessories" :minInputLength="0" :requestDelay="0"
              placeholder="Search by Accessory" :items="allAccessories.map(accessory => accessory.accessory)" />
            <div class="mt-2" v-show="accessories.length > 0">
              <span :class="{
                badge: true,
                'rounded-pill': true,
                'bg-dark': true,
                'ms-2': index > 0
              }" style="font-size:inherit" v-for="(accessory, index) in accessories" :key="index">
                {{ accessory.accessory }}
              </span>
            </div>

            <!-- <input
                  type="text"
                  placeholder="Scan / Search accessory by code"
                  class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white"
                /> -->
          </div>
        </div>
      </div>
    </div>
    <SelectedAccessories @remove-accessory="removeAccessory" :accessories="accessories" :showDiscounts="false" />
    <div class="row mb-20">
      <div class="col-12">
        <div class="form-group">
          <label class="d-block fs-14 text-black mb-2">Choose Services</label>
          <div class="search-area style-two position-relative w-100">
            <Typeahead @update:modelValue="onUpdateServices" :minInputLength="0" :requestDelay="0"
              placeholder="Search by Service" :items="allServices.map(service => service.service)" />
            <div class="mt-2" v-show="services.length > 0">
              <span :class="{
                badge: true,
                'rounded-pill': true,
                'bg-dark': true,
                'ms-2': index > 0
              }" style="font-size:inherit" v-for="(service, index) in services" :key="index">
                {{ service.service }}
              </span>
            </div>
            <!-- <input
                          type="text"
                          placeholder="Scan / Search Service by code"
                          class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white"
                        /> -->
          </div>
        </div>
      </div>
    </div>
    <SelectedServices @remove-service="removeService" :services="services" :showDiscounts="false" />
    <SubmitPurchase :filteredList="filteredList" :filteredAccessoriesList="filteredAccessoriesList"
      :filteredServicesList="filteredServicesList" @submit="submitFilteredList" />
    <a class="delete-btn" data-bs-toggle="offcanvas" href="#loadingPopup" role="button" aria-controls="loadingPopup"
      ref="myBtn">
      <img />
    </a>

    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>

  <div class="delete-popup offcanvas offcanvas-end border-0" tabindex="-1" id="deletePopup">
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your Item is deleted from the list.
        </span>
      </div>
    </div>
  </div>

  <div class="created-popup offcanvas offcanvas-end border-0" tabindex="-1" id="loadingPopup">
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your Inventory is saved.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import axios from "axios";
import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import SelectedProducts from "../../components/Sales/CreateSales/SelectedProducts.vue";
import SelectedAccessories from "../../components/Sales/CreateSales/SelectedAccessories.vue";
import SelectedServices from "../../components/Sales/CreateSales/SelectedServices.vue";
import SubmitPurchase from "../../components/Sales/CreateSales/SubmitPurchase.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";
import Typeahead from "../../components/Common/TypeAhead.vue";
import EventBus from '@/events/event-bus';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import stateStore from "@/utils/store";
import { BASE_URL } from "@/utils/utils";

interface Product {
  productId: number;
  product: string;
  // Add other properties as necessary
}

interface Service {
  serviceId: number;
  service: string;
  // Add other properties as necessary
}

interface Accessory {
  accessoryId: number;
  accessory: string;
  // Add other properties as necessary
}

export default defineComponent({
  name: "InPage",
  components: {
    MainHeader,
    MainSidebar,
    BreadcrumbMenu,
    SelectedProducts,
    SelectedAccessories,
    SelectedServices,
    SubmitPurchase,
    MainFooter,
    Typeahead,
    vSelect
  },
  data() {
    return {
      selectedCustomer: null,
      form: {
        date: "",
        customer: "",
        branch: "",
        project: "",
      },
      products: [] as Product[],
      accessories: [] as Accessory[],
      services: [] as Service[],
      detailedAccessories: [] as Accessory[],
      detailedProducts: [] as Product[],
      detailedServices: [] as Service[],
      allProducts: [] as Product[],
      allAccessories: [] as Accessory[],
      allServices: [] as Service[],
      customers: [],
      projects: [],
      filteredList: [] as Product[],
      filteredAccessoriesList: [] as Accessory[],
      filteredServicesList: [] as Service[],
      discount: 0,
      total: 0,
      status: "Packed",
      notes: "",
    }
  },
  created() {
    // Set the customer after the component is created
    this.form.customer = this.prodID ? this.prodCFID : "";
  },
  computed: {
    prods() {
      return stateStore.consignmentDetails;
    },
    prodID() {
      return stateStore.consignmentDetails.id;
    },
    prodCFID() {
      return stateStore.consignmentDetails.createdFor.id;
    }
  },
  watch: {
    prods: {
      handler(newVal) {
        this.selectedCustomer = newVal?.createdFor?.first_name || null;
        this.products = newVal?.products || [];
        this.accessories = newVal?.accessories || [];
        this.services = newVal?.services || [];
        if (this.prods.id !== "") {
          this.detailedProducts = newVal.products || [];
          this.detailedAccessories = newVal.accessories || [];
          this.detailedServices = newVal.services || [];

          this.filteredList = newVal?.products || [];
          this.filteredAccessoriesList = newVal?.accessories || [];
          this.filteredServicesList = newVal?.services || [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  unmounted() {
    // Reset the state
    stateStore.consignmentDetails = stateStore.resetConsignmentDetails;
  },
  methods: {
    onUpdateProducts(productName: string) {
      // Find the full product details using the product name
      const fullProduct = this.allProducts.find(product => product.product === productName);

      if (fullProduct) {
        // Clone the product object to avoid duplicating the same reference
        // const newProduct = { ...fullProduct };

        this.products.push({ ...fullProduct }); // Push the cloned product object
        EventBus.emit('onUpdateProducts', this.products);
        stateStore.inWards = this.products;
        console.log(stateStore.inWards.value);
      } else {
        console.error('Product not found:', productName);
      }
    },
    removeProduct(index: number) {
      this.products.splice(index, 1);
      EventBus.emit('onUpdateProducts', this.products);
    },
    onUpdateServices(serviceName: string) {
      // Assuming you have access to the full service details, e.g., via a lookup
      const fullService = this.allServices.find(service => service.service === serviceName);

      if (fullService) {
        // Check if the service is already in the list
        const isServiceExists = this.services.some(existingService => existingService.serviceId === fullService.serviceId);

        if (!isServiceExists) {
          // Only push if the service is not already present in the list
          this.services.push(fullService);
          EventBus.emit('onUpdateServices', this.services);
        }
      } else {
        console.error('Service not found:', serviceName);
      }
    },
    removeService(index: number) {
      this.services.splice(index, 1);
      EventBus.emit('onUpdateServices', this.services);
    },
    onUpdateAccessories(accessoryName: string) {
      // Find the full accessory details using the accessory name
      const fullAccessory = this.allAccessories.find(accessory => accessory.accessory === accessoryName);

      if (fullAccessory) {
        // Check if the accessory is already in the accessories array
        const exists = this.accessories.some(a => a.accessory === fullAccessory.accessory); // Adjust based on unique property

        if (!exists) {
          this.accessories.push(fullAccessory); // Push the full accessory object if not a duplicate
          EventBus.emit('onUpdateAccessories', this.accessories);
        } else {
          console.log('Accessory already exists:', fullAccessory.accessory);
        }
      } else {
        console.error('Accessory not found:', accessoryName);
      }
    },
    removeAccessory(index: number) {
      this.accessories.splice(index, 1);
      EventBus.emit('onUpdateAccessories', this.accessories);
    },
    async fetchCustomers() {
      try { //https://freezy-prod-frontend.fly.dev/$%7BBASE_URL%7D/freezy/v1/users/filter?type=customer
        const response = await axios.get(`${BASE_URL}/freezy/v1/users/filter?type=customer`);

        this.customers = response.data.map((customer: any) => ({
          code: customer.id,
          name: `${customer.first_name}`, // Change 'name' to 'product'
          email: customer.email,
          phone_number: customer.phone_number, // Default quantity
        }));
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    },
    async fetchProjects() {
      try {
        const response = await axios.get(`${BASE_URL}/freezy/projects/all`);

        this.projects = response.data.map((project: any) => ({
          code: project.id,
          name: project.name,
          status: project.status,

        }));
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    },
    async printPdf(response: any) {
      try {


        const blob = response.data;
        const url = window.URL.createObjectURL(blob);

        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;

        document.body.appendChild(iframe);

        iframe.onload = () => {
          if (iframe.contentWindow) {

            iframe.contentWindow.print();


          } else {
            console.error('Error: iframe.contentWindow is null');
          }
        };
      } catch (error) {
        console.error('Error fetching and printing PDF:', error);
      }
    },

    async submitFilteredList(submitData: any) {
      const requestData = {
        consignmentId: stateStore.consignmentDetails.id,
        userId: this.form.customer,
        projectId: this.form.project,
        userPersona: 'customer',
        products: this.detailedProducts,
        accessories: this.detailedAccessories,
        services: this.detailedServices,
        discount: submitData.discount,
        status: submitData.status,
        comments: submitData.notes,
        totalAmount: Number(submitData.total),
      };

      try {
        let response;

        // Check whether to update an existing consignment or create a new one
        const url = requestData.consignmentId
          ? `${BASE_URL}/freezy/v1/inventory/outward/${requestData.consignmentId}`
          : `${BASE_URL}/freezy/v1/inventory/outward`;

        // Send the request and expect a PDF blob response
        response = await axios.post(url, requestData, {
          headers: {
            "Content-Type": "application/json",
          },
          responseType: 'blob', // Expect a PDF blob response
        });

        console.log("Response:", url, requestData.userId, response.data);

        // After successful data submission, handle the PDF
        if (response && response.data) {
          // Reset consignment details and redirect after showing the PDF
          setTimeout(() => {
            stateStore.consignmentDetails = stateStore.resetConsignmentDetails;
            this.$router.push({ name: 'ConsignmentListPage' });
          }, 1500);

          // Call the printPdf function to display the PDF
          await this.printPdf(response);
        }

      } catch (error: any) {
        let errorMessage = 'An unknown error occurred. Please try again.';

        if (error.response && error.response.data) {
          errorMessage = error.response.data;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        window.alert(`Error: ${errorMessage}`);
        EventBus.emit('loadingCompleted');
        console.error("Error submitting the list:", error);
      }
    }


  },
  mounted() {
    EventBus.on('onAllProducts', (products: any) => {
      this.allProducts = products; // Update allProducts with the emitted value
    });
    EventBus.on('onFilteredProducts', (products: any) => {
      this.detailedProducts = products; // Capture detailed product data
      this.filteredList = products;
    });
    EventBus.on('onAllAccessories', (accessories: any) => {
      this.allAccessories = accessories; // Update allProducts with the emitted value
    });
    EventBus.on('onFilteredAccessories', (accessories: any) => {
      this.detailedAccessories = accessories; // Capture detailed product data
      this.filteredAccessoriesList = accessories;
    });
    EventBus.on('onAllServices', (services: any) => {
      this.allServices = services; // Update allProducts with the emitted value
    });
    EventBus.on('onFilteredServices', (services: any) => {
      this.detailedServices = services; // Capture detailed product data
      this.filteredServicesList = services;
    });
    EventBus.emit('requestAllProducts');
    EventBus.emit('requestAllAccessories');
    EventBus.emit('requestAllServices');
    this.fetchCustomers();
    this.fetchProjects();
  }
});
</script>

<style lang="scss">
.search-area.style-two input {
  padding-left: 20px !important;
}
</style>

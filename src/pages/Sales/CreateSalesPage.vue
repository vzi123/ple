<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <BreadcrumbMenu pageTitle="Create Sales" />
    <div class="row mb-40">
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Date</label>
          <input v-model="form.date"
            type="date"
            class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white"
          />
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Customer</label>
          <v-select
                     v-model="form.customer"
                     :options="customers"
                     :reduce="customer => customer.code"
                     label="name"
                     class="bg-white border-0 rounded-1 fs-14 text-optional"
                     placeholder="Select Customer"
              />
        </div>
      </div>
      <div class="col-lg-4">
        <div class="form-group mb-25">
          <label class="d-block fs-14 text-black mb-2">Branch</label>
           <v-select
                               v-model="form.project"
                               :options="projects"
                               :reduce="project => project.code"
                               label="name"
                               class="bg-white border-0 rounded-1 fs-14 text-optional"
                               placeholder="Select Project"
                        />
        </div>
      </div>
      <div class="col-12">
        <div class="form-group">
          <label class="d-block fs-14 text-black mb-2">Choose Product</label>
          <div class="search-area style-two position-relative w-100">
            <Typeahead @update:modelValue="onUpdateProducts" :minInputLength="0" :requestDelay="0" placeholder="Search by product" :items="allProducts.map(product => product.product)" />
            <div class="mt-2" v-show="products.length > 0">
              <span
                :class="{
                  badge: true,
                  'rounded-pill': true,
                  'bg-dark': true,
                  'ms-2': index > 0
                }"
                style="font-size:inherit"
                v-for="(product, index) in products"
                :key="index"
              >
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
    <SelectedProducts @remove-product="removeProduct" :products="products" :showDiscounts="true"  />
     <div class="col-12">
            <div class="form-group">
              <label class="d-block fs-14 text-black mb-2">Choose Accessory</label>
              <div class="search-area style-two position-relative w-100">
                <Typeahead @update:modelValue="onUpdateAccessories" :minInputLength="0" :requestDelay="0" placeholder="Search by Accessory" :items="allAccessories.map(accessory => accessory.accessory)" />
                <div class="mt-2" v-show="accessories.length > 0">
                  <span
                    :class="{
                      badge: true,
                      'rounded-pill': true,
                      'bg-dark': true,
                      'ms-2': index > 0
                    }"
                    style="font-size:inherit"
                    v-for="(accessory, index) in accessories"
                    :key="index"
                  >
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

        <SelectedAccessories @remove-accessory="removeAccessory" :accessories="accessories" :showDiscounts="false" />

             <div class="col-12">
                    <div class="form-group">
                      <label class="d-block fs-14 text-black mb-2">Choose Services</label>
                      <div class="search-area style-two position-relative w-100">
                        <Typeahead @update:modelValue="onUpdateServices" :minInputLength="0" :requestDelay="0" placeholder="Search by Service" :items="allServices.map(service => service.service)" />
                        <div class="mt-2" v-show="services.length > 0">
                          <span
                            :class="{
                              badge: true,
                              'rounded-pill': true,
                              'bg-dark': true,
                              'ms-2': index > 0
                            }"
                            style="font-size:inherit"
                            v-for="(service, index) in services"
                            :key="index"
                          >
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

             <SelectedServices @remove-service="removeService" :services="services" :showDiscounts="false" />

        <SubmitPurchase :filteredList="filteredList"  :filteredAccessoriesList="filteredAccessoriesList" :filteredServicesList="filteredServicesList" @submit="submitFilteredList" />
                <a
                        class="delete-btn"
                        data-bs-toggle="offcanvas"
                        href="#loadingPopup"
                        role="button"
                        aria-controls="loadingPopup"
                        ref="myBtn"
                      >
                        <img

                        />
                      </a>
    <div class="flex-grow-1"></div>
    <MainFooter />
  </div>

  <div
    class="delete-popup offcanvas offcanvas-end border-0"
    tabindex="-1"
    id="deletePopup"
  >
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your Item is deleted from the list.
        </span>
      </div>
    </div>
  </div>

    <div
      class="created-popup offcanvas offcanvas-end border-0"
      tabindex="-1"
      id="loadingPopup"
    >
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

export default defineComponent({
  name: "CreateSalesPage",
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
      form: {
        date: "",
        customer: "",
        branch: "",
        project: "",
      },
      products: [],
      accessories: [],
      services: [],
      detailedAccessories: [],
      detailedProducts: [],
      detailedServices: [],
      allProducts:[],
      allAccessories:[],
      allServices:[],
      customers: [],
      projects:[],
       filteredList: [],
       filteredAccessoriesList: [],
       filteredServicesList: [],
      discount: 0,
      total: 0,
            status: "Packed",
            notes: "",
            loading: false,
    }
  },
  methods: {
    onUpdateProducts(product: string) {
      this.products.push(product as never);
      EventBus.emit('onUpdateProducts', this.products);
    },
    removeProduct(index: number) {
      this.products.splice(index, 1);
      EventBus.emit('onUpdateProducts', this.products);
    },
    onUpdateServices(service: string) {
          this.services.push(service as never);
          EventBus.emit('onUpdateServices', this.services);
        },
        removeService(index: number) {
          this.services.splice(index, 1);
          EventBus.emit('onUpdateServices', this.services);
        },
    onUpdateAccessories(accessory: string) {
          this.accessories.push(accessory as never);
          EventBus.emit('onUpdateAccessories', this.accessories);
        },
        removeAccessory(index: number) {
          this.accessories.splice(index, 1);
          EventBus.emit('onUpdateAccessories', this.accessories);
        },
    async fetchCustomers() {
          try {
            const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/users/all");

            this.customers = response.data.map((customer: any) => ({
                              code: customer.id,
                              name: `${customer.first_name} ${customer.last_name}`, // Change 'name' to 'product'
                              email: customer.email,
                              phone_number: customer.phone_number, // Default quantity
                            }));
          } catch (error) {
            console.error("Error fetching customers:", error);
          }
        },
    async fetchProjects() {
              try {
                const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/projects/all");

                this.projects = response.data.map((project: any) => ({
                                  code: project.id,
                                  name: project.name,
                                  status: project.status,

                                }));
              } catch (error) {
                console.error("Error fetching projects:", error);
              }
            },


    async submitFilteredList(submitData: any) {

      const requestData = {
        userId: this.form.customer ,
        projectId: this.form.project,
        userPersona: 'customer',
        quotationItems: this.detailedProducts,
        accessories: this.detailedAccessories,
        services: this.detailedServices,
        discount: submitData.discount,
         status: submitData.status,
         notes: submitData.notes,
        total: submitData.total,
      };
      try {
        const response = await axios.post("https://freezy-small-dew-912.fly.dev/freezy/quotations/save", requestData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response:", response.data);
      } catch (error) {
        console.error("Error submitting the list:", error);
      } finally {


          const loadingPopupElement = document.getElementById('loadingPopup');
                       if (loadingPopupElement) {
                         (loadingPopupElement as any).press = true;
                         const elem = this.$refs.myBtn as HTMLAnchorElement | undefined;
                         if (elem) {
                           elem.click();
                         }
                         setTimeout(() => {
                           this.$router.push({ name: 'SalesListPage' });
                         }, 3000);
                       }


             }
    },

  },
  mounted() {
     EventBus.on('onAllProducts', (products: any) => {
          this.allProducts = products; // Update allProducts with the emitted value
        });
        EventBus.on('onFilteredProducts', (products: any) => {
          this.detailedProducts = products; // Capture detailed product data
          this.filteredList =products;
        });
        EventBus.on('onAllAccessories', (accessories: any) => {
                  this.allAccessories = accessories; // Update allProducts with the emitted value
                });
                EventBus.on('onFilteredAccessories', (accessories: any) => {
                  this.detailedAccessories = accessories; // Capture detailed product data
                  this.filteredAccessoriesList =accessories;
                });
         EventBus.on('onAllServices', (services: any) => {
                          this.allServices = services; // Update allProducts with the emitted value
                        });
                        EventBus.on('onFilteredServices', (services: any) => {
                          this.detailedServices = services; // Capture detailed product data
                          this.filteredServicesList =services;
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

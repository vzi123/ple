<template>
  <form action="#" class="pb-60" @submit.prevent="submitFilteredList">
    <div class="row">
      <div class="col-xxl-9 col-xl-8 col-lg-8 pe-xxl-6 mb-md-25">
        <div class="row gx-xxl-6">
          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Product Name</label>
              <input
                type="text"  v-model="form.name"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Enter Product Name"
                required
              />
              <span class="text-red fs-12 d-none">This field is required!</span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Code Product</label>
              <input
                type="text" v-model="form.hsnNo"
                class="w-100 d-block shadow-none fs-14 bg-white rounded-1 text-title"
                placeholder="Product Code"
                required
              />
              <span class="text-parageaph d-block w-100 fs-12 mt-1 d-none">
                Enter Product Code.
              </span>
            </div>
          </div>

          <div class="col-lg-6">
            <div class="form-group mb-25">
              <label class="d-block fs-14 text-black mb-2">Category</label>
              <v-select
                                   v-model="form.categoryId"
                                   :options="categories"
                                   :reduce="category => category.categoryId"
                                   label="name"
                                   class="bg-white border-0 rounded-1 fs-14 text-optional"
                                   placeholder="Select Category"
                            />
            </div>
          </div>



          <div class="col-12">
            <div class="col-lg-6" v-if="isCategoryAC">
                        <div class="form-group mb-25">
                          <label class="d-block fs-14 text-black mb-2">Brand</label>
                          <v-select
                                               v-model="form.brandId"
                                               :options="brands"
                                               :reduce="brand => brand.brandId"
                                               label="name"
                                               class="bg-white border-0 rounded-1 fs-14 text-optional"
                                               placeholder="Select Brand"
                                        />
                        </div>
                      </div>
            <button
              class="btn style-one transition border-0 fw-medium text-white rounded-1 fs-md-15 fs-lg-16"
              type="submit" id="submitButton"

            >
              Submit Products
            </button>
          </div>
        </div>
        <a
                                class="delete-btn"
                                data-bs-toggle="offcanvas"
                                href="#loadingPopup"
                                role="button"
                                aria-controls="loadingPopup"
                                ref="myBtn"
                              >
                                <img
                                  src="../../../assets/img/icons/close.svg"
                                  alt="Image"
                                />
                              </a>
      </div>
       <div
            class="created-popup offcanvas offcanvas-end border-0"
            tabindex="-1"
            id="loadingPopup"
          >
            <div class="offcanvas-body p-0">
              <div class="delete-success">
                <img src="../../../assets/img/icons/tick-circle.svg" alt="Image" />
                <span class="text-white fw-medium">
                  Your product is saved.
                </span>
              </div>
            </div>
          </div>


    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";
import AddImages from "./AddImages.vue";

import axios from "axios";

import EventBus from '@/events/event-bus';
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";


interface Category {
  categoryId: number;
  name: string;
  description: string;
}

interface Brand {
  brandId: number;
  name: string;
  description: string;
}

export default defineComponent({
  name: "CreateProducts",
  components: {
    AddImages,
    vSelect,
  },
  data() {
      return {
        form: {
          name: "",
          hsnNo: "",
            categoryId: null as number | null,
                   brandId: null as number | null,
        },

         categories: [] as Category[],
              brands: [] as Brand[],
              loading: false,
      }
    },
    computed: {
        isCategoryAC(): boolean {
          const selectedCategory = this.categories.find(category => category.categoryId === this.form.categoryId);
          return selectedCategory ? selectedCategory.name === "ACs" : false;
        }
      },
    methods: {
        async fetchCategories() {
              try {
                const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/v1/categories/all");

                this.categories = response.data.map((category: any) => ({
                                  categoryId: category.id,
                                  name: category.name, // Change 'name' to 'product'
                                  description: category.description,

                                }));
              } catch (error) {
                console.error("Error fetching customers:", error);
              }
            },

        async fetchBrands() {
                      try {
                        const response = await axios.get("https://freezy-small-dew-912.fly.dev/freezy/v1/brands/all");

                        this.brands = response.data.map((brand: any) => ({
                                          brandId: brand.id,
                                          name: brand.name, // Change 'name' to 'product'
                                          description: brand.description,

                                        }));
                      } catch (error) {
                        console.error("Error fetching customers:", error);
                      }
                    },


        async submitFilteredList(submitData: any) {

         const submitButtonElement = document.getElementById('submitButton');
                               if (submitButtonElement) {
                                 (submitButtonElement as any).disabled = true;
                                 }
          const requestData = {
            name: this.form.name ,
            hsnNo: this.form.hsnNo,
            categoryId: this.form.categoryId,
            brandId: this.form.brandId,
           description: this.form.name ,
          };
          try {
            const response = await axios.post("https://freezy-small-dew-912.fly.dev/freezy/v1/products/save", requestData, {
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
                            console.log("I am getting executed:");
                           this.$router.push({ name: 'ProductsListPage' });
                         }, 3000);
                       }

                 }
        },

      },
      mounted() {


        this.fetchCategories();
        this.fetchBrands();
      }
});
</script>
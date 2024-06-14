<template>
  <div class="card border-0 shadow-none rounded-1 mb-25">
    <div class="card-body p-xl-40">
      <div class="table-responsive">
        <table class="table text-nowrap align-middle mb-0">
          <thead>
          <tr>
            <!-- <th scope="col" class="text-title fw-normal fs-14 pt-0 ps-0">
              <div class="form-check checkbox">
                <input class="form-check-input" type="checkbox" id="test_1" />
                <label class="form-check-label" for="test_1"> ID </label>
              </div>
            </th> -->
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Category ID

            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Category Name
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0">
              Description
            </th>
            <th scope="col" class="text-title fw-normal fs-14 pt-0 pe-0">
              Actions
            </th>

          </tr>
          </thead>
          <tbody>
          <tr v-for="category in allProducts" :key="category.id">
            <!-- <td class="shadow-none fw-normal text-black title ps-0">
              <div class="d-flex align-items-center product-item">
                <div class="form-check checkbox style-three me-25">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="test_2"
                  />
                  <label class="form-check-label" for="test_2"> </label>
                </div>
                <img :src="product.image" alt="Image" />
              </div>
            </td> -->
            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ category.id }}
            </td>

            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ category.name }}
            </td>

            <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
              {{ category.description }}
            </td>

            <td class="shadow-none lh-1 text-end pe-0">
              <div class="button-group d-flex flex-wrap align-items-center">
                <router-link to="/product-details" class="" title="View">
                  <img src="../../../assets/img/icons/eye.svg" alt="Image" />
                </router-link>
                <router-link to="/edit-product" class="" title="Edit">
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
  <!--  <div class="row pb-45 align-items-center">-->
  <!--    <div class="col-sm-6">-->
  <!--      <div-->
  <!--        class="d-flex flex-wrap align-items-center justify-content-center justify-content-sm-start page-unit"-->
  <!--      >-->
  <!--        <span class="fs-13">Showing product per page</span>-->
  <!--        <select class="text-title border-0 fs-14 bg-transparent">-->
  <!--          <option value="0">10</option>-->
  <!--          <option value="1">20</option>-->
  <!--          <option value="2">30</option>-->
  <!--        </select>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="col-sm-6 text-sm-end text-center">-->
  <!--      <ul class="page-nav list-style">-->
  <!--        <li>-->
  <!--          <a href="#">-->
  <!--            <img-->
  <!--              src="../../../assets/img/icons/left-arrow-purple.svg"-->
  <!--              alt="Image"-->
  <!--            />-->
  <!--          </a>-->
  <!--        </li>-->
  <!--        <li><a href="#" class="active">1</a></li>-->
  <!--        <li><a href="#">2</a></li>-->
  <!--        <li><a href="#">3</a></li>-->
  <!--        <li>-->
  <!--          <a href="#">-->
  <!--            <img-->
  <!--              src="../../../assets/img/icons/right-arrow-purple.svg"-->
  <!--              alt="Image"-->
  <!--            />-->
  <!--          </a>-->
  <!--        </li>-->
  <!--      </ul>-->
  <!--    </div>-->
  <!--  </div>-->
  <div
      class="delete-popup offcanvas offcanvas-end border-0"
      tabindex="-1"
      id="deletePopup"
  >
    <div class="offcanvas-body p-0">
      <div class="delete-success">
        <img src="../../../assets/img/icons/tick-circle.svg" alt="Image" />
        <span class="text-white fw-medium">
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import axios from "axios";
import { formatDate, BASE_URL } from "@/utils/utils";
import EventBus from '../../../events/event-bus';

export default defineComponent({
  name: "CategoriesList",
  data() {
    return {
      currncySymbol:"₹"
    };
  },
  setup() {
    const allProducts = ref([]); // Use ref to make it reactive
    const loading = ref(false);
    const searchTerm = ref('');

    // Function to fetch products using Axios
    const fetchProducts = async () => {
      try {
        loading.value = true; // Set loading to true before request
        const response = await axios.get(`${BASE_URL}/freezy/categories/all`);
        allProducts.value = response.data; // Assuming your API returns an array of products

      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false; // Set loading to false after request
      }
    };

    // const filteredList = computed({
    //   // getter
    //   get() {
    //     return allProducts.value.filter((productItem: any) => {
    //       const userName = productItem?.user.first_name + " " + productItem?.user.last_name;
    //       return userName.toLowerCase().includes(searchTerm.value.toLowerCase());
    //     });
    //   },
    //   // setter
    //   set(newValue: any) {
    //     // Note: we are using destructuring assignment syntax here.
    //     allProducts.value = newValue;
    //   }
    // })

    // Call fetchProducts when the component is mounted
    onMounted(() => {
      fetchProducts();
      EventBus.on('searchTermUpdated', (updatedSearchTerm: any) => {
        searchTerm.value = updatedSearchTerm.trim();
      });
    });

    // Return reactive variables and function
    return {
      allProducts,
      loading
      // filteredList
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
  },
});
</script>
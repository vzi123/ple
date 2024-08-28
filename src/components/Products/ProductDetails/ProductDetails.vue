<template>
  <div class="modal fade" id="productdetails" tabindex="-1" aria-labelledby="productdetailsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-lg modal-l modal-dialog-centered modal-dialog-scrollable">
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

          <div class="row gx-xxl-6">
            <!-- <div class="col-xl-4 col-lg-5 pe-xxl-1">
              <div class="single-product-img">
                <img src="../../../assets/img/products/single-product.webp" alt="Product" />
              </div>
            </div> -->
            <div class="col-xl-8 col-lg-7 w-100">
              <table v-if="productDetail.type === 'PRODUCT'" class="table table-bordered table-hover text-nowrap align-middle mb-4">
                <thead>
                  <tr class="bg_mild">
                    <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">Type</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.type }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Product Code</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.id }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Product name</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.name }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Category</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.category.name }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Brand</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.brand.name }}</td>
                  </tr>
                  <!-- <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Price</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.cost || productDetail.product.cost }}</td>
                  </tr> -->
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Cost</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Stock in Hand(UOM)</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{productDetail.inventory || 0 }} ({{productDetail.uom }})</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Description</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.description }}</td>
                  </tr>
                  <!-- <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Unit</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Tax</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Stock Alert</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      <span class="badge badge-outline-green fs-14 fw-semibold">{{ productDetail.product.id }}</span>
                    </td>
                  </tr> -->
                </tbody>
              </table>
              <table v-else-if="ACCESSORY" class="table table-bordered table-hover text-nowrap align-middle mb-4">
                <thead>
                  <tr class="bg_mild">
                    <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">Type</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.type }}</td>
                  </tr>
                </thead>
                <tbody>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Product Code</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.id }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Product name</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.name }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Category</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.category.name }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Brand</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.brand.name }}</td>
                  </tr>
                  <!-- <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Price</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.cost || /td>
                  </tr> -->
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Cost</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Stock in Hand(UOM)</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{productDetail.inventory || 0 }} ({{productDetail.uom }})</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Description</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.accessory.description }}</td>
                  </tr>
                  <!-- <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Unit</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Tax</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.cost }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Stock Alert</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">
                      <span class="badge badge-outline-green fs-14 fw-semibold">{{ productDetail.product.id }}</span>
                    </td>
                  </tr> -->
                </tbody>
              </table>
              <!-- <table class="table table-bordered table-hover text-nowrap align-middle mb-0">
                <thead>
                  <tr class="bg_mild">
                    <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">STOCK</th>
                    <th scope="col" class="text-title fw-normal fs-14 lh-1 bg_mild">QUANTITY</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Warehouse 01</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.id }}</td>
                  </tr>
                  <tr class="br-s-1">
                    <th scope="row" class="text-title fw-normal fs-14 lh-1 bg_mild">Warehouse 02</th>
                    <td class="shadow-none lh-1 fs-14 fw-normal text-paragraph">{{ productDetail.product.id }}</td>
                  </tr>
                </tbody>
              </table> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import stateStore from '@/utils/store';
export default {
  name: "ProductDetails",
  computed: {
    productDetail() {
      return stateStore.productDetails;
    },
  },
};
</script>

<template>
  <MainHeader />
  <MainSidebar />
  <div
    class="main-content bg_gray d-flex flex-column transition overflow-hidden"
  >
    <BreadcrumbMenu pageTitle="Print Barcode" />
    <ChooseForm />
    <SelectedProducts />
    <PaperSize />
    <div class="row gx-0 mb-50">
      <div class="col-md-6 offset-md-6">
        <div
          class="filter-right d-flex align-items-center justify-content-md-end flex-wrap"
        >
          <button type="button" class="btn style-four">
            Reset
            <img src="../../assets/img/icons/rotate-left.svg" alt="Image" />
          </button>
          <button
            class="btn style-one"
            id="create-barcode"
            @click="toggleBarcode.onChange"
          >
            Create Barcode<img
              src="../../assets/img/icons/add-circle.svg"
              alt="Image"
            />
          </button>
          <a
            class="btn style-five upload-btn px-xxl-6"
            onclick="window.print();"
          >
            Print<img src="../../assets/img/icons/download.svg" alt="Image" />
          </a>
        </div>
      </div>
    </div>
    <BarcodeWrapper />

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
          Your product is deleted from the list.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";

import MainHeader from "../../components/Layouts/MainHeader.vue";
import MainSidebar from "../../components/Layouts/MainSidebar.vue";
import BreadcrumbMenu from "../../components/Common/BreadcrumbMenu.vue";
import ChooseForm from "../../components/Products/PrintBarcode/ChooseForm.vue";
import SelectedProducts from "../../components/Products/PrintBarcode/SelectedProducts.vue";
import PaperSize from "../../components/Products/PrintBarcode/PaperSize.vue";
import BarcodeWrapper from "../../components/Products/PrintBarcode/BarcodeWrapper.vue";
import MainFooter from "../../components/Layouts/MainFooter.vue";

export default defineComponent({
  name: "PrintBarcodePage",
  components: {
    MainHeader,
    MainSidebar,
    BreadcrumbMenu,
    ChooseForm,
    SelectedProducts,
    PaperSize,
    BarcodeWrapper,
    MainFooter,
  },
  setup() {
    const toggleBarcode = stateStore;

    return {
      toggleBarcode,
    };
  },
});
</script>

<style lang="scss" scoped>
.filter-right {
  a {
    margin-right: 10px;
    &:last-child {
      margin-right: 0;
    }
  }
  div,
  button {
    margin-right: 10px;
  }
}

@media only screen and (max-width: 767px) {
  .filter-right {
    a,
    div,
    button {
      margin-bottom: 10px;
    }
  }
}

@media only screen and (min-width: 768px) and (max-width: 991px) {
  .filter-right {
    width: calc(100% + 20px);
    margin-left: -20px;
  }
}

@media only screen and (min-width: 1400px) {
  .filter-right {
    a,
    div,
    button {
      margin-right: 15px;
    }
  }
}
</style>
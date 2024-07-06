<template>
  <div class="row gx-0 mb-30">
    <div class="col-md-6">
      <div class="filter-left d-flex align-items-center flex-wrap">
        <button
          type="button"
          class="btn style-two"

        >
          Filter <img src="../../../assets/img/icons/filter.svg" alt="Image" />
        </button>
        <form action="#" class="search-area position-relative w-sm-100">
          <input
            type="text"
            placeholder="Search On This Table"
            v-model="searchTerm"
            @input="updateSearchTerm"
            class="w-100 h-55 bg_ash border-0 rounded-1 fs-14 text-black bg-white"
          />
          <button
            type="submit"
            class="bg-transparent border-0 position-absolute top-0 end-0 h-100 pt-0 py-0 px-2"
          >
            <img src="../../../assets/img/icons/search.svg" alt="Image" />
          </button>
        </form>
      </div>
    </div>
    <div class="col-md-6">
      <div
        class="filter-right d-flex align-items-center justify-content-md-end flex-wrap"
      >
         <div class="col-md-6">
                <div
                  class="filter-right d-flex align-items-center justify-content-md-end flex-wrap"
                >
                  <a
                    href="javascript:void(0)"
                    class="btn style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#createModal"
                  >
                    IN
                    <img src="../../../assets/img/icons/add-circle.svg" alt="Image" />
                  </a>
                </div>
              </div>
         <div class="col-md-6">
                <div
                  class="filter-right d-flex align-items-center justify-content-md-end flex-wrap"
                >
                  <a
                    href="javascript:void(0)"
                    class="btn style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#createModal"
                  >
                    OUT
                    <img src="../../../assets/img/icons/add-circle.svg" alt="Image" />
                  </a>
                </div>
              </div>
        <div class="btn style-five upload-btn">
          Import
          <img src="../../../assets/img/icons/download.svg" alt="Image" />
          <input type="file" name="myfile" />
        </div>
        <!-- <router-link :to="btnLink" class="btn style-one">
          Create {{ btnText }}
          <img src="../../../assets/img/icons/add-circle.svg" alt="Image" />
        </router-link> -->
      </div>
    </div>
  </div>

  <CreateInandOut />
</template>

<script lang="ts">
import { ref } from "vue";
import FilterModal from "./FilterModal.vue";
import CreateInandOut from "./CreateInandOut.vue";
import EventBus from '../../../events/event-bus';

export default {
  components: {
    FilterModal,
    CreateInandOut
  },

  setup() {
    const searchTerm = ref('');

    function updateSearchTerm() {
      EventBus.emit('searchTermUpdated', searchTerm.value); // Emit the updated searchTerm using the event bus
    }

    return {
      searchTerm,
      updateSearchTerm
    };
  },
}
</script>

<style lang="scss" scoped>
.filter-left {
  button {
    margin-right: 10px;
  }
  .search-area {
    input {
      padding-left: 20px;
      &::placeholder {
        opacity: 0.8;
      }
    }
  }
}
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
  .filter-left {
    .btn {
      margin-bottom: 15px;
    }
  }
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

@media only screen and (max-width: 991px) {
  .filter-left {
    margin-bottom: 20px;
  }
}

@media only screen and (min-width: 992px) {
  .filter-left {
    .search-area {
      width: 320px;
    }
  }
}

@media only screen and (min-width: 1400px) {
  .filter-left {
    button {
      margin-right: 15px;
    }
    .search-area {
      width: 320px;
    }
  }
  .filter-right {
    a,
    div,
    button {
      margin-right: 15px;
    }
  }
}
</style>
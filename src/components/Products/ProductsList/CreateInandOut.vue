<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="createModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-rl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="createModalLabel">
            IN & OUT INVENTORY
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
        <div class="modal-body">
          <form action="#">
            <div class="form-group mb-15">
              <label class="d-block fs-14 text-black mb-10">Name</label>
              <input
                type="text"
                class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                placeholder="Enter Pr Name"
              />
            </div>
            <div class="form-group mb-15">
              <label class="d-block fs-14 text-black mb-10">Short Name</label>
              <input
                type="text"
                class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                placeholder="Enter Unit Name"
              />
            </div>
            <div class="form-group mb-15">
              <label class="d-block fs-14 text-black mb-10">Base Unit</label>
              <input
                type="text"
                class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                placeholder="Enter Unit Name"
              />
            </div>
            <button type="button" class="btn style-five w-100 d-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateInandOut",
};
</script>
<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="createModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-xl modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-title" id="createModalLabel">
            Create customer
          </h5>
          <button
            type="button"
            class="btn-close p-0"
            data-bs-dismiss="modal"
            aria-label="Close"
            id="closeBtn"
            ref="myBtn"
          >
            <img
              src="../../../assets/img/icons/close-circle-2.svg"
              alt="Image"
            />
          </button>
        </div>
        <div class="modal-body">
          <form action="#" @submit.prevent="submitFilteredList">
            <div class="row">
              <div class="col-lg-6">
                <div class="form-group mb-15">
                  <label class="d-block fs-14 text-black mb-10"
                    >customer Name</label
                  >
                  <input
                    type="text" v-model="form.name"
                    class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                    placeholder="Enter customer Name"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-15">
                  <label class="d-block fs-14 text-black mb-10">Email</label>
                  <input
                    type="email" v-model="form.email"
                    class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                    placeholder="Enter Email"
                  />
                </div>
              </div>
              <div class="col-lg-6">
                <div class="form-group mb-15">
                  <label class="d-block fs-14 text-black mb-10"
                    >Phone Number</label
                  >
                  <input
                    type="number" v-model="form.phoneNumber"
                    class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                    placeholder="Enter Phone Number"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                <div class="form-group mb-15">
                  <label class="d-block fs-14 text-black mb-10">City</label>
                  <input
                    type="text" v-model="form.city"
                    class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                    placeholder="Enter City"
                  />
                </div>
              </div>

              <div class="col-lg-6">
                              <div class="form-group mb-15">
                                <label class="d-block fs-14 text-black mb-10"
                                  >GST Number</label
                                >
                                <input
                                  type="text" v-model="form.gstId"
                                  class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                                  placeholder="Enter GST Number"
                                />
                              </div>
                            </div>

                            <div class="col-lg-6">
                              <div class="form-group mb-15">
                                <label class="d-block fs-14 text-black mb-10">Pin Code</label>
                                <input
                                  type="number" v-model="form.pincode"
                                  class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                                  placeholder="Enter Pincode"
                                />
                              </div>
                            </div>



              <div class="col-12">
                <div class="form-group mb-15">
                  <label class="d-block fs-14 text-black mb-10">Address</label>
                  <textarea v-model="form.address"
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    class="w-100 d-block shadow-none fs-14 bg_ash rounded-1 text-black border-0 placeholder-1"
                    placeholder="Address"
                  ></textarea>
                </div>
              </div>
              <div class="col-12">
                <button  class="btn style-five w-100 d-block" id="submitButton" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from "vue";


import axios from "axios";

import EventBus from '@/events/event-bus';
export default defineComponent({
  name: "CreateCustomerForm",
   components: {


    },
    data() {
        return {
          form: {
                   name:"",
                   email: "",
                   phoneNumber: "",
                   address:"",
                   city:"",
                    gstId:"",
                                      pincode:"",
          },



                loading: false,
        }
      },
      methods: {

             async submitFilteredList(submitData: any) {

                 const submitButtonElement = document.getElementById('submitButton');
                                       if (submitButtonElement) {
                                         (submitButtonElement as any).disabled = true;
                                         }
                  const requestData = {
                    name:this.form.name,
                                       email: this.form.email,
                                       phoneNumber: this.form.phoneNumber,
                                       address:this.form.address,
                                       city:this.form.city,
                                       pincode:this.form.pincode,
                                       gstId:this.form.gstId
                  };
                  try {
                    const response = await axios.post("https://freezy-small-dew-912.fly.dev/freezy/v1/users/customer", requestData, {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    });
                    console.log("Response:", response.data);
                  } catch (error) {
                    console.error("Error submitting the list:", error);
                  } finally {
                    EventBus.emit('customerCreated');
                           setTimeout(() => {

                             const loadingPopupElement = document.getElementById('closeBtn');
                                                  if (loadingPopupElement) {
                                                    (loadingPopupElement as any).clicked = true;
                                                    }
                                                     const elem = this.$refs.myBtn as HTMLAnchorElement | undefined;
                                                                             if (elem) {
                                                                               elem.click();
                                                                             }


                                 }, 3000);
                               }


                },

        },
        mounted() {

        }
});
</script>
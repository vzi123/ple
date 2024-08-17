import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
  consignmentDetails: any;
  quotationDetails: any;
  purchaseDetails: any;
  salesOrderDetails: any;
  productDetails: any;
}

const stateStore: StateStore = reactive({
  open: false,
  onChange() {
    stateStore.open = !stateStore.open
  },
  consignmentDetails: {
    "id": "",
    "inOut": "",
    "comments": "",
    "itemCount": 0,
    "createdAt": "",
    "totalAmount": 0,
    "createdFor": {
      "id": "",
      "first_name": "",
      "last_name": "",
      "email": "",
      "phone_number": "",
      "role": "",
      "address": "",
      "city": "",
      "gstId": "",
      "pincode": ""
    },
    "products": [
      {
        "id": "",
        "name": "",
        "description": "",
        "cost": 0,
        "hsnNo": "",
        "category": {
          "id": "",
          "name": "",
          "description": ""
        },
        "brand": {
          "id": "",
          "name": "",
          "description": ""
        }
      }
    ],
    "accessories": [
      {
        "id": "",
        "name": "",
        "description": "",
        "cost": 0,
        "category": {
          "id": "",
          "name": "",
          "description": ""
        },
        "brand": null
      }
    ],
    "services": [
      {
        "id": "",
        "name": "",
        "description": "",
        "cost": 0,
        "category": {
          "id": "",
          "name": "",
          "description": ""
        },
        "serviceTier": {
          "id": "",
          "name": "",
          "description": "",
          "type": ""
        }
      }
    ]
  },
  quotationDetails: {},
  salesOrderDetails: {},
  purchaseDetails:{},
  productDetails:{},
})

export default stateStore
import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
  consignmentDetails: any;
  quotationDetails: any;
  purchaseDetails: any;
  salesOrderDetails: any;
  productDetails: any;
  resetConsignmentDetails: any;
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
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ],
    "accessories": [
      {
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ],
    "services": [
      {
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ]
  },
  quotationDetails: {},
  salesOrderDetails: {},
  purchaseDetails:{},
  productDetails:{},

  // For reset

  resetConsignmentDetails: {
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
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ],
    "accessories": [
      {
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ],
    "services": [
      {
        "productId": "",
        "product": "",
        "description": "",
        "quantity": 0,
        "unitPrice": 0,
        "discountAmount": "",
        "subTotal": "",
        "effectivePrice": "",
        "gstValue": {
          "gstRate": "",
          "gstValue": ""
        },
        "iduSerialNo": "",
        "oduSerialNo": "",
        "type": "",
        "accessoryId": "",
        "accessory": "",
        "serviceId": "",
        "service": "",
        "gstPercent": ""
      }
    ]
  },
})

export default stateStore
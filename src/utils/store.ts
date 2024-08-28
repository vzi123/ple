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
  inWards:any;
}

const stateStore: StateStore = reactive({
  open: false,
  onChange() {
    stateStore.open = !stateStore.open
  },
  
  inWards:{},

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

  productDetails:{
    "id": "",
    "inventory": 0,
    "product": {
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
    },
    "uom": "",
    "accessory": {},
    "type": ""
  },

  quotationDetails: {},
  salesOrderDetails: {},
  purchaseDetails:{},



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
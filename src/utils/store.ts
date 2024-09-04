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
  inWards: any;
  customerList: any;
  resetCustomerList: any;
  supplierList: any;
  resetSupplierList: any;
}

const stateStore: StateStore = reactive({
  open: false,
  onChange() {
    stateStore.open = !stateStore.open
  },

  inWards: {},

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
    "products": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }],
    "accessories": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }],
    "services": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }]
  },

 

  productDetails: {
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
  purchaseDetails: {},

  customerList: {
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

  supplierList: {
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


  // For reset

  resetCustomerList: {
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

  resetSupplierList: {
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
    "products": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }],
    "accessories": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }],
    "services": [{
      "productId": "",
      "product": "",
      "description": "",
      "quantity": 0,
      "unitPrice": 0,
      "discountAmount": 0,
      "subTotal": 0,
      "effectivePrice": 0,
      "gstValue": {
        "gstRate": "",
        "gstValue": 0.0
      },
      "iduSerialNo": "",
      "oduSerialNo": "",
      "type": "",
      "accessoryId": "",
      "accessory": "",
      "serviceId": "",
      "service": "",
      "gstPercent": 0
    }
    ]
  },
})

export default stateStore
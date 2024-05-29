import { reactive } from "vue";

interface StateStore {
  open: boolean;
  onChange: () => void;
  purchaseDetails: any;
}

const stateStore: StateStore = reactive({
  open: false,
  onChange ()  {
    stateStore.open = !stateStore.open
  },
  purchaseDetails: {
    "id": "",
    "user": {},
    "userPersona": "",
    "budget": 0,
    "status": "",
    "project": {
      "customer": {}
    },
    "createdBy": {},
    "createdAt": "2024-04-27 19:03:36",
    "purchaseOrderItems": [],
    "salesOrders": []
  },
})

export default stateStore
// event-bus.ts

import mitt from "mitt";
const emitter = mitt();

export default {
  on: emitter.on,
  emit: emitter.emit
};

<template>
  <div class="v-counter style-two">
    <button class="plusBtn" @click="decrement"></button>
    <input type="text" size="25" :value="quantity" class="count" @input="updateQuantity($event.target.value)" />
    <button class="minusBtn" @click="increment"></button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";

export default defineComponent({
  name: "QuantityCounter",
  props: {
    initialQuantity: {
      type: Number,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const quantity = ref(props.initialQuantity);

    const increment = () => {
      quantity.value++;
      emit('quantity-change', { quantity: quantity.value, index: props.index });
    };

    const decrement = () => {
      if (quantity.value > 1) {
        quantity.value--;
        emit('quantity-change', { quantity: quantity.value, index: props.index });
      }
    };

    const updateQuantity = (newQuantity: number) => {
      quantity.value = newQuantity;
      emit('quantity-change', { quantity: quantity.value, index: props.index });
    };

    watch(() => props.initialQuantity, (newVal) => {
      quantity.value = newVal;
    });

    return {
      quantity,
      increment,
      decrement,
      updateQuantity,
    };
  },
});
</script>

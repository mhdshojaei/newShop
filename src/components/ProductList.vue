<script setup>
import Product from './Product.vue'
const { Products } = defineProps(['Products'])
</script>

<template>
  <div class="grid max-w-[1160px] m-auto grid-cols-4 gap-4 mt-10">
    <product
      v-for="Product in Products"
      :key="Product.id"
      :Product="Product"
      class="bg-white rounded-xl items-start justify-start flex flex-col"
    >
    </product>
  </div>

  <span v-show="!Products.length" class="text-xl">there is nothing here</span>
</template>

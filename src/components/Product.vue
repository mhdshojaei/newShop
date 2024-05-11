<script setup>
const { Product } = defineProps(['Product'])
import { inject, ref } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { UseCart } from '@/store/CartLength'

const deleteItem = inject('deleteItem')
const AddToCart = inject('addToCart')

let CartLength = UseCart()
const newItem = ref(CartLength.cartItems.find((item) => item.id == Product.id) || [])

const count = ref(Product.count || newItem.value.count || 1)
const UpadateBtn = () => {
  newItem.value = CartLength.cartItems?.find((item) => item.id == Product.id)
}
const increaseCount = () => {
  count.value = Number(count.value) + 1
  const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
  const ProductIndex = cartItems.value.findIndex((item) => item.id == Product.id)

  CartLength.cartItems[ProductIndex].count = count.value

  localStorage.setItem('cartItems', JSON.stringify(CartLength.cartItems))
}
const decreaseCount = () => {
  if (count.value > 1) {
    count.value = Number(count.value) - 1
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
    const ProductIndex = cartItems.value.findIndex((item) => item.id == Product.id)

    CartLength.cartItems[ProductIndex].count = count.value

    localStorage.setItem('cartItems', JSON.stringify(CartLength.cartItems))
  }
}

// onMounted(()=>{
//   count.value = Product.count ? Product.count : 1
// })
</script>
<template>
  <div class="bg-white rounded-xl items-center flex flex-col">
    <RouterLink class="text-center" :to="'/product/' + Product.id">
      <img :src="Product.img_url" alt="" class="rounded-t-xl h-60 object-cover" height="15rem" />
      <h2 class="text-black font-bold text-xl my-4">{{ Product.title }}</h2>
      <p class="text-black mb-2">{{ Product.desc }}</p>
      <p class="text-black font-bold">{{ Product.rate }}/5 ⭐️</p>

      <i>
        <slot name="img"></slot>
      </i>
    </RouterLink>
    <div v-if="newItem?.count > 0" class="text-black text-xl flex items-center gap-5">
      <button @click="decreaseCount()" class="bg-red-200 w-5 h-5 flex items-center justify-center">
        -
      </button>
      <input class="w-36 border text-center" type="text" readonly :value="count" />
      <button @click="increaseCount" class="bg-red-200 w-5 h-5 flex items-center justify-center">
        +
      </button>
    </div>
    <button
      v-if="!newItem?.count > 0"
      class="bg-green-500 py-3 px-10 my-5 rounded-md"
      @click="AddToCart(Product.id, 1), UpadateBtn()"
    >
      add To cart
    </button>

    <button
      @click="deleteItem(Product.id), UpadateBtn()"
      v-if="Product.count"
      class="py-3 px-10 my-5 rounded-md"
    >
      <TrashIcon class="size-10 text-red-500" />
    </button>

    <slot></slot>
  </div>
</template>

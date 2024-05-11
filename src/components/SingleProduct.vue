<script setup>
import { UseCart } from '@/store/CartLength'
import { UseProducts } from '@/store/Products'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let { Products } = UseProducts()
const route = useRoute()
const Product = ref(Products[route.params.id - 1])
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
let CartLength = UseCart()
const newItem = ref(CartLength.cartItems.find((item) => item.id == Product.value.id) || [])

const count = ref(Product.value.count || newItem.value.count || 1)

const UpadateBtn = () => {
  newItem.value = CartLength.cartItems?.find((item) => item.id == Product.id)
}
const increaseCount = () => {
  count.value = Number(count.value) + 1
  console.log(count.value)
  const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
  const ProductIndex = cartItems.value.findIndex((item) => item.id == Product.value.id)

  CartLength.cartItems[ProductIndex].count = count.value

  localStorage.setItem('cartItems', JSON.stringify(CartLength.cartItems))
}
const decreaseCount = () => {
  if (count.value > 1) {
    count.value = Number(count.value) - 1
    const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
    const ProductIndex = cartItems.value.findIndex((item) => item.id == Product.value.id)

    CartLength.cartItems[ProductIndex].count = count.value

    localStorage.setItem('cartItems', JSON.stringify(CartLength.cartItems))
  }
}

const AddToCart = () => {
  const ProductIndex = cartItems.value.findIndex((item) => item.id == Product.value.id)
  if (ProductIndex == -1) {
    cartItems.value.push({
      title: Product.value.title,
      desc: Product.value.desc,
      id: Product.value.id,
      img_url: Product.value.img_url,
      count: count.value
    })
    CartLength.count++
    CartLength.cartItems = cartItems.value
    newItem.value.count = 1
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}
</script>

<template>
  <div class="grid max-w-[1160px] m-auto gap-4 mt-10">
    <div class="bg-white rounded-xl items-center justify-between flex flex-row">
      <img
        :src="'../' + Product.img_url"
        alt=""
        class="rounded-l-xl h-60 object-cover"
        height="15rem"
      />
      <div class="w-64">
        <h2 class="text-black font-bold text-xl my-4">{{ Product.title }}</h2>
        <p class="text-black mb-2">{{ Product.desc }}</p>
        <p class="text-black font-bold">{{ Product.rate }}/5 ⭐️</p>

        <i>
          <slot name="img"></slot>
        </i>
        <div v-if="newItem?.count > 0" class="text-black text-xl flex items-center gap-5">
          <button
            @click="decreaseCount"
            class="bg-red-200 w-5 h-5 flex items-center justify-center"
          >
            -
          </button>
          <input class="w-36 border text-center" type="text" readonly :value="count" />
          <button
            @click="increaseCount"
            class="bg-red-200 w-5 h-5 flex items-center justify-center"
          >
            +
          </button>
        </div>

        <button
          v-if="!newItem?.count > 0"
          class="bg-green-500 py-3 px-10 my-5 rounded-md"
          @click="AddToCart()"
        >
          add To cart
        </button>
      </div>
    </div>
  </div>
</template>

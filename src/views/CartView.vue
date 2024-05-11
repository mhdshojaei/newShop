<script setup>
import { provide, ref } from 'vue'
import ProductList from '../components/ProductList.vue'
import { TrashIcon } from '@heroicons/vue/24/solid'
import { UseCart } from '../store/CartLength'

let CartLength = UseCart()
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
const deleteItem = (id) => {
  const foundedItem = cartItems.value.findIndex((item) => item.id == id)
  cartItems.value.splice(foundedItem, 1)
  if (cartItems.value.length == 1) {
    localStorage.removeItem('cartItems')
  } else {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
  }
  CartLength.count--
  CartLength.cartItems = cartItems
}
provide('deleteItem', deleteItem)
</script>

<template>
  <ProductList :Products="cartItems" :key="cartItems" />
</template>

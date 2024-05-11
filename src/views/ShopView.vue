<script setup>
import ProductList from '../components/ProductList.vue'
import { UseProducts } from '../store/Products'
import { UseCart } from '../store/CartLength'
import { provide, ref } from 'vue'

let CartLength = UseCart()
let { Products } = UseProducts()

const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [])

const onAddToCart = (id, count) => {
  const newItem = Products.find((item) => item.id == id)
  const ProductIndex = cartItems.value.findIndex((item) => item.id == id)
  if (ProductIndex == -1) {
    cartItems.value.push({
      title: newItem.title,
      desc: newItem.desc,
      id: newItem.id,
      img_url: newItem.img_url,
      count: count
    })
    CartLength.count++
    CartLength.cartItems = cartItems
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
}
const count = ref(0)
provide('addToCart', onAddToCart)
</script>
<template>
  <ProductList :Products="Products" />
</template>

<style></style>

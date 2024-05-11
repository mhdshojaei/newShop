import { defineStore } from 'pinia'
import { reactive } from 'vue'
const cartItems = reactive(JSON.parse(localStorage.getItem('cartItems')) || 0)

export let UseCart = defineStore('counter', {
  state() {
    return {
      count: cartItems?.length || 0,
      cartItems: cartItems || []
    }
  },
  actions: {
    upadateCart() {
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
    }
  }
})

import { UseCart } from '@/store/CartLength'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
const cartItems = reactive(JSON.parse(localStorage.getItem('cartItems')) || [])

export let UseAddToCart = defineStore('AddToCart', {
  actions: {
    AddToCart(cart, count) {
      const ProductIndex = cartItems.value.findIndex((item) => item.id == id)
      if (ProductIndex == -1) {
        cartItems.value.push({
          title: cart.title,
          desc: cart.desc,
          id: cart.id,
          img_url: cart.img_url,
          count: count
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
    }
  }
})

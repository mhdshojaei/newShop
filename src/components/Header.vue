<script setup>
import { ref, watch, reactive, computed } from 'vue'
import { ShoppingCartIcon } from '@heroicons/vue/24/solid'
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { UseCart } from '../store/CartLength'

let CartLength = UseCart()
</script>

<template>
  <div class="flex justify-between max-w-[1160px] m-auto bg-white rounded-2xl mt-4 p-6">
    <RouterLink to="/cart">
      <button>
        <div class="flex">
          <ShoppingCartIcon class="size-10 text-black" />
          <div class="bg-red-500 grid place-items-center rounded-[180%] w-6 h-6 -ml-[10px]">
            <span class="text-white">{{ CartLength.count }}</span>
          </div>
        </div>
      </button>
    </RouterLink>

    <nav class="text-black flex gap-4">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/shop">shop</RouterLink>
    </nav>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />
  </div>
  <RouterView />
</template>
<style>
.router-link-active {
  color: red;
  font-weight: 700;
}
</style>

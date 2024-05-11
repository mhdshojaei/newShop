import { defineStore } from 'pinia'

export let UseProducts = defineStore('Products', {
  state() {
    return {
      Products: [
        {
          title: 'product item 1',
          desc: 'description about product 1',
          rate: 4.9,
          img_url: 'images/img1.jpg',
          id: 1
        },
        {
          title: 'product item 2',
          desc: 'description about product 2',
          rate: 1,
          img_url: 'images/img2.jpg',
          id: 2
        },
        {
          title: 'product item 3',
          desc: 'description about product 3',
          rate: 2,
          img_url: 'images/img3.jpg',
          id: 3
        },
        {
          title: 'product item 4',
          desc: 'description about product 4',
          rate: 3.5,
          img_url: 'images/img3.jpg',
          id: 4
        }
      ]
    }
  }
})

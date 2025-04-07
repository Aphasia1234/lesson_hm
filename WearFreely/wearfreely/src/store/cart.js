import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  actions: {
    addItem(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
  getters: {
    totalItems() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalPrice() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
});
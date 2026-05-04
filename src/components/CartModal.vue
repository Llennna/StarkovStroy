<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Корзина ({{ cartCount }} товаров)</h2>
        <button class="close-btn" @click="$emit('close')">✕</button>
      </div>
      
      <div v-if="cartItems.length === 0" class="empty-cart">
        <p>🛒 Корзина пуста</p>
        <router-link to="/catalog" class="btn btn-primary" @click="$emit('close')">
          Перейти в каталог
        </router-link>
      </div>
      
      <div v-else class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name">
          <div class="item-info">
            <h4>{{ item.product.name }}</h4>
            <div class="item-price">{{ item.product.price.toLocaleString() }} ₽</div>
          </div>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <div class="item-total">
            {{ (item.product.price * item.quantity).toLocaleString() }} ₽
          </div>
          <button class="remove-btn" @click="removeFromCart(item.id)">🗑️</button>
        </div>
      </div>
      
      <div v-if="cartItems.length > 0" class="cart-footer">
        <div class="cart-total">
          <span>Итого:</span>
          <strong>{{ cartTotal.toLocaleString() }} ₽</strong>
        </div>
        <div class="cart-actions">
          <router-link to="/cart" class="btn btn-secondary" @click="$emit('close')">
            В корзину
          </router-link>
          <router-link to="/checkout" class="btn btn-primary" @click="$emit('close')">
            Оформить заказ
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import { computed } from 'vue'

export default {
  name: 'CartModal',
  emits: ['close'],
  setup() {
    const store = useProductStore()
    
    const cartItems = computed(() => {
      return store.cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: store.products.find(p => p.id === item.id)
      })).filter(item => item.product)
    })
    
    const cartCount = computed(() => store.cartCount)
    const cartTotal = computed(() => store.cartTotal)
    
    const updateQuantity = (productId, quantity) => {
      store.updateQuantity(productId, quantity)
    }
    
    const removeFromCart = (productId) => {
      store.removeFromCart(productId)
    }
    
    return {
      cartItems,
      cartCount,
      cartTotal,
      updateQuantity,
      removeFromCart
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: flex-end;
  z-index: 2000;
}

.modal-content {
  background: white;
  width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 18px;
  margin-bottom: 20px;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 5px;
}

.item-info {
  flex: 1;
}

.item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-price {
  color: #ff6600;
  font-weight: bold;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-controls span {
  min-width: 20px;
  text-align: center;
}

.item-total {
  font-weight: bold;
  min-width: 100px;
  text-align: right;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.cart-footer {
  padding: 20px;
  border-top: 1px solid #eee;
}

.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  margin-bottom: 20px;
}

.cart-total strong {
  color: #ff6600;
}

.cart-actions {
  display: flex;
  gap: 10px;
}

.cart-actions .btn {
  flex: 1;
  text-align: center;
}
</style>
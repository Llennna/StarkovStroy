<template>
  <div class="cart-page container">
    <h1>Корзина</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>🛒 Ваша корзина пуста</p>
      <router-link to="/catalog" class="btn btn-primary">
        Перейти в каталог
      </router-link>
    </div>
    
    <div v-else class="cart-content">
      <div class="cart-items">
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <img :src="item.product.image" :alt="item.product.name">
          <div class="item-info">
            <h3>{{ item.product.name }}</h3>
            <div class="item-price">{{ item.product.price.toLocaleString() }} ₽</div>
          </div>
          <div class="quantity-controls">
            <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
            <input 
              type="number" 
              :value="item.quantity" 
              @input="updateQuantity(item.id, parseInt($event.target.value))"
              min="1"
            >
            <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
          </div>
          <div class="item-total">
            {{ (item.product.price * item.quantity).toLocaleString() }} ₽
          </div>
          <button class="remove-btn" @click="removeFromCart(item.id)">🗑️</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <h2>Итого</h2>
        <div class="summary-row">
          <span>Товары ({{ cartCount }}):</span>
          <span>{{ cartTotal.toLocaleString() }} ₽</span>
        </div>
        <div class="summary-row">
          <span>Доставка:</span>
          <span>{{ cartTotal > 5000 ? 'Бесплатно' : '500 ₽' }}</span>
        </div>
        <div class="summary-total">
          <span>К оплате:</span>
          <strong>{{ (cartTotal > 5000 ? cartTotal : cartTotal + 500).toLocaleString() }} ₽</strong>
        </div>
        <router-link to="/checkout" class="btn btn-primary btn-block">
          Оформить заказ
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import { computed } from 'vue'

export default {
  name: 'Cart',
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
      if (quantity && quantity > 0) {
        store.updateQuantity(productId, quantity)
      }
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
.cart-page {
  padding-top: 20px;
}

.cart-page h1 {
  margin-bottom: 30px;
}

.empty-cart {
  text-align: center;
  padding: 80px 20px;
  font-size: 20px;
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}

.cart-items {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item img {
  width: 80px;
  height: 80px;
  object-fit: contain;
  background: #f8f8f8;
  border-radius: 5px;
}

.item-info {
  flex: 1;
}

.item-info h3 {
  font-size: 16px;
  margin-bottom: 10px;
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
  width: 35px;
  height: 35px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 18px;
}

.quantity-controls input {
  width: 50px;
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.item-total {
  font-weight: bold;
  min-width: 120px;
  text-align: right;
  font-size: 18px;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.cart-summary {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.cart-summary h2 {
  margin-bottom: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #666;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  padding-top: 20px;
  border-top: 2px solid #eee;
  font-size: 20px;
}

.summary-total strong {
  color: #ff6600;
}

.btn-block {
  width: 100%;
  text-align: center;
}
</style>
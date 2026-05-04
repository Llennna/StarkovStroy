<template>
  <div class="checkout container">
    <h1>Оформление заказа</h1>
    
    <div class="checkout-content">
      <div class="checkout-form">
        <h2>Контактные данные</h2>
        <form @submit.prevent="submitOrder">
          <div class="form-group">
            <label>Имя *</label>
            <input type="text" v-model="form.name" required placeholder="Введите имя">
          </div>
          
          <div class="form-group">
            <label>Телефон *</label>
            <input type="tel" v-model="form.phone" required placeholder="+7 (___) ___-__-__">
          </div>
          
          <div class="form-group">
            <label>Email</label>
            <input type="email" v-model="form.email" placeholder="email@example.com">
          </div>
          
          <h2>Доставка</h2>
          
          <div class="form-group">
            <label>Город *</label>
            <input type="text" v-model="form.city" required placeholder="Введите город">
          </div>
          
          <div class="form-group">
            <label>Адрес *</label>
            <input type="text" v-model="form.address" required placeholder="Улица, дом, квартира">
          </div>
          
          <div class="form-group">
            <label>Комментарий к заказу</label>
            <textarea v-model="form.comment" rows="4" placeholder="Дополнительная информация"></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary btn-large btn-block">
            Подтвердить заказ
          </button>
        </form>
      </div>
      
      <div class="checkout-summary">
        <h2>Ваш заказ</h2>
        <div class="order-items">
          <div v-for="item in cartItems" :key="item.id" class="order-item">
            <div class="item-info">
              <h4>{{ item.product.name }}</h4>
              <span>x{{ item.quantity }}</span>
            </div>
            <div class="item-price">
              {{ (item.product.price * item.quantity).toLocaleString() }} ₽
            </div>
          </div>
        </div>
        
        <div class="summary-totals">
          <div class="total-row">
            <span>Сумма заказа:</span>
            <span>{{ cartTotal.toLocaleString() }} ₽</span>
          </div>
          <div class="total-row">
            <span>Доставка:</span>
            <span>{{ cartTotal > 5000 ? 'Бесплатно' : '500 ₽' }}</span>
          </div>
          <div class="total-row final">
            <strong>Итого:</strong>
            <strong>{{ (cartTotal > 5000 ? cartTotal : cartTotal + 500).toLocaleString() }} ₽</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import { computed, reactive } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Checkout',
  setup() {
    const store = useProductStore()
    const router = useRouter()
    
    const form = reactive({
      name: '',
      phone: '',
      email: '',
      city: '',
      address: '',
      comment: ''
    })
    
    const cartItems = computed(() => {
      return store.cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        product: store.products.find(p => p.id === item.id)
      })).filter(item => item.product)
    })
    
    const cartTotal = computed(() => store.cartTotal)
    
    const submitOrder = () => {
      alert('Заказ успешно оформлен! С вами свяжется менеджер.')
      store.clearCart()
      router.push('/')
    }
    
    return {
      form,
      cartItems,
      cartTotal,
      submitOrder
    }
  }
}
</script>

<style scoped>
.checkout {
  padding-top: 20px;
}

.checkout h1 {
  margin-bottom: 30px;
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
}

.checkout-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.checkout-form h2 {
  margin-bottom: 20px;
  margin-top: 30px;
}

.checkout-form h2:first-child {
  margin-top: 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6600;
}

.checkout-summary {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.checkout-summary h2 {
  margin-bottom: 20px;
}

.order-items {
  margin-bottom: 30px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.item-info h4 {
  font-size: 14px;
  margin-bottom: 5px;
}

.item-info span {
  color: #666;
  font-size: 14px;
}

.item-price {
  font-weight: bold;
}

.summary-totals {
  border-top: 2px solid #eee;
  padding-top: 20px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #666;
}

.total-row.final {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  font-size: 20px;
  color: #333;
}

.total-row.final strong {
  color: #ff6600;
}

.btn-block {
  width: 100%;
}
</style>
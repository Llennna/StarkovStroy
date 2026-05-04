<template>
  <div class="product-detail container" v-if="product">
    <div class="breadcrumb">
      <router-link to="/">Главная</router-link>
      <span>/</span>
      <router-link to="/catalog">Каталог</router-link>
      <span>/</span>
      <span>{{ product.name }}</span>
    </div>
    
    <div class="product-content">
      <div class="product-gallery">
        <img :src="product.image" :alt="product.name" class="main-image">
      </div>
      
      <div class="product-info">
        <div class="product-rating">
          <span class="stars">⭐ {{ product.rating }}</span>
          <span class="reviews">({{ product.reviews }} отзывов)</span>
        </div>
        
        <h1>{{ product.name }}</h1>
        
        <div class="product-price">
          <span class="current-price">{{ product.price.toLocaleString() }} ₽</span>
          <span v-if="product.oldPrice" class="old-price">
            {{ product.oldPrice.toLocaleString() }} ₽
          </span>
        </div>
        
        <div class="product-actions">
          <button 
            v-if="product.inStock"
            class="btn btn-cart btn-large"
            @click="addToCart"
          >
            🛒 В корзину
          </button>
          <button v-else class="btn btn-secondary btn-large" disabled>
            Нет в наличии
          </button>
          
          <button class="btn btn-secondary btn-large">
            ⚡ Купить в 1 клик
          </button>
        </div>
        
        <div class="product-description">
          <h3>Описание</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>
    
    <div class="specifications" v-if="product.specifications">
      <h2>Характеристики</h2>
      <table>
        <tr v-for="(value, key) in product.specifications" :key="key">
          <td class="spec-name">{{ key }}</td>
          <td class="spec-value">{{ value }}</td>
        </tr>
      </table>
    </div>
  </div>
  
  <div v-else class="container">
    <p>Товар не найден</p>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ProductDetail',
  setup() {
    const store = useProductStore()
    const route = useRoute()
    
    const product = computed(() => {
      return store.products.find(p => p.id === parseInt(route.params.id))
    })
    
    const addToCart = () => {
      if (product.value) {
        store.addToCart(product.value.id)
        alert('Товар добавлен в корзину!')
      }
    }
    
    return {
      product,
      addToCart
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding-top: 20px;
}

.breadcrumb {
  margin-bottom: 30px;
  color: #666;
}

.breadcrumb a {
  color: #ff6600;
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.product-gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 40px;
}

.main-image {
  max-width: 100%;
  max-height: 400px;
  object-fit: contain;
}

.product-info h1 {
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
}

.product-price {
  margin: 20px 0;
}

.btn-large {
  padding: 15px 30px;
  font-size: 18px;
  margin-right: 15px;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin: 30px 0;
}

.product-description {
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
}

.product-description h3 {
  margin-bottom: 15px;
  color: #333;
}

.product-description p {
  color: #666;
  line-height: 1.6;
}

.specifications {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.specifications h2 {
  margin-bottom: 20px;
}

.specifications table {
  width: 100%;
  border-collapse: collapse;
}

.specifications td {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.spec-name {
  color: #666;
  width: 40%;
}

.spec-value {
  font-weight: 500;
}
</style>
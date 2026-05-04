<template>
  <div class="product-card" :class="{ 'out-of-stock': !product.inStock }">
    <router-link :to="`/product/${product.id}`">
      <div class="product-image">
        <img :src="product.image" :alt="product.name">
        <div v-if="product.oldPrice" class="discount-badge">
          -{{ Math.round((1 - product.price / product.oldPrice) * 100) }}%
        </div>
      </div>
      
      <div class="product-info">
        <div class="product-rating">
          <span class="stars">⭐ {{ product.rating }}</span>
          <span class="reviews">({{ product.reviews }})</span>
        </div>
        
        <h3 class="product-name">{{ product.name }}</h3>
        
        <div class="product-price">
          <span class="current-price">{{ product.price.toLocaleString() }} ₽</span>
          <span v-if="product.oldPrice" class="old-price">
            {{ product.oldPrice.toLocaleString() }} ₽
          </span>
        </div>
        
        <div class="product-actions">
          <button 
            v-if="product.inStock"
            class="btn btn-cart"
            @click.prevent="$emit('add-to-cart', product.id)"
          >
            🛒 В корзину
          </button>
          <button v-else class="btn btn-secondary" disabled>
            Нет в наличии
          </button>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  emits: ['add-to-cart']
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
}

.product-card.out-of-stock {
  opacity: 0.8;
}

.product-card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.product-image {
  position: relative;
  height: 250px;
  background: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.discount-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ff4444;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.product-info {
  padding: 20px;
}

.product-rating {
  margin-bottom: 10px;
  font-size: 14px;
  color: #666;
}

.stars {
  color: #ff6600;
  margin-right: 5px;
}

.product-name {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
  line-height: 1.4;
}

.product-price {
  margin-bottom: 15px;
}

.current-price {
  font-size: 24px;
  font-weight: bold;
  color: #ff6600;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-left: 10px;
  font-size: 16px;
}

.product-actions {
  margin-top: 10px;
}

.product-actions .btn {
  width: 100%;
}
</style>
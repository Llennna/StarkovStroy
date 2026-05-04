<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Инструменты для дома и профессионалов</h1>
          <p>Более 10 000 товаров с доставкой по всей России</p>
          <router-link to="/catalog" class="btn btn-primary hero-btn">
            Перейти в каталог
          </router-link>
        </div>
      </div>
    </section>
    
    <section class="container">
      <h2 class="section-title">Популярные категории</h2>
      <div class="categories-grid">
        <div class="category-card" v-for="cat in categories" :key="cat.name">
          <span class="category-icon">{{ cat.icon }}</span>
          <h3>{{ cat.name }}</h3>
          <router-link :to="`/catalog?category=${cat.name}`" class="btn btn-secondary">
            Смотреть
          </router-link>
        </div>
      </div>
    </section>
    
    <section class="container">
      <h2 class="section-title">Хиты продаж</h2>
      <div class="products-grid">
        <ProductCard 
          v-for="product in topProducts" 
          :key="product.id" 
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </section>
    
    <section class="advantages">
      <div class="container">
        <div class="advantages-grid">
          <div class="advantage-card">
            <span>🚚</span>
            <h3>Быстрая доставка</h3>
            <p>Доставка по всей России за 1-3 дня</p>
          </div>
          <div class="advantage-card">
            <span>🛡️</span>
            <h3>Гарантия качества</h3>
            <p>Гарантия на все товары до 5 лет</p>
          </div>
          <div class="advantage-card">
            <span>💰</span>
            <h3>Лучшие цены</h3>
            <p>Цены ниже рыночных на 15-20%</p>
          </div>
          <div class="advantage-card">
            <span>🔄</span>
            <h3>Возврат без проблем</h3>
            <p>Возврат товара в течение 30 дней</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import ProductCard from '../components/ProductCard.vue'
import { computed } from 'vue'

export default {
  name: 'Home',
  components: {
    ProductCard
  },
  setup() {
    const store = useProductStore()
    
    const categories = [
      { name: 'Электроинструмент', icon: '⚡' },
      { name: 'Измерительный инструмент', icon: '📐' },
      { name: 'Наборы инструментов', icon: '🧰' },
      { name: 'Ручной инструмент', icon: '🔧' }
    ]
    
    const topProducts = computed(() => {
      return store.products.slice(0, 4)
    })
    
    const addToCart = (productId) => {
      store.addToCart(productId)
      alert('Товар добавлен в корзину!')
    }
    
    return {
      categories,
      topProducts,
      addToCart
    }
  }
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 80px 0;
  margin-bottom: 40px;
  margin-top: 135px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 20px;
  margin-bottom: 30px;
  opacity: 0.9;
}

.hero-btn {
  padding: 15px 40px;
  font-size: 20px;
}

.section-title {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
}

.category-card {
  background: white;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-icon {
  font-size: 48px;
  display: block;
  margin-bottom: 15px;
}

.category-card h3 {
  margin-bottom: 20px;
  color: #333;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 60px;
}

.advantages {
  background: white;
  padding: 60px 0;
  margin-top: 40px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.advantage-card {
  text-align: center;
  padding: 30px;
}

.advantage-card span {
  font-size: 48px;
  margin-bottom: 15px;
  display: block;
}

.advantage-card h3 {
  margin-bottom: 10px;
  color: #333;
}

.advantage-card p {
  color: #666;
}
</style>
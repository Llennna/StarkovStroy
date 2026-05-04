<template>
  <div class="catalog container">
    <div class="catalog-sidebar">
      <h3>Фильтры</h3>
      
      <div class="filter-section">
        <h4>Категория</h4>
        <select v-model="store.filters.category" @change="applyFilters">
          <option value="">Все категории</option>
          <option value="Электроинструмент">Электроинструмент</option>
          <option value="Измерительный инструмент">Измерительный инструмент</option>
          <option value="Наборы инструментов">Наборы инструментов</option>
          <option value="Ручной инструмент">Ручной инструмент</option>
        </select>
      </div>
      
      <div class="filter-section">
        <h4>Цена</h4>
        <div class="price-inputs">
          <input 
            type="number" 
            v-model="store.filters.priceRange[0]"
            @change="applyFilters"
            placeholder="От"
          >
          <span>-</span>
          <input 
            type="number" 
            v-model="store.filters.priceRange[1]"
            @change="applyFilters"
            placeholder="До"
          >
        </div>
      </div>
      
      <div class="filter-section">
        <label class="checkbox-label">
          <input 
            type="checkbox" 
            v-model="store.filters.inStockOnly"
            @change="applyFilters"
          >
          Только в наличии
        </label>
      </div>
      
      <button class="btn btn-secondary reset-btn" @click="resetFilters">
        Сбросить фильтры
      </button>
    </div>
    
    <div class="catalog-content">
      <div class="catalog-header">
        <h2>Каталог инструментов</h2>
        <span class="products-count">{{ filteredProducts.length }} товаров</span>
        <select v-model="sortBy" class="sort-select">
          <option value="popular">По популярности</option>
          <option value="price-asc">Сначала дешевле</option>
          <option value="price-desc">Сначала дороже</option>
          <option value="new">Новинки</option>
        </select>
      </div>
      
      <div v-if="filteredProducts.length === 0" class="empty-state">
        <p>😕 Товары не найдены</p>
        <button class="btn btn-primary" @click="resetFilters">
          Сбросить фильтры
        </button>
      </div>
      
      <div class="products-grid" v-else>
        <ProductCard 
          v-for="product in sortedProducts" 
          :key="product.id" 
          :product="product"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../store'
import ProductCard from '../components/ProductCard.vue'
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'Catalog',
  components: {
    ProductCard
  },
  setup() {
    const store = useProductStore()
    const route = useRoute()
    const sortBy = ref('popular')
    
    const filteredProducts = computed(() => store.filteredProducts)
    
    const sortedProducts = computed(() => {
      let products = [...filteredProducts.value]
      
      switch(sortBy.value) {
        case 'price-asc':
          return products.sort((a, b) => a.price - b.price)
        case 'price-desc':
          return products.sort((a, b) => b.price - a.price)
        default:
          return products
      }
    })
    
    const addToCart = (productId) => {
      store.addToCart(productId)
      alert('Товар добавлен в корзину!')
    }
    
    const applyFilters = () => {
      // Фильтры применяются автоматически через computed
    }
    
    const resetFilters = () => {
      store.filters = {
        category: '',
        priceRange: [0, 20000],
        searchQuery: '',
        inStockOnly: false
      }
    }
    
    // При монтировании проверяем query параметры
    onMounted(() => {
      if (route.query.category) {
        store.filters.category = route.query.category
      }
    })
    
    // Следим за изменением query параметров
    watch(
      () => route.query.category,
      (newCategory) => {
        if (newCategory) {
          store.filters.category = newCategory
        } else {
          store.filters.category = ''
        }
      }
    )
    
    return {
      store,
      filteredProducts,
      sortedProducts,
      sortBy,
      addToCart,
      applyFilters,
      resetFilters
    }
  }
}
</script>

<style scoped>
.catalog {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  padding-top: 20px;
  align-items: start;
  width: 100%; /* добавь */
  max-width: 100%; /* добавь */
  margin-top: 115px;
}

.catalog-sidebar {
  background: white;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 100px;
  height: fit-content;
}

.filter-section {
  margin-bottom: 25px;
}

.filter-section h4 {
  margin-bottom: 10px;
  color: #333;
}

.filter-section select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.price-inputs {
  display: flex;
  gap: 10px;
  align-items: center;
}

.price-inputs input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.reset-btn {
  width: 100%;
}

.catalog-content {
  min-width: 0; /* критически важно! */
  overflow: hidden; /* добавь */
  width: 100%; /* добавь */
}

.catalog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  flex-wrap: wrap;
  gap: 15px;
}

.catalog-header h2 {
  margin: 0;
}

.products-count {
  color: #666;
}

.sort-select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 25px;
  width: 100%;
  max-width: 100%; /* добавь */
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  font-size: 18px;
  color: #666;
}

.empty-state p {
  margin-bottom: 20px;
}

/* Адаптивность */
@media (max-width: 768px) {
  .catalog {
    grid-template-columns: 1fr; /* на мобилках sidebar сверху */
  }
  
  .catalog-sidebar {
    position: static;
  }
  
  .catalog-header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
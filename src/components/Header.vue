<template>
  <header class="header">
    <div class="container">
      <div class="header-top">
        <div class="logo">
          <router-link to="/">
            <h1>🔧 StarkovStroy</h1>
          </router-link>
        </div>
        
        <div class="header-actions">
          <div class="header-contacts">
            <span class="phone">8-800-555-35-35</span>
            <span class="schedule">Ежедневно с 9:00 до 21:00</span>
          </div>
          
          <div class="header-icons">
            <button class="icon-btn" @click="toggleFavorites">
              ❤️
            </button>
            <button class="icon-btn" @click="toggleCart">
              🛒
              <span v-if="cartCount > 0" class="badge">{{ cartCount }}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div class="header-bottom">
        <div class="search-bar">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Поиск инструментов..."
            @input="updateSearch"
          >
          <button class="search-btn">🔍</button>
        </div>
        
        <nav class="nav-menu">
          <router-link to="/catalog" class="nav-link">
            <span>📋</span> Каталог
          </router-link>
          <router-link to="/catalog?category=Электроинструмент" class="nav-link">
            <span>⚡</span> Электроинструмент
          </router-link>
          <router-link to="/catalog?category=Измерительный инструмент" class="nav-link">
            <span>📐</span> Измерительный
          </router-link>
          <router-link to="/cart" class="nav-link">
            <span>🛒</span> Корзина
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useProductStore } from '../store'

export default {
  name: 'Header',
  setup() {
    const store = useProductStore()
    const showCart = inject('showCart')
    const searchQuery = ref('')
    
    const cartCount = computed(() => store.cartCount)
    
    const toggleCart = () => {
      showCart.value = !showCart.value
    }
    
    const toggleFavorites = () => {
      alert('Избранное пока в разработке')
    }
    
    const updateSearch = () => {
      store.filters.searchQuery = searchQuery.value
    }
    
    return {
      cartCount,
      searchQuery,
      toggleCart,
      toggleFavorites,
      updateSearch
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
  /* НЕ ставь height: 100vh или что-то подобное! */
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo a {
  text-decoration: none;
}

.logo h1 {
  color: #ff6600;
  font-size: 32px;
  font-weight: bold;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 30px;
}

.header-contacts {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.phone {
  font-size: 20px;
  font-weight: bold;
  color: #ff6600;
}

.schedule {
  font-size: 14px;
  color: #ccc;
}

.header-icons {
  display: flex;
  gap: 15px;
}

.icon-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  position: relative;
  padding: 5px;
}

.badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #ff6600;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.search-bar {
  display: flex;
  flex: 1;
  max-width: 500px;
  margin-right: 30px;
}

.search-bar input {
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 25px 0 0 25px;
  font-size: 16px;
  outline: none;
}

.search-btn {
  padding: 12px 20px;
  background: #ff6600;
  border: none;
  border-radius: 0 25px 25px 0;
  cursor: pointer;
  font-size: 18px;
}

.nav-menu {
  display: flex;
  gap: 30px;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
  white-space: nowrap;
}

.nav-link:hover {
  color: #ff6600;
}
</style>